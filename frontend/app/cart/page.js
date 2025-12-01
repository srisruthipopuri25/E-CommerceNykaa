import { useCartStore } from "@/store/cartstore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);

  return (
    <div>
      <h1>My Cart</h1>

      {cart.length === 0 && <p>No items in cart.</p>}

      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>₹ {item.price}</p>
        </div>
      ))}
    </div>
  );
}
