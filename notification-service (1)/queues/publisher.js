const amqp = require('amqplib');
let channel;

async function connect() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await conn.createChannel();
  await channel.assertQueue('notifications');
}
connect();

exports.publishToQueue = async (notification) => {
  channel.sendToQueue('notifications', Buffer.from(JSON.stringify(notification)));
};
