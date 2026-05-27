const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get All Products
router.get('/', async (req, res) => {
  try {
    const { category, flash, limit = 20 } = req.query;
    let query = {};

    if (category) query.category = category;
    if (flash === 'true') query.isFlashSale = true;

    const products = await Product.find(query)
      .populate('category', 'name')
      .limit(Number(limit));

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

// Create Product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;