// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const multer = require('multer');
// const path = require('path');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/schoolwebsite', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Models
// const AdminSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Image Schema for storing images in MongoDB
// const ImageSchema = new mongoose.Schema({
//   filename: { type: String, required: true },
//   originalName: { type: String, required: true },
//   mimetype: { type: String, required: true },
//   data: { type: Buffer, required: true },
//   size: { type: Number, required: true },
//   uploadDate: { type: Date, default: Date.now }
// });

// const ContentSchema = new mongoose.Schema({
//   logos: [{ 
//     imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
//     filename: String,
//     originalName: String
//   }],
//   presidentMessage: String,
//   secretaryMessage: String,
//   correspondentMessage: String,
//   headmistressMessage: String,
//   presidentImage: { 
//     imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
//     filename: String,
//     originalName: String
//   },
//   secretaryImage: { 
//     imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
//     filename: String,
//     originalName: String
//   },
//   correspondentImage: { 
//     imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
//     filename: String,
//     originalName: String
//   },
//   headmistressImage: { 
//     imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
//     filename: String,
//     originalName: String
//   },
//   programme: String,
//   events: [{ 
//     title: String, 
//     description: String, 
//     date: Date,
//     time: String,
//     location: String,
//     image: {
//       imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
//       filename: String,
//       originalName: String
//     },
//     createdAt: { type: Date, default: Date.now }
//   }],
//   news: [{ 
//     title: String, 
//     description: String, 
//     publishDate: Date,
//     expiryDate: Date, // Optional expiry date for news
//     priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
//     image: {
//       imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
//       filename: String,
//       originalName: String
//     },
//     createdAt: { type: Date, default: Date.now }
//   }],
//   gallery: [{ 
//     imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
//     filename: String,
//     originalName: String,
//     caption: String 
//   }],
//   homegallery: [{ 
//     imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
//     filename: String,
//     originalName: String,
//     caption: String 
//   }],
//   lastUpdated: { type: Date, default: Date.now }
// });

// const Admin = mongoose.model('Admin', AdminSchema);
// const Image = mongoose.model('Image', ImageSchema);
// const Content = mongoose.model('Content', ContentSchema);

// // Multer configuration for memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10MB limit
//   }
// });

// // Routes
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Auth middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // Admin login
// app.post('/api/admin/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const admin = await Admin.findOne({ username });

//     if (!admin) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { adminId: admin._id, username: admin.username },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '24h' }
//     );

//     res.json({ token, admin: { id: admin._id, username: admin.username } });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Create default admin (run once)
// app.post('/api/admin/create', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const existingAdmin = await Admin.findOne({ username });

//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const admin = new Admin({ username, password: hashedPassword });
//     await admin.save();

//     res.json({ message: 'Admin created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get content with populated images
// app.get('/api/content', async (req, res) => {
//   try {
//     let content = await Content.findOne();
//     if (!content) {
//       content = new Content({
//         presidentMessage: 'Welcome to our school',
//         secretaryMessage: 'Quality education for all',
//         correspondentMessage: 'Building future leaders',
//         headmistressMessage: 'Excellence in education',
//         programme: 'Our academic programs',
//         logos: [],
//         events: [],
//         news: [],
//         gallery: [],
//         homegallery: []
//       });
//       await content.save();
//     }
//     res.json(content);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get events sorted by date (newest first)
// app.get('/api/events', async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     if (!content) {
//       return res.json([]);
//     }
    
//     const sortedEvents = content.events.sort((a, b) => new Date(b.date) - new Date(a.date));
//     res.json(sortedEvents);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get news sorted by priority and date (active news only)
// app.get('/api/news', async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     if (!content) {
//       return res.json([]);
//     }
    
//     const currentDate = new Date();
//     const activeNews = content.news.filter(newsItem => {
//       // Include news that hasn't expired or has no expiry date
//       return !newsItem.expiryDate || new Date(newsItem.expiryDate) > currentDate;
//     });
    
