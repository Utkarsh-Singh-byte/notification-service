const Notification = require('../models/Notification');
const { publishToQueue } = require('../queues/publisher');

exports.sendNotification = async (req, res) => {
  const { userId, type, message, subject } = req.body;
  const notification = await Notification.create({ userId, type, message, subject });
  await publishToQueue(notification);
  res.status(200).json({ message: 'Notification queued' });
};

exports.getUserNotifications = async (req, res) => {
  const notifications = await Notification.find({ userId: req.params.id });
  res.status(200).json(notifications);
};
