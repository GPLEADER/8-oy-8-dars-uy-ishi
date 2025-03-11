import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cartSlice";
import { toast } from "react-toastify";


function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchCartProducts() {
      if (cart.length === 0) {
        setProducts([]);
        return;
      }

      try {
        const response = await axios.get("https://dummyjson.com/products");
        const allProducts = response.data.products;
        const filteredProducts = allProducts.filter((product) => cart.includes(product.id));
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    }

    fetchCartProducts();
  }, [cart]);


  const handleRemoveToCart = (product) => {
    dispatch(removeFromCart(product.id));
    toast.success(`${product.title} savatdan ochirildi!`);
  };



  return (
    <div className="flex flex-col gap-6 mt-7">
      {products.map((product) => (
        <div key={product.id} className="p-3 border rounded-xl bg-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <h3 className="text-sm text-gray-700 font-semibold">{product.title}</h3>
              <span className="text-lg font-bold text-gray-900">{product.price} so‘m</span>
            </div>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(product.id), handleRemoveToCart(product))}
            className="px-4 py-2 bg-red-500 cursor-pointer  text-white rounded-md hover:bg-red-600"
          >
            O‘chirish
          </button>
        </div>
      ))}
      {products.length === 0 && <p className="text-center w-full text-gray-600">Savat bo‘sh</p>}
    </div>
  );
}

export default Cart;
