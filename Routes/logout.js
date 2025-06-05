const express=require('express')
const router=express.Router()
router.post('/',  (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;
