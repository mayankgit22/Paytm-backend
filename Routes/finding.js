const express = require('express');
const router = express.Router();
const User = require('../db');

router.get('/', async (req, res) => {
  try {
    const user = req.query.user;

    if (!user) {
      return res.status(400).json({ error: "Missing 'user' query parameter" });
    }

    const data = await User.find({
      name: { $regex: user}
    });

    if (data.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
