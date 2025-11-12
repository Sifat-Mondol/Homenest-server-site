const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectClient } = require('./utils/dbClient');
const createPropertiesRouter = require('./routes/properties');
const createRatingsRouter = require('./routes/ratings');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    const client = await connectClient();
    console.log('✅ MongoDB connected successfully');

    const db = client.db(process.env.DB_NAME || 'homenestDB');

    // Routers
    app.use('/api/properties', createPropertiesRouter(db));
    app.use('/api/ratings', createRatingsRouter(db));

    // Root route
    app.get('/', (req, res) => {
      res.send({ message: 'HomeNest API is running!' });
    });

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
