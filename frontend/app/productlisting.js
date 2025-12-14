"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useproductstore from "@/store/productstore";


export default function Productlisting() {
  
      const products = useproductstore((state) => state.products)
            const getproducts = useproductstore((state) => state.getproducts)



  useEffect(() => {
   getproducts();
  }, []);

  return (
    <div className="p-6">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((item) => (
          <div
            key={item.id}
            className="max-w-sm bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <img className="rounded-t-xl w-full h-56 object-cover" src={item.thumbnail}/>

            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold text-gray-900">
                {item.title}
              </h5>

              <p className="mb-3 text-gray-700 ">
                {item.description}
              </p>

              <p className="mb-4 font-semibold text-green-700">
                Price: ${item.price}
              </p>
                 <Link href={`/products/${item.id}`}> 

              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                View Details
              </button>
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
