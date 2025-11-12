const express = require('express');
const { ObjectId } = require('mongodb');

function createPropertiesRouter(db) {
  const router = express.Router();
  const properties = db.collection('properties');

  // Create property
  router.post('/', async (req, res) => {
    try {
      const data = req.body;
      if (!data.name || !data.description || !data.category || !data.price || !data.location || !data.image || !data.userEmail || !data.userName) {
        return res.status(400).send({ success: false, error: 'Missing required fields' });
      }
      data.createdAt = new Date();
      const result = await properties.insertOne(data);
      res.status(201).send({ success: true, insertedId: result.insertedId });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message });
    }
  });

  // Get all properties
  router.get('/', async (req, res) => {
    try {
      const { search, sortBy, page = 1, limit = 0 } = req.query;
      const filter = {};
      if (search) filter.name = { $regex: search, $options: 'i' };

      let sort = { createdAt: -1 };
      if (sortBy === 'price_asc') sort = { price: 1 };
      if (sortBy === 'price_desc') sort = { price: -1 };
      if (sortBy === 'date_asc') sort = { createdAt: 1 };
      if (sortBy === 'date_desc') sort = { createdAt: -1 };

      const cursor = properties.find(filter).sort(sort);
      if (Number(limit) > 0) {
        const skip = (Number(page) - 1) * Number(limit);
        cursor.skip(skip).limit(Number(limit));
      }

      const items = await cursor.toArray();
      res.send(items);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // Featured properties
  router.get('/featured', async (req, res) => {
    try {
      const items = await properties.find().sort({ createdAt: -1 }).limit(6).toArray();
      res.send(items);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // Get property by id
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const item = await properties.findOne({ _id: new ObjectId(id) });
      if (!item) return res.status(404).send({ error: 'Property not found' });
      res.send(item);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // Update property
  router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;
      update.updatedAt = new Date();
      const result = await properties.updateOne({ _id: new ObjectId(id) }, { $set: update });
      res.send(result);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // Delete property
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await properties.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // Get properties by user email
  router.get('/by-user/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const items = await properties.find({ userEmail: email }).sort({ createdAt: -1 }).toArray();
      res.send(items);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  return router;
}

module.exports = createPropertiesRouter;
