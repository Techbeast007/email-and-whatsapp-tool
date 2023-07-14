require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const designRoutes = require('./routes/designRoutes');
const trackRoutes = require('./routes/trackRoutes');



const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Email Routes
app.use('/api', emailRoutes);

// WhatsApp Routes
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api', designRoutes);
app.use('/api/tracks', trackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

// Connect to MongoDB
const uri = process.env.MONGODB_URI; // Update with your MongoDB URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful connection
    const PORT = process.env.Mong_PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });