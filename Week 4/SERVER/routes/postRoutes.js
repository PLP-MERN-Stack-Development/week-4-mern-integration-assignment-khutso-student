const express = require('express');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/auth');
const { createPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/postController');
const upload = require('../middleware/upload');

const router = express.Router();


router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/', protect, upload.single('image'), createPost);

module.exports = router;