//     // Sort by priority (high, medium, low) then by publish date (newest first)
//     const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
//     const sortedNews = activeNews.sort((a, b) => {
//       const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
//       if (priorityDiff !== 0) return priorityDiff;
//       return new Date(b.publishDate) - new Date(a.publishDate);
//     });
    
//     res.json(sortedNews);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update content
// app.put('/api/content', authenticateToken, async (req, res) => {
//   try {
//     const updates = req.body;
//     updates.lastUpdated = new Date();

//     const content = await Content.findOneAndUpdate({}, updates, {
//       new: true,
//       upsert: true,
//     });

//     res.json(content);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Upload image and store in MongoDB
// app.post('/api/upload', authenticateToken, upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const image = new Image({
//       filename: Date.now() + '-' + req.file.originalname,
//       originalName: req.file.originalname,
//       mimetype: req.file.mimetype,
//       data: req.file.buffer,
//       size: req.file.size
//     });

//     await image.save();
    
//     res.json({ 
//       imageId: image._id,
//       filename: image.filename,
//       originalName: image.originalName
//     });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Serve images from MongoDB
// app.get('/api/image/:id', async (req, res) => {
//   try {
//     const image = await Image.findById(req.params.id);
//     if (!image) {
//       return res.status(404).json({ message: 'Image not found' });
//     }

//     res.set('Content-Type', image.mimetype);
//     res.set('Content-Length', image.size);
//     res.send(image.data);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Add logo
// app.post('/api/logos', authenticateToken, async (req, res) => {
//   try {
//     const { imageId, filename, originalName } = req.body;
//     const content = await Content.findOne();
    
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
    
//     content.logos.push({ imageId, filename, originalName });
//     await content.save();
    
//     res.json(content.logos);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete logo
// app.delete('/api/logos/:id', authenticateToken, async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     const logoToDelete = content.logos.find(logo => logo._id.toString() === req.params.id);
    
//     if (logoToDelete) {
//       await Image.findByIdAndDelete(logoToDelete.imageId);
//     }
    
//     content.logos = content.logos.filter(logo => logo._id.toString() !== req.params.id);
//     await content.save();
    
//     res.json(content.logos);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update person image (president, secretary, etc.)
// app.put('/api/person-image/:type', authenticateToken, async (req, res) => {
//   try {
//     const { imageId, filename, originalName } = req.body;
//     const imageType = req.params.type + 'Image';
    
//     const content = await Content.findOne();
    
//     if (content[imageType] && content[imageType].imageId) {
//       await Image.findByIdAndDelete(content[imageType].imageId);
//     }
    
//     content[imageType] = { imageId, filename, originalName };
//     await content.save();
    
//     res.json(content);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete person image
// app.delete('/api/person-image/:type', authenticateToken, async (req, res) => {
//   try {
//     const imageType = req.params.type + 'Image';
//     const content = await Content.findOne();
    
//     if (content[imageType] && content[imageType].imageId) {
//       await Image.findByIdAndDelete(content[imageType].imageId);
//       content[imageType] = undefined;
//       await content.save();
//     }
    
//     res.json(content);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // EVENT ROUTES
// // Add event with optional image
// app.post('/api/events', authenticateToken, async (req, res) => {
//   try {
//     const { title, description, date, time, location, image } = req.body;
//     const content = await Content.findOne();
    
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
    
//     const newEvent = {
//       title,
//       description,
//       date,
//       time,
//       location,
//       createdAt: new Date()
//     };
    
//     if (image) {
//       newEvent.image = image;
//     }
    
//     content.events.push(newEvent);
//     await content.save();
    
//     res.json(content.events);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update event
// app.put('/api/events/:id', authenticateToken, async (req, res) => {
//   try {
//     const { title, description, date, time, location, image } = req.body;
//     const content = await Content.findOne();
    
//     const eventIndex = content.events.findIndex(event => event._id.toString() === req.params.id);
//     if (eventIndex === -1) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
    
//     const event = content.events[eventIndex];
    
//     if (image && event.image && event.image.imageId) {
//       await Image.findByIdAndDelete(event.image.imageId);
//     }
    
//     event.title = title;
//     event.description = description;
//     event.date = date;
//     event.time = time;
//     event.location = location;
    
//     if (image) {
//       event.image = image;
//     } else if (!image && event.image) {
//       if (event.image.imageId) {
//         await Image.findByIdAndDelete(event.image.imageId);
//       }
//       event.image = undefined;
//     }
    
//     await content.save();
//     res.json(content.events);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete event
// app.delete('/api/events/:id', authenticateToken, async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     const eventToDelete = content.events.find(event => event._id.toString() === req.params.id);
    
//     if (eventToDelete && eventToDelete.image && eventToDelete.image.imageId) {
//       await Image.findByIdAndDelete(eventToDelete.image.imageId);
//     }
    
//     content.events = content.events.filter(event => event._id.toString() !== req.params.id);
//     await content.save();
    
//     res.json(content.events);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete event image only
// app.delete('/api/events/:id/image', authenticateToken, async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     const event = content.events.find(event => event._id.toString() === req.params.id);
    
//     if (event && event.image && event.image.imageId) {
//       await Image.findByIdAndDelete(event.image.imageId);
//       event.image = undefined;
//       await content.save();
//     }
    
//     res.json(content.events);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // NEWS ROUTES
// // Add news with optional image
// app.post('/api/news', authenticateToken, async (req, res) => {
//   try {
//     const { title, description, publishDate, expiryDate, priority, image } = req.body;
//     const content = await Content.findOne();
    
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
    
//     const newNews = {
//       title,
//       description,
//       publishDate: publishDate || new Date(),
//       expiryDate,
//       priority: priority || 'medium',
//       createdAt: new Date()
//     };
    
//     if (image) {
//       newNews.image = image;
//     }
    
//     content.news.push(newNews);
//     await content.save();
    
//     res.json(content.news);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update news
// app.put('/api/news/:id', authenticateToken, async (req, res) => {
//   try {
//     const { title, description, publishDate, expiryDate, priority, image } = req.body;
//     const content = await Content.findOne();
    
//     const newsIndex = content.news.findIndex(newsItem => newsItem._id.toString() === req.params.id);
//     if (newsIndex === -1) {
//       return res.status(404).json({ message: 'News not found' });
//     }
    
//     const newsItem = content.news[newsIndex];
    
//     if (image && newsItem.image && newsItem.image.imageId) {
//       await Image.findByIdAndDelete(newsItem.image.imageId);
//     }
    
//     newsItem.title = title;
//     newsItem.description = description;
//     newsItem.publishDate = publishDate;
//     newsItem.expiryDate = expiryDate;
//     newsItem.priority = priority;
    
//     if (image) {
//       newsItem.image = image;
//     } else if (!image && newsItem.image) {
//       if (newsItem.image.imageId) {
//         await Image.findByIdAndDelete(newsItem.image.imageId);
//       }
//       newsItem.image = undefined;
//     }
    
//     await content.save();
//     res.json(content.news);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete news
// app.delete('/api/news/:id', authenticateToken, async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     const newsToDelete = content.news.find(newsItem => newsItem._id.toString() === req.params.id);
    
//     if (newsToDelete && newsToDelete.image && newsToDelete.image.imageId) {
//       await Image.findByIdAndDelete(newsToDelete.image.imageId);
//     }
    
//     content.news = content.news.filter(newsItem => newsItem._id.toString() !== req.params.id);
//     await content.save();
    
//     res.json(content.news);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete news image only
// app.delete('/api/news/:id/image', authenticateToken, async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     const newsItem = content.news.find(newsItem => newsItem._id.toString() === req.params.id);
    
//     if (newsItem && newsItem.image && newsItem.image.imageId) {
//       await Image.findByIdAndDelete(newsItem.image.imageId);
//       newsItem.image = undefined;
//       await content.save();
//     }
    
//     res.json(content.news);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GALLERY ROUTES
// // Add gallery item
// app.post('/api/gallery', authenticateToken, async (req, res) => {
//   try {
//     const { imageId, filename, originalName, caption } = req.body;
//     const content = await Content.findOne();
    
