const amqp = require('amqplib');
const { connectDB, processActivity } = require('./services/activityProcessor');

async function start() {
  try {
    await connectDB();
    console.log('✅ MongoDB connected in consumer');

    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue('user_activities', { durable: true });

    console.log(' Consumer waiting for messages');

    channel.consume('user_activities', async (msg) => {
      try {
        const data = JSON.parse(msg.content.toString());
        await processActivity(data);
        console.log(' Inserted into Mongo');
        channel.ack(msg);
      } catch (err) {
        console.error('Processing error:', err);
        channel.nack(msg, false, true);
      }
    });

  } catch (err) {
    console.error(' Worker startup failed:', err);
    process.exit(1);
  }
}

start();
