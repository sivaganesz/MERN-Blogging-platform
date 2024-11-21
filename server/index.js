<<<<<<< HEAD
// index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const upload = require('express-fileupload')

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const postlikeRoutes = require('./routes/postlikeRoutes');
const {notFound,errorHandler}=require('./middleware/errorMiddleware')
const app = express();

// Middleware
app.use(express.json({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(upload())
app.use('/uploads',express.static(__dirname + '/uploads'))
// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
// app.use('/api/postlikes', postlikeRoutes);

app.use(notFound);
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



=======
// index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const upload = require('express-fileupload')

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const {notFound,errorHandler}=require('./middleware/errorMiddleware')
const app = express();

// Middleware
app.use(express.json({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(upload())
app.use('/uploads',express.static(__dirname + '/uploads'))
// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