//     content.gallery.push({ imageId, filename, originalName, caption });
//     await content.save();
    
//     res.json(content.gallery);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete gallery item
// app.delete('/api/gallery/:id', authenticateToken, async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     const galleryItem = content.gallery.find(item => item._id.toString() === req.params.id);
    
//     if (galleryItem) {
//       await Image.findByIdAndDelete(galleryItem.imageId);
//     }
    
//     content.gallery = content.gallery.filter(item => item._id.toString() !== req.params.id);
//     await content.save();
    
//     res.json(content.gallery);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Add home gallery item
// app.post('/api/homegallery', authenticateToken, async (req, res) => {
//   try {
//     const { imageId, filename, originalName, caption } = req.body;
//     const content = await Content.findOne();
    
//     content.homegallery.push({ imageId, filename, originalName, caption });
//     await content.save();
    
//     res.json(content.homegallery);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete home gallery item
// app.delete('/api/homegallery/:id', authenticateToken, async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     const homeGalleryItem = content.homegallery.find(item => item._id.toString() === req.params.id);
    
//     if (homeGalleryItem) {
//       await Image.findByIdAndDelete(homeGalleryItem.imageId);
//     }
    
//     content.homegallery = content.homegallery.filter(item => item._id.toString() !== req.params.id);
//     await content.save();
    
//     res.json(content.homegallery);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/schoolwebsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Image Schema for storing images in MongoDB
const ImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  data: { type: Buffer, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now }
});

// PDF Schema for storing PDFs in MongoDB
const PDFSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  data: { type: Buffer, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now }
});

// // Transfer Certificate Schema
// const TransferCertificateSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   startYear: { type: Number, required: true },
//   endYear: { type: Number, required: true },
//   pdfId: { type: mongoose.Schema.Types.ObjectId, ref: 'PDF', required: true },
//   filename: { type: String, required: true },
//   originalName: { type: String, required: true },
//   uploadDate: { type: Date, default: Date.now }
// });

// Notification/Circular Schema
const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  pdfId: { type: mongoose.Schema.Types.ObjectId, ref: 'PDF', required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

// Alumni Schema
const AlumniSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  periodOfStudy: { type: String, required: true },
  qualification: { type: String, required: true },
  occupation: { type: String, required: true },
  companyName: { type: String },
  companyAddress: { type: String },
  message: { type: String },
  registrationDate: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false }
});

const ContentSchema = new mongoose.Schema({
  logos: [{ 
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    filename: String,
    originalName: String
  }],
  presidentMessage: String,
  secretaryMessage: String,
  correspondentMessage: String,
  headmistressMessage: String,
  honoraryPresidentMessage: String,
  presidentImage: { 
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    filename: String,
    originalName: String
  },
  secretaryImage: { 
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    filename: String,
    originalName: String
  },
  correspondentImage: { 
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    filename: String,
    originalName: String
  },
  headmistressImage: { 
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    filename: String,
    originalName: String
  },
  honoraryPresidentImage: {
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    filename: String,
    originalName: String
  },
  programme: String,
  events: [{ 
    title: String, 
    description: String, 
    date: Date,
    time: String,
    location: String,
    image: {
      imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
      filename: String,
      originalName: String
    },
    createdAt: { type: Date, default: Date.now }
  }],
  news: [{ 
    title: String, 
    description: String, 
    publishDate: Date,
    expiryDate: Date, // Optional expiry date for news
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    image: {
      imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
      filename: String,
      originalName: String
    },
    createdAt: { type: Date, default: Date.now }
  }],
  gallery: [{ 
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    filename: String,
    originalName: String,
    caption: String 
  }],
  homegallery: [{ 
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    filename: String,
    originalName: String,
    caption: String 
  }],
  lastUpdated: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', AdminSchema);
const Image = mongoose.model('Image', ImageSchema);
const PDF = mongoose.model('PDF', PDFSchema);
// const TransferCertificate = mongoose.model('TransferCertificate', TransferCertificateSchema);
const Notification = mongoose.model('Notification', NotificationSchema);
const Content = mongoose.model('Content', ContentSchema);
const Alumni = mongoose.model('Alumni', AlumniSchema);

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit for PDFs
  }
});

