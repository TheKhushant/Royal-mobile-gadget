const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const dns = require('dns');

dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
]);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// Routes (baad mein add karenge)
app.get('/', (req, res) => {
  res.json({ message: "Royal Mobile Gadget Backend Running! ✅" });
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ... previous code

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const bannerRoutes = require('./routes/banners');   // 
const reviewRoutes = require('./routes/reviews');

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});