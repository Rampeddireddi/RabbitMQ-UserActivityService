const amqp = require('amqplib');

let channel;

async function connectQueue() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await conn.createChannel();
  await channel.assertQueue('user_activities', { durable: true });
}

connectQueue();

exports.ingestActivity = async (req, res) => {
  try {
    const msg = JSON.stringify(req.body);
    channel.sendToQueue('user_activities', Buffer.from(msg));
res.status(202).json({ message: 'Event queued successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Queue error' });
  }
};