// Routes
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create default admin (run once)
app.post('/api/admin/create', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get content with populated images
app.get('/api/content', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({
        presidentMessage: 'Welcome to our school',
        secretaryMessage: 'Quality education for all',
        correspondentMessage: 'Building future leaders',
        headmistressMessage: 'Excellence in education',
        honoraryPresidentMessage: 'Honorary message',
        programme: 'Our academic programs',
        logos: [],
        events: [],
        news: [],
        gallery: [],
        homegallery: []
      });
      await content.save();
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get events sorted by date (newest first)
app.get('/api/events', async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) {
      return res.json([]);
    }
    
    const sortedEvents = content.events.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sortedEvents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get news sorted by priority and date (active news only)
app.get('/api/news', async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) {
      return res.json([]);
    }
    
    const currentDate = new Date();
    const activeNews = content.news.filter(newsItem => {
      // Include news that hasn't expired or has no expiry date
      return !newsItem.expiryDate || new Date(newsItem.expiryDate) > currentDate;
    });
    
    // Sort by priority (high, medium, low) then by publish date (newest first)
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
    const sortedNews = activeNews.sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.publishDate) - new Date(a.publishDate);
    });
    
    res.json(sortedNews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content
app.put('/api/content', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    updates.lastUpdated = new Date();

    const content = await Content.findOneAndUpdate({}, updates, {
      new: true,
      upsert: true,
    });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload image and store in MongoDB
app.post('/api/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const image = new Image({
      filename: Date.now() + '-' + req.file.originalname,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      data: req.file.buffer,
      size: req.file.size
    });

    await image.save();
    
    res.json({ 
      imageId: image._id,
      filename: image.filename,
      originalName: image.originalName
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload PDF and store in MongoDB
app.post('/api/upload-pdf', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Check if the file is a PDF
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Only PDF files are allowed' });
    }

    const pdf = new PDF({
      filename: Date.now() + '-' + req.file.originalname,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      data: req.file.buffer,
      size: req.file.size
    });

    await pdf.save();
    
    res.json({ 
      pdfId: pdf._id,
      filename: pdf.filename,
      originalName: pdf.originalName
    });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve images from MongoDB
app.get('/api/image/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.set('Content-Type', image.mimetype);
    res.set('Content-Length', image.size);
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve PDFs from MongoDB
app.get('/api/pdf/:id', async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    res.set('Content-Type', pdf.mimetype);
    res.set('Content-Length', pdf.size);
    res.set('Content-Disposition', `inline; filename="${pdf.originalName}"`);
    res.send(pdf.data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add logo
app.post('/api/logos', authenticateToken, async (req, res) => {
  try {
    const { imageId, filename, originalName } = req.body;
    const content = await Content.findOne();
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    content.logos.push({ imageId, filename, originalName });
    await content.save();
    
    res.json(content.logos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete logo
app.delete('/api/logos/:id', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findOne();
    const logoToDelete = content.logos.find(logo => logo._id.toString() === req.params.id);
    
    if (logoToDelete) {
      await Image.findByIdAndDelete(logoToDelete.imageId);
    }
    
    content.logos = content.logos.filter(logo => logo._id.toString() !== req.params.id);
    await content.save();
    
    res.json(content.logos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update person image (president, secretary, etc.)
app.put('/api/person-image/:type', authenticateToken, async (req, res) => {
  try {
    const { imageId, filename, originalName } = req.body;
    const imageType = req.params.type + 'Image';
    
    const content = await Content.findOne();
    
    if (content[imageType] && content[imageType].imageId) {
      await Image.findByIdAndDelete(content[imageType].imageId);
    }
    
    content[imageType] = { imageId, filename, originalName };
    await content.save();
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete person image
app.delete('/api/person-image/:type', authenticateToken, async (req, res) => {
  try {
    const imageType = req.params.type + 'Image';
    const content = await Content.findOne();
    
    if (content[imageType] && content[imageType].imageId) {
      await Image.findByIdAndDelete(content[imageType].imageId);
      content[imageType] = undefined;
      await content.save();
    }
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// EVENT ROUTES
// Add event with optional image
app.post('/api/events', authenticateToken, async (req, res) => {
  try {
    const { title, description, date, time, location, image } = req.body;
    const content = await Content.findOne();
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    const newEvent = {
      title,
      description,
      date,
      time,
      location,
      createdAt: new Date()
    };
    
    if (image) {
      newEvent.image = image;
    }
    
    content.events.push(newEvent);
    await content.save();
    
    res.json(content.events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event
app.put('/api/events/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, date, time, location, image } = req.body;
    const content = await Content.findOne();
    
    const eventIndex = content.events.findIndex(event => event._id.toString() === req.params.id);
    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const event = content.events[eventIndex];
    
    if (image && event.image && event.image.imageId) {
      await Image.findByIdAndDelete(event.image.imageId);
    }
    
    event.title = title;
    event.description = description;
    event.date = date;
    event.time = time;
    event.location = location;
    
    if (image) {
      event.image = image;
    } else if (!image && event.image) {
      if (event.image.imageId) {
        await Image.findByIdAndDelete(event.image.imageId);
      }
      event.image = undefined;
    }
    
    await content.save();
    res.json(content.events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event
app.delete('/api/events/:id', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findOne();
    const eventToDelete = content.events.find(event => event._id.toString() === req.params.id);
    
    if (eventToDelete && eventToDelete.image && eventToDelete.image.imageId) {
      await Image.findByIdAndDelete(eventToDelete.image.imageId);
    }
    
    content.events = content.events.filter(event => event._id.toString() !== req.params.id);
    await content.save();
    
    res.json(content.events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event image only
app.delete('/api/events/:id/image', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findOne();
    const event = content.events.find(event => event._id.toString() === req.params.id);
    
    if (event && event.image && event.image.imageId) {
      await Image.findByIdAndDelete(event.image.imageId);
      event.image = undefined;
      await content.save();
    }
    
    res.json(content.events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// NEWS ROUTES
// Add news with optional image
app.post('/api/news', authenticateToken, async (req, res) => {
  try {
    const { title, description, publishDate, expiryDate, priority, image } = req.body;
    const content = await Content.findOne();
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    const newNews = {
      title,
      description,
      publishDate: publishDate || new Date(),
      expiryDate,
      priority: priority || 'medium',
      createdAt: new Date()
    };
    
    if (image) {
      newNews.image = image;
    }
    
    content.news.push(newNews);
    await content.save();
    
    res.json(content.news);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update news
app.put('/api/news/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, publishDate, expiryDate, priority, image } = req.body;
    const content = await Content.findOne();
    
    const newsIndex = content.news.findIndex(newsItem => newsItem._id.toString() === req.params.id);
    if (newsIndex === -1) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    const newsItem = content.news[newsIndex];
    
    if (image && newsItem.image && newsItem.image.imageId) {
      await Image.findByIdAndDelete(newsItem.image.imageId);
    }
    
    newsItem.title = title;
    newsItem.description = description;
    newsItem.publishDate = publishDate;
    newsItem.expiryDate = expiryDate;
    newsItem.priority = priority;
    
    if (image) {
      newsItem.image = image;
    } else if (!image && newsItem.image) {
      if (newsItem.image.imageId) {
        await Image.findByIdAndDelete(newsItem.image.imageId);
      }
      newsItem.image = undefined;
    }
    
    await content.save();
    res.json(content.news);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete news
app.delete('/api/news/:id', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findOne();
    const newsToDelete = content.news.find(newsItem => newsItem._id.toString() === req.params.id);
    
    if (newsToDelete && newsToDelete.image && newsToDelete.image.imageId) {
      await Image.findByIdAndDelete(newsToDelete.image.imageId);
    }
    
    content.news = content.news.filter(newsItem => newsItem._id.toString() !== req.params.id);
    await content.save();
    
    res.json(content.news);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete news image only
app.delete('/api/news/:id/image', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findOne();
    const newsItem = content.news.find(newsItem => newsItem._id.toString() === req.params.id);
    
    if (newsItem && newsItem.image && newsItem.image.imageId) {
      await Image.findByIdAndDelete(newsItem.image.imageId);
      newsItem.image = undefined;
      await content.save();
    }
    
    res.json(content.news);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GALLERY ROUTES
// Add gallery item
app.post('/api/gallery', authenticateToken, async (req, res) => {
  try {
    const { imageId, filename, originalName, caption } = req.body;
    const content = await Content.findOne();
    
    content.gallery.push({ imageId, filename, originalName, caption });
    await content.save();
    
    res.json(content.gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete gallery item
app.delete('/api/gallery/:id', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findOne();
    const galleryItem = content.gallery.find(item => item._id.toString() === req.params.id);
    
    if (galleryItem) {
      await Image.findByIdAndDelete(galleryItem.imageId);
    }
    
    content.gallery = content.gallery.filter(item => item._id.toString() !== req.params.id);
    await content.save();
    
    res.json(content.gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add home gallery item
app.post('/api/homegallery', authenticateToken, async (req, res) => {
  try {
    const { imageId, filename, originalName, caption } = req.body;
    const content = await Content.findOne();
    
    content.homegallery.push({ imageId, filename, originalName, caption });
    await content.save();
    
    res.json(content.homegallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete home gallery item
app.delete('/api/homegallery/:id', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findOne();
    const homeGalleryItem = content.homegallery.find(item => item._id.toString() === req.params.id);
    
    if (homeGalleryItem) {
      await Image.findByIdAndDelete(homeGalleryItem.imageId);
    }
    
    content.homegallery = content.homegallery.filter(item => item._id.toString() !== req.params.id);
    await content.save();
    
    res.json(content.homegallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// // TRANSFER CERTIFICATE ROUTES
// // Add transfer certificate
// app.post('/api/transfer-certificates', authenticateToken, async (req, res) => {
//   try {
//     const { name, startYear, endYear, pdfId, filename, originalName } = req.body;
    
//     if (!name || !startYear || !endYear || !pdfId) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     const transferCertificate = new TransferCertificate({
//       name,
//       startYear: parseInt(startYear),
//       endYear: parseInt(endYear),
//       pdfId,
//       filename,
//       originalName
//     });
    
//     await transferCertificate.save();
    
//     res.json(transferCertificate);
//   } catch (error) {
//     console.error('Error adding transfer certificate:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all transfer certificates (sorted by endYear desc, then name asc)
// app.get('/api/transfer-certificates', async (req, res) => {
//   try {
//     const certificates = await TransferCertificate.find()
//       .sort({ 
//         endYear: -1,  // Most recent endYear first
//         name: 1       // Then alphabetical by name
//       });
    
//     res.json(certificates);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get transfer certificates for admin (with additional details)
// app.get('/api/admin/transfer-certificates', authenticateToken, async (req, res) => {
//   try {
//     const certificates = await TransferCertificate.find()
//       .sort({ 
//         uploadDate: -1  // Most recently uploaded first for admin
//       });
    
//     res.json(certificates);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update transfer certificate
// app.put('/api/transfer-certificates/:id', authenticateToken, async (req, res) => {
//   try {
//     const { name, startYear, endYear, pdfId, filename, originalName } = req.body;
    
//     const certificate = await TransferCertificate.findById(req.params.id);
//     if (!certificate) {
//       return res.status(404).json({ message: 'Transfer certificate not found' });
//     }
    
//     // If PDF is being updated, delete the old one
//     if (pdfId && certificate.pdfId.toString() !== pdfId) {
//       await PDF.findByIdAndDelete(certificate.pdfId);
//     }
    
//     certificate.name = name || certificate.name;
//     certificate.startYear = startYear ? parseInt(startYear) : certificate.startYear;
//     certificate.endYear = endYear ? parseInt(endYear) : certificate.endYear;
    
//     if (pdfId) {
//       certificate.pdfId = pdfId;
//       certificate.filename = filename;
//       certificate.originalName = originalName;
//     }
    
//     await certificate.save();
    
//     res.json(certificate);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete transfer certificate
// app.delete('/api/transfer-certificates/:id', authenticateToken, async (req, res) => {
//   try {
//     const certificate = await TransferCertificate.findById(req.params.id);
//     if (!certificate) {
//       return res.status(404).json({ message: 'Transfer certificate not found' });
//     }
    
//     // Delete the associated PDF
//     await PDF.findByIdAndDelete(certificate.pdfId);
    
//     // Delete the certificate record
//     await TransferCertificate.findByIdAndDelete(req.params.id);
    
//     res.json({ message: 'Transfer certificate deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// ALUMNI ROUTES
// Add alumni registration
app.post('/api/alumni', async (req, res) => {
  try {
    const { 
      fullName, 
      gender, 
      mobile, 
      email, 
      address, 
      periodOfStudy, 
      qualification, 
      occupation, 
      companyName, 
      companyAddress, 
      message 
    } = req.body;
    
    if (!fullName || !gender || !mobile || !email || !address || !periodOfStudy || !qualification || !occupation) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
    
    const alumni = new Alumni({
      fullName,
      gender,
      mobile,
      email,
      address,
      periodOfStudy,
      qualification,
      occupation,
      companyName,
      companyAddress,
      message
    });
    
    await alumni.save();
    
    res.json({ message: 'Alumni registration successful', alumni });
  } catch (error) {
    console.error('Error registering alumni:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all alumni (for admin)
app.get('/api/admin/alumni', authenticateToken, async (req, res) => {
  try {
    const alumni = await Alumni.find()
      .sort({ registrationDate: -1 }); // Most recent first
    
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get approved alumni (public)
app.get('/api/alumni', async (req, res) => {
  try {
    const alumni = await Alumni.find({ isApproved: true })
      .sort({ registrationDate: -1 });
    
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update alumni approval status
app.put('/api/alumni/:id/approve', authenticateToken, async (req, res) => {
  try {
    const { isApproved } = req.body;
    
    const alumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );
    
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }
    
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete alumni
app.delete('/api/alumni/:id', authenticateToken, async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id);
    
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }
    
    res.json({ message: 'Alumni deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// NOTIFICATION/CIRCULAR ROUTES
// Add notification/circular
app.post('/api/notifications', authenticateToken, async (req, res) => {
  try {
    const { title, date, pdfId, filename, originalName } = req.body;
    
    if (!title || !date || !pdfId) {
      return res.status(400).json({ message: 'Title, date, and PDF are required' });
    }
    
    const notification = new Notification({
      title,
      date: new Date(date),
      pdfId,
      filename,
      originalName
    });
    
    await notification.save();
    
    res.json(notification);
  } catch (error) {
    console.error('Error adding notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all notifications (sorted by date desc - newest first)
app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ 
        date: -1  // Most recent date first
      });
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get notifications for admin (with additional details)
app.get('/api/admin/notifications', authenticateToken, async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ 
        uploadDate: -1  // Most recently uploaded first for admin
      });
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update notification
app.put('/api/notifications/:id', authenticateToken, async (req, res) => {
  try {
    const { title, date, pdfId, filename, originalName } = req.body;
    
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // If PDF is being updated, delete the old one
    if (pdfId && notification.pdfId.toString() !== pdfId) {
      await PDF.findByIdAndDelete(notification.pdfId);
    }
    
    notification.title = title || notification.title;
    notification.date = date ? new Date(date) : notification.date;
    
    if (pdfId) {
      notification.pdfId = pdfId;
      notification.filename = filename;
      notification.originalName = originalName;
    }
    
    await notification.save();
    
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete notification
app.delete('/api/notifications/:id', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // Delete the associated PDF
    await PDF.findByIdAndDelete(notification.pdfId);
    
    // Delete the notification record
    await Notification.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve frontend build
app.use(express.static(path.join(__dirname, 'client/build')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});