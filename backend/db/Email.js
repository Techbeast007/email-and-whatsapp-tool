const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
  openedAt: {
    type: Date,
  },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
