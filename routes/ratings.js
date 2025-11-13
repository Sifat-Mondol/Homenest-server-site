const express = require('express');
const { ObjectId } = require('mongodb');

function createRatingsRouter(db) {
  const router = express.Router();
  const ratings = db.collection('ratings');

  // Add rating
  router.post('/', async (req, res) => {
    try {
      const r = req.body;
      if (!r.propertyId || !r.reviewerName || !r.rating) {
        return res.status(400).send({ success: false, error: 'Missing required fields' });
      }
      r.propertyId = r.propertyId.toString();
      r.createdAt = new Date();
      r.comment = r.comment || "";
      r.propertyName = r.propertyName || "";
      const result = await ratings.insertOne(r);
      res.status(201).send({ success: true, insertedId: result.insertedId });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message });
    }
  });

  // Get ratings by propertyId
  router.get('/', async (req, res) => {
    try {
      const { propertyId } = req.query;
      const filter = {};
      if (propertyId) filter.propertyId = propertyId.toString();
      const items = await ratings.find(filter).sort({ createdAt: -1 }).toArray();
      res.send({ success: true, data: items });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message });
    }
  });

  // Delete rating
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await ratings.deleteOne({ _id: new ObjectId(id) });
      res.send({ success: true, deletedCount: result.deletedCount });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message });
    }
  });

  return router;
}

module.exports = createRatingsRouter;
