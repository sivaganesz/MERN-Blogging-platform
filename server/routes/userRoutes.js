<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const {registerUser,loginUser,getUser,changeAvatar,editUser,getAuthors,userLike} = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');
// Define routes
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/:id',getUser)
router.get('/',getAuthors)
router.post('/change-avatar',authMiddleware,changeAvatar)
router.patch('/edit-user',authMiddleware,editUser)

module.exports = router;
=======
const express = require('express');
const router = express.Router();

const {registerUser,loginUser,getUser,changeAvatar,editUser,getAuthors} = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');
// Define routes
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/:id',getUser)
router.get('/',getAuthors)
router.post('/change-avatar',authMiddleware,changeAvatar)
router.patch('/edit-user',authMiddleware,editUser)


module.exports = router;
>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
