import { create } from "zustand";
import api from "@/store/axios";

const useProductStore = create((set) => ({
  products: [],
  product: null,

 getProducts: async () => {
  try {
    const res = await api.get("/products");
    set({ products: res.data.products });
  } catch (error) {
    console.log(error);
  }
},


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
