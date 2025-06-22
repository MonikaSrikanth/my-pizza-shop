const express = require('express');
const router = express.Router();
const Order = require('../models/orders');

router.post('/', async (req, res) => {
  try {
    const { name, items, total } = req.body;
    const newOrder = new Order({ name, items, total });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
