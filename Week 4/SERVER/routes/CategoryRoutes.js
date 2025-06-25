const express = require('express');
const { createCategory, getCategories } = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();


router.get('/', getCategories);
router.post('/', protect, authorize(['admin']), createCategory);

module.exports = router;
