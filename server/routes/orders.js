const express = require('express');
const router = express.Router();
const Order = require('../models/orders');

router.post('/', async (req, res) => {
  try {
    console.log("✅ Received order:", req.body); // 👈 Debug log

    const { name, items, total } = req.body;

    if (!name || !items || !total) {
      return res.status(400).json({ error: "Missing order data" });
    }

    const newOrder = new Order({ name, items, total });
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error("❌ Backend error:", error); // 👈 This will help us see the real issue
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
