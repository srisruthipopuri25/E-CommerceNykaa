'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import useProductStore from '@/store/productstore';

function SkeletonCard() {
  return (
    <div className="min-w-[220px] sm:min-w-[280px] animate-pulse">
      <div className="h-44 bg-gray-200 rounded-xl mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export default function RecommendedProducts() {
  const recommendedproducts = useProductStore(
    (state) => state.recommendedproducts
  );

  const getRecommendedProducts = useProductStore(
    (state) => state.getRecommendedProducts
  );

  useEffect(() => {
    getRecommendedProducts();
  }, [getRecommendedProducts]);

  return (
    <section className="m-10">
      <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {!recommendedproducts.length
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : recommendedproducts &&
            recommendedproducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="min-w-[220px] sm:min-w-[280px] bg-white border rounded-xl p-3 hover:shadow-lg transition"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-44 w-full object-cover rounded-lg mb-3"
                />

                <h3 className="font-semibold text-sm line-clamp-2">
                  {product.title}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-green-700">
                    ${product.price}
                  </span>
                  <span className="text-sm text-yellow-600">
                    {product.rating}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
