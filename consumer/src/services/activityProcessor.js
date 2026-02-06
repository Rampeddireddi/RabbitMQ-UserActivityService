const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

let Activity;

async function connectDB() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log('MongoDB connected in consumer');

  const activitySchema = new mongoose.Schema({
    id: String,
    userId: String,
    eventType: String,
    timestamp: Date,
    processedAt: Date,
    payload: Object,
  });

  Activity = mongoose.model('Activity', activitySchema);
}

async function processActivity(data) {
  if (!Activity) throw new Error('DB not ready');

  await Activity.create({
    id: randomUUID(),
    ...data,
    processedAt: new Date(),
  });
}

function __setActivityModel(model) {
  Activity = model;
}
// module.exports = { connectDB, processActivity };
module.exports = { connectDB, processActivity, __setActivityModel };

