const express = require('express');
const router = express.Router();
const z = require('zod');
const {  Authservice, validateSchema } = require('../middleware/checkAuth');
const User = require('../db'); 

const updateSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional()
});

router.put('/', Authservice, validateSchema, async (req, res) => {

    const updateData = req.validateSchema.data;

    try {
        const userId = req.user.id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
