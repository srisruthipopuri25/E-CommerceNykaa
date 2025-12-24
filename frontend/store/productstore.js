import { create } from "zustand";
import api from "@/lib/axios";

const useProductStore = create((set) => ({
  products: [],
  product: null,

  getProducts: () =>
    api
      .get("/products")
      .then((res) => res.data)
      .then((data) => {
        set(() => ({
          products: data.products,
        }));
      })
      .catch((error) => console.log(error)),

  getSingleProduct: (id) =>
    api
      .get(`/products/${id}`)
      .then((res) => res.data)
      .then((data) => {
        set(() => ({
          product: data.product,
        }));
      })
      .catch((error) => console.log(error)),
}));

export default useProductStore;
