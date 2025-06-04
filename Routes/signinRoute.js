const jwt = require('jsonwebtoken');
const router = require('express').Router();
const secretKey=process.env.JWT_SECRET || "yourfavgirl"
// const validateUser1= require('../middleware/checkAuth');
const { validateSchema } = require('../middleware/checkAuth');

 const {User}=require('../db')

router.post('/', validateSchema, async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, secretKey);
res.cookie('token', token, {
            httpOnly: true, 
            // secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Lax' 
        });
        return res.status(200).json({ message: 'Signin successful', user:{
            id: user._id,
            name: user.name,
            email: user.email
        }, token });
    } catch (error) {
        console.error('Error signing in user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;