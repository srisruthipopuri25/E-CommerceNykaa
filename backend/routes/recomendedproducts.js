const express = require("express");
const redis = require("../config/redis");
const Product = require("../models/products");
const recommendationAI = require("../AI/Productrecommendation");

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const cacheKey = `ai:recommendations:${userId}`;

        const cached = await redis.get(cacheKey);
        if (cached) {
            return res.json({
                source: "redis",
                recommendations: JSON.parse(cached),
            });
        }

        const viewedIds = await redis.lrange(
            `user:views:${userId}`,
            0,
            -1
        );

        const viewedProducts = viewedIds.length
            ? await Product.find(
                { _id: { $in: viewedIds } },
                { title: 1 }
            )
            : [];

        const userHistory = viewedProducts.map(p => p.title);

        const allProducts = await Product.find({}, { title: 1 });
        const productNames = allProducts.map(p => p.title);

        const recommendations = await recommendationAI(
            userHistory,
            productNames
        );

        await redis.set(
            cacheKey,
            JSON.stringify(recommendations),
            "EX",
            600
        );

        res.json({
            source: "gemini",
            recommendations,
        });
    } catch (err) {
        console.error("Recommendation Error:", err);
        res.status(500).json({ message: "Recommendation failed" });
    }
});

module.exports = router;
