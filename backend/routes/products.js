const express = require("express");
const Product = require("../models/products");
const redis = require("../config/redis");

const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      products,
      total: products.length,
      skip: 0,
      limit: products.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try { 
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const userId = req.headers["x-user-id"];

    if (userId) {
      try {
        await redis.lpush(`user:views:${userId}`, product._id.toString());
        await redis.ltrim(`user:views:${userId}`, 0, 9);
        await redis.expire(`user:views:${userId}`, 3600);
      } catch (redisErr) {
        console.error("Redis error:", redisErr.message);
      }
    }

    res.json(product);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
