const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { createComment, getCommentsByPost, deleteComment } = require('../controllers/commentController');

const router = express.Router();


router.get('/post/:postId', getCommentsByPost);
router.post('/', protect, createComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;
