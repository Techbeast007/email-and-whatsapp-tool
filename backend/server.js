require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

