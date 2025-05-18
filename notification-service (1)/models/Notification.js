const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: String,
  type: String,
  message: String,
  subject: String,
  status: { type: String, default: 'pending' },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
