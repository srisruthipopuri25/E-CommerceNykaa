import { create } from "zustand";
import axios from "axios";
const useproductstore = create((set) => ({
    products: [],
    product: [],
    getproducts: () =>
        axios.get("http://localhost:5000/products")
            .then((res) => res.data)
            .then((data) => {
                set((state) => ({

                    products: data.products
                }))
            }),

    getSingleProduct: (id) =>
        axios.get(`http://localhost:5000/products/${id}`)
            .then((res) => res.data)
            .then((data) => {
                set((state) => ({

                    product: data.product
                }))
            })


}))
export default useproductstore;

