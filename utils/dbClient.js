const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error('MONGO_URI is not set in .env');

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectClient() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client;
}

module.exports = { client, connectClient };
