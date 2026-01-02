'use client';

import useCartStore from '@/store/cartstore';

export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      Add to cart
    </button>
  );
}
