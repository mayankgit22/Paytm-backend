const express= require('express');
const router = express.Router();    
const {User} = require('../db'); 
const { Authservice } = require('../middleware/checkAuth');
router.get('/', Authservice, async (req, res) => {
  try {
    const users = await User.find();


    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json(users); 
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})
module.exports = router; 