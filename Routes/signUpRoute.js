const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db'); 
const { validateSchema } = require('../middleware/checkAuth');

const secretKey = process.env.JWT_SECRET || "yourfavgirl";

router.post('/', validateSchema, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password
        });

        await Account.create({
            userId: user._id,
            balance: Math.floor(Math.random() * (6000 - 500 + 1)) + 500
        });

        const token = jwt.sign({ id: user._id }, secretKey);

      res.cookie('token', token, {
  httpOnly: true,
  secure: true,         // 🔒 required for cross-origin
  sameSite: 'None',     // 🧭 required for cross-origin
  maxAge: 24 * 60 * 60 * 1000  // 1 day (optional, but good to have)
});

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email

            },
            
        });
    } catch (error) {
        console.error('Error creating user at signup:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
