const amqp = require('amqplib');
const Notification = require('../models/Notification');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const inAppService = require('../services/inAppService');

(async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue('notifications');

  channel.consume('notifications', async msg => {
    const notification = JSON.parse(msg.content.toString());
    try {
      if (notification.type === 'email') await emailService.send(notification);
      if (notification.type === 'sms') await smsService.send(notification);
      if (notification.type === 'in-app') await inAppService.send(notification);

      await Notification.findByIdAndUpdate(notification._id, { status: 'delivered' });
    } catch (error) {
      const attempts = (notification.attempts || 0) + 1;
      if (attempts < 3) {
        await Notification.findByIdAndUpdate(notification._id, { attempts });
        channel.sendToQueue('notifications', Buffer.from(JSON.stringify({ ...notification, attempts })));
      } else {
        await Notification.findByIdAndUpdate(notification._id, { status: 'failed' });
      }
    }
    channel.ack(msg);
  });
})();
