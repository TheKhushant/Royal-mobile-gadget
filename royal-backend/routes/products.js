const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../middleware/multer');
const { uploadMultipleImages } = require('../controllers/uploadController');

// Create Product with Images
// Create Product
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    console.log("BODY =>", req.body);
    console.log("FILES =>", req.files);

    let imageData = [];

    // Handle existing image URLs sent from frontend
    if (req.body.existingImages) {
      try {
        const existing = JSON.parse(req.body.existingImages);
        imageData = [...existing];
      } catch (e) {
        console.error("Error parsing existingImages", e);
      }
    }

    // Handle newly uploaded files
    if (req.files && req.files.length > 0) {
      const uploadedImages = await uploadMultipleImages(req.files);
      imageData = [...imageData, ...uploadedImages];
    }

    const productData = {
      name: req.body.name,
      price: req.body.price,
      originalPrice: req.body.originalPrice || 0,
      discount: req.body.discount || 0,
      stock: req.body.stock,
      description: req.body.description,
      category: req.body.category,
      isFlashSale: req.body.flashSale === 'true' || req.body.flashSale === true,
      images: imageData
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
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