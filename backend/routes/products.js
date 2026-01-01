const express = require("express");
const Product = require("../models/products");
const redis = require("../config/redis");

const router = express.Router();

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
        const product = await Product.findById(req.params.id);

        const userId = req.headers["x-user-id"]; // user identification

        if (userId && product) {
            await redis.lpush(
                `user:views:${userId}`,
                product._id.toString()
            );

            await redis.ltrim(`user:views:${userId}`, 0, 9); // last 10
            await redis.expire(`user:views:${userId}`, 3600); // 1 hour
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
