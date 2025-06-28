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

// // Get events sorted by date (newest first for news view)
// app.get('/api/events', async (req, res) => {
//   try {
//     const content = await Content.findOne();
//     if (!content) {
//       return res.json([]);
//     }
    
//     // Sort events by date (newest first)
//     const sortedEvents = content.events.sort((a, b) => new Date(b.date) - new Date(a.date));
//     res.json(sortedEvents);
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
//       // Delete image from MongoDB
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
//     const imageType = req.params.type + 'Image'; // e.g., 'presidentImage'
    
//     const content = await Content.findOne();
    
//     // Delete old image if exists
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
    
//     // Delete old image if replacing with new one
//     if (image && event.image && event.image.imageId) {
//       await Image.findByIdAndDelete(event.image.imageId);
//     }
    
//     // Update event fields
//     event.title = title;
//     event.description = description;
//     event.date = date;
//     event.time = time;
//     event.location = location;
    
//     if (image) {
//       event.image = image;
//     } else if (!image && event.image) {
//       // Remove image if not provided
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
//       // Delete associated image from MongoDB
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
//       // Delete image from MongoDB
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
//       // Delete image from MongoDB
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
const Content = mongoose.model('Content', ContentSchema);

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});