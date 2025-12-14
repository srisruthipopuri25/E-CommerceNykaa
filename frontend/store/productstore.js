import { create } from "zustand";
import axios from "axios";
const useproductstore = create((set) => ({
    products: [],
    getproducts: () =>
        // axios.get("https://dummyjson.com/products")
        axios.get("http://localhost:5000/products")
            .then((res) => res.data)
            .then((data) => {
                set((state) => ({

                    products: data.products
                }))
            })

}))
export default useproductstore;

