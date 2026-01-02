import { create } from 'zustand';
import api from '@/store/axios';

const useProductStore = create((set) => ({
  products: [],
  product: null,
  recommendedproducts: [],

  getProducts: async () => {
    try {
      const res = await api.get('/products');
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
        set({
          product: data,
        });
      })
      .catch((error) => console.error('Product fetch failed:', error)),

  getRecommendedProducts: async () => {
    try {
      const res = await api.get('/recommendedproducts/2');
      set({ recommendedproducts: res.data.recommendations || [] });
    } catch (err) {
      console.error('Fetch recommendations failed', err);
    }
  },
}));

export default useProductStore;
