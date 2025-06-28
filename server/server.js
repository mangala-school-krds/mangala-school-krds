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
//   events: [{ title: String, description: String, date: Date }],
//   gallery: [{ 
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
//         gallery: []
//       });
//       await content.save();
//     }
//     res.json(content);
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

// // Add event
// app.post('/api/events', authenticateToken, async (req, res) => {
//   try {
//     const { title, description, date } = req.body;
//     const content = await Content.findOne();
    
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
    
//     content.events.push({ title, description, date });
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
//     content.events = content.events.filter(event => event._id.toString() !== req.params.id);
//     await content.save();
    
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
  events: [{ title: String, description: String, date: Date }],
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
      // Delete image from MongoDB
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
    const imageType = req.params.type + 'Image'; // e.g., 'presidentImage'
    
    const content = await Content.findOne();
    
    // Delete old image if exists
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

// Add event
app.post('/api/events', authenticateToken, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const content = await Content.findOne();
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    content.events.push({ title, description, date });
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
    content.events = content.events.filter(event => event._id.toString() !== req.params.id);
    await content.save();
    
    res.json(content.events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

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
      // Delete image from MongoDB
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
      // Delete image from MongoDB
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