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

 

 
  
 


 

  return router;
}

module.exports = createPropertiesRouter;
