const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  design: {
    type: Object,
    required: true,
  },
  exportedHtml: {
    type: String,
    required: true,
  },
  // Add other fields as per your requirements
});

const Design = mongoose.model('Design', designSchema);

module.exports = Design;