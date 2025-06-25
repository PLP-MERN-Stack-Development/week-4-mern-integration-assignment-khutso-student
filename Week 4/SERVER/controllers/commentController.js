const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { content, post } = req.body;
    const author = req.user.id; // from auth middleware

    if (!content || !post) {
      return res.status(400).json({ message: "Content and post ID are required" });
    }

    const comment = await Comment.create({ content, post, author });

    res.status(201).json(comment);
  } catch (err) {
    console.error("Create Comment Error:", err.message);
    res.status(500).json({ message: "Failed to create comment", error: err.message });
  }
};

// Get comments by post ID
exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.find({ post: postId })
      .populate('author', 'name role')
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(comments);
  } catch (err) {
    console.error("Get Comments Error:", err.message);
    res.status(500).json({ message: "Failed to get comments", error: err.message });
  }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Allow deletion if user is author or admin
    if (comment.author.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: "Forbidden: cannot delete this comment" });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Delete Comment Error:", err.message);
    res.status(500).json({ message: "Failed to delete comment", error: err.message });
  }
};
