import axios from "axios";
import Link from "next/link";
import api from "@/store/axios";
import AddToCartButton from "@/components/addtocartbutton";

export default async function ProductDetails({ params }) {
  const { id } = await params;

let product = await api
  .get(`/products/${id}`)
  .then((res) => res.data)
  .catch((err) => {
    console.error("Product fetch failed:", err.message);
    return null;
  });


  // If product not found → show 404
  if (!product || !product.id) {
    return <p>Sruthi</p>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Link href="/" className="inline-block mb-6 text-sm text-blue-600 hover:underline">
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* IMAGES */}
        <div className="lg:col-span-1">
          <div className="border rounded-xl overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-80 object-cover"
            />
          </div>
          </div>
        {/* DETAILS */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-2xl font-bold text-green-700">${product.price}</div>

            {product.discountPercentage != null && (
              <div className="text-sm font-semibold text-red-500">
                {product.discountPercentage}% OFF
              </div>
            )}

            <div className="ml-auto text-sm text-yellow-600">⭐ {product.rating}</div>
          </div>

          {/* TOP SPECS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div>
              <div className="text-sm text-gray-500">Brand</div>
              <div className="font-medium">{product.brand}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Category</div>
              <div className="font-medium">{product.category}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Stock</div>
              <div className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock} available
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">SKU</div>
              <div className="font-medium">{product.sku ?? "-"}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Weight</div>
              <div className="font-medium">{product.weight}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Dimensions</div>
              <div className="font-medium">
                {product.dimensions
                  ? `${product.dimensions.width}×${product.dimensions.height}×${product.dimensions.depth}`
                  : "—"}
              </div>
            </div>
          </div>

          {/* INFO SECTIONS */}
          <div className="mb-6">
            <div className="text-sm text-gray-500">Warranty</div>
            <div className="font-medium">{product.warrantyInformation ?? "—"}</div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500">Shipping</div>
            <div className="font-medium">{product.shippingInformation ?? "—"}</div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500">Return policy</div>
            <div className="font-medium">{product.returnPolicy ?? "—"}</div>
          </div>

          {product.tags?.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {product.tags.map((item, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  #{item}
                </span>
              ))}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3">
           
            <AddToCartButton product={product}></AddToCartButton>

            <button className="px-6 py-3 border rounded-lg hover:bg-gray-50">
              Add to wishlist
            </button>
          </div>

          {/* META */}
          <div className="mt-8 text-sm text-gray-500">
            <div>Barcode: {product.meta?.barcode ?? "—"}</div>
            <div>
              QR:{" "}
              {product.meta?.qrCode ? (
                <a
                  href={product.meta.qrCode}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
              ) : (
                "—"
              )}
            </div>
            <div className="mt-2">
              Minimum order quantity: {product.minimumOrderQuantity ?? "—"}
            </div>
          </div>

          {/* REVIEWS */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Customer reviews</h2>

            {!product.reviews || product.reviews.length === 0 ? (
              <div className="text-gray-500">No reviews yet.</div>
            ) : (
              product.reviews.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-semibold">{item.reviewerName?? `Reviewer ${index + 1}`}</div>
                    <div className="text-yellow-600">⭐ {item.rating ?? product.rating}</div>
                  </div>
                  <div className="text-gray-700">{item.comment ?? item.review ?? "—"}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
