const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware to check if user is authenticated

// Like a post
router.put('/:id/like', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = await User.findById(req.user._id);  // From authMiddleware

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: 'User has already liked this post.' });
        }

        // Add user ID to the likes array
        post.likes.push(userId);
        await post.save();

        res.status(200).json({ message: 'Post liked successfully!', likes: post.likes.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
