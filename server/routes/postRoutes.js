<<<<<<< HEAD
// postRoutes.js
const express = require('express');
const   router = express.Router();
const Post = require('../models/postModel');
const authMiddleware = require('../middleware/authMiddleware')
const { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost } = require('../controllers/postControllers')
// Define routes
router.post('/', authMiddleware, createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/categories/:category', getCatPosts)
router.get('/users/:id', getUserPosts)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, deletePost)


//likes Routes
router.put('/:id/like', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.user._id; // From authMiddleware

        // Check if the user has already liked the post by checking the user's likedPosts
        if (req.user.likedPosts.includes(post._id)) {
            return res.status(400).json({ message: 'User has already liked this post.' });
        }

        // Add user ID to the post's likes array
        post.likes.push(userId);
        await post.save();

        // Also add the post ID to the user's likedPosts array
        req.user.likedPosts.push(post._id);
        await req.user.save();

        res.status(200).json({
            message: 'Post liked successfully!',
            likes: post.likes.length // Return total number of distinct likes
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.user._id;

        // Add the user's comment (this part should be modified according to your logic)
        post.comments.push(userId);
        await post.save();

        res.status(200).json({
            message: 'Comment submitted successfully!',
            comments: post.comments.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
=======
// postRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const {createPost,getPosts,getPost,getCatPosts,getUserPosts,editPost,deletePost}=require('../controllers/postControllers')
// Define routes
router.post('/',authMiddleware,createPost)
router.get('/',getPosts)
router.get('/:id',getPost)
router.get('/categories/:category',getCatPosts)
router.get('/users/:id',getUserPosts)
router.patch('/:id',authMiddleware,editPost)
router.delete('/:id',authMiddleware,deletePost) 



module.exports = router;
>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
