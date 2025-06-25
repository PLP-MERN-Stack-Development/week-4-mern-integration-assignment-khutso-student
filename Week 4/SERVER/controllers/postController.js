const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const postData = {
      title,
      content,
      category,
      author: req.user.id,
    };

    if (req.file) {
      postData.image = req.file.filename;  // Save the filename of uploaded image
    }

    const post = await Post.create(postData);

    res.status(201).json(post);
  } catch (err) {
    console.error("Create Post Error:", err.message);
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
};



const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name role _id");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name role _id");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, 
        { new: true, });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error updating post" });
  }
};


const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure post has an author
    if (!post.author) {
      return res.status(400).json({ message: "Post has no author" });
    }

    // Authorization check: only the author or admin can delete
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    // Perform delete
    await Post.deleteOne({ _id: post._id });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err.message);
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
};





module.exports = { createPost, getPosts, getPost, updatePost, deletePost };