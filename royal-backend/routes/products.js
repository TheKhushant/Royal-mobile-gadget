const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../middleware/multer');
const { uploadMultipleImages } = require('../controllers/uploadController');

// Create Product with Images
router.post('/', upload.array('images', 5), async (req, res) => {  // max 5 images
  try {
    console.log("BODY =>", req.body);
    console.log("FILES =>", req.files);



    let imageData = [];

    if (req.files && req.files.length > 0) {
      imageData = await uploadMultipleImages(req.files);
    }

    const productData = {
      ...req.body,
      images: imageData
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const { category, flash, limit = 20, page = 1 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (flash === 'true') query.isFlashSale = true;

    const products = await Product.find(query)
      .populate('category', 'name')
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


 router.delete('/:id', async (req, res) => { 
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });


// Update Product
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;