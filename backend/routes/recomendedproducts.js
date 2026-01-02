const express = require('express');
const redis = require('../config/redis');
const Product = require('../models/products');
const recommendationAI = require('../AI/Productrecommendation');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cacheKey = `ai:recommendations:${userId}`;

    // const cached = await redis.get(cacheKey);
    // if (cached) {
    //       console.log("⚡ Served from Redis");

    //   return res.json({
    //     source: "redis",
    //     recommendations: JSON.parse(cached),
    //   });
    // }

    const viewedIds = await redis.lrange(`user:views:${userId}`, 0, -1);
    const viewedProducts = await Product.find(
      { _id: { $in: viewedIds } },
      { title: 1 }
    );

    const userHistory = viewedProducts.map((p) => p.title);

    const allProducts = await Product.find({}, { title: 1 });
    const productNames = allProducts.map((p) => p.title);

    let recommendations = await recommendationAI(userHistory, productNames);

    if (!recommendations || recommendations.length === 0) {
      const fallback = await Product.find({}).sort({ rating: -1 }).limit(5);

      return res.json({
        source: 'fallback',
        recommendations: fallback,
      });
    }

    await redis.set(cacheKey, JSON.stringify(recommendations), 'EX', 600);

    res.json({
      source: 'gemini',
      recommendations,
    });
  } catch (err) {
    console.error(err);

    const fallback = await Product.find({}).sort({ rating: -1 }).limit(5);

    res.json({
      source: 'fallback',
      recommendations: fallback,
    });
  }
});

module.exports = router;
