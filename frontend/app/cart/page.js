"use client";

import { useMemo } from "react";
import useCartStore from "@/store/cartstore";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  // optional store actions (fall back to no-op if not provided)
  const addItem = useCartStore((s) => s.addItem) ?? ((item) => console.warn("addItem not implemented", item));
  const removeOne = useCartStore((s) => s.removeOne) ?? ((id) => console.warn("removeOne not implemented", id));
  const removeAll = useCartStore((s) => s.removeAll) ?? ((id) => console.warn("removeAll not implemented", id));

  // Group duplicates by id and compute quantity
  const grouped = useMemo(() => {
    const acc = cart.reduce((a, item) => {
      if (!a[item.id]) {
        a[item.id] = { ...item, quantity: 1 };
      }
      else a[item.id].quantity += 1;
      return a;
    }, {});
    return Object.values(acc);
  }, [cart]);

  const cartTotal = useMemo(
    () => grouped.reduce((sum, it) => sum + (Number(it.price) || 0) * it.quantity, 0),
    [grouped]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">My Cart</h1>
          <div className="text-sm text-gray-600">{cart.length} item{cart.length !== 1 && "s"}</div>
        </header>

        {grouped.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">No items in cart.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 rounded-lg bg-white p-4 shadow-sm">
              {grouped.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b last:border-b-0 pb-4"
                >
                  {/* Image placeholder */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    {item.image ? (
                      // if your item has an image url
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                        {item.variant && <p className="text-sm text-gray-500">{item.variant}</p>}
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-500">₹ {Number(item.price).toFixed(2)}</div>
                        <div className="mt-1 text-sm font-medium text-gray-800">
                          Subtotal: ₹ {(Number(item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeOne(item.id)}
                          aria-label={`Decrease quantity of ${item.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-lg shadow-sm transition hover:bg-gray-50"
                        >
                          −
                        </button>

                        <div className="min-w-[44px] text-center text-sm font-medium">
                          {item.quantity}
                        </div>

                        <button
                          onClick={() => addItem(item)}
                          aria-label={`Increase quantity of ${item.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-lg shadow-sm transition hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeAll(item.id)}
                          className="rounded-md px-3 py-1 text-sm text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals & actions */}
            <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-2xl font-semibold text-gray-800">₹ {cartTotal.toFixed(2)}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // example: implement checkout flow or navigate
                    console.log("Proceed to checkout");
                  }}
                  className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
                >
                  Checkout
                </button>

                <button
                  onClick={() => {
                    // clear cart if your store has it; otherwise just log
                    const clear = useCartStore.getState().clearCart;
                    if (typeof clear === "function") clear();
                    else console.warn("clearCart not implemented on store");
                  }}
                  className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
