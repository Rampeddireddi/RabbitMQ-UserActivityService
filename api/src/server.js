require('dotenv').config();
const express = require('express');
const activityRoutes = require('./routes/activityRoutes');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.status(200).send('OK'));

app.use('/api/v1/activities', activityRoutes);
const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () =>
  console.log(`API running on port ${PORT}`)
);
