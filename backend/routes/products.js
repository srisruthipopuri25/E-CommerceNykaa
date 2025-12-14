const express = require("express");
const Product = require("../models/products");

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

module.exports = router;

