import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../features/likedProductsSlice";
import LikedHeart from "../assets/likedHeart.png";
import Heart from "../assets/heart.png";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-toastify";
import AddCart from '../assets/addCart.png';

function Liked() {
  const likedProducts = useSelector((state) => state.likedProducts);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchLikedProducts() {
      const likedIds = Object.keys(likedProducts);
      if (likedIds.length === 0) return setProducts([]);

      try {
        const response = await axios.get(`https://dummyjson.com/products`);
        const allProducts = response.data.products;
        const filteredProducts = allProducts.filter((product) => likedIds.includes(product.id.toString()));
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    }

    fetchLikedProducts();
  }, [likedProducts]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product.id));
    toast.success(`${product.title} savatga qo‘shildi!`);
  };



  return (
    <div className="flex flex-wrap justify-start gap-6 mt-7">
      {products.map((product) => (
        <div key={product.id} className="w-72 p-3 hover:shadow-lg transition-all duration-200 cursor-pointer rounded-xl bg-white">
          <div className="relative">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              onClick={() => dispatch(toggleLike(product.id))}
              className="absolute top-2 right-2 cursor-pointer"
              src={likedProducts[product.id] ? LikedHeart : Heart}
              alt="Yurakcha"
              width={25}
            />
            <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
              Super narx
            </span>
          </div>
          <div className="p-3">
            <h3 className="text-sm text-gray-700 font-semibold">{product.title}</h3>
            <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.425 8.2 1.192-5.934 5.782 1.402 8.18-7.336-3.855-7.336 3.855 1.402-8.18-5.934-5.782 8.2-1.192z" />
              </svg>
              {product.rating} ({product.stock} dona mavjud)
            </div>
            <div className="text-xs bg-yellow-200 text-gray-800 px-2 py-1 rounded mt-1 inline-block">
              {Math.round(product.price / 12)} so‘m/oyiga
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="line-through text-gray-400 text-sm">{product.price * 1.2}</span>
              <span className="text-lg font-bold text-gray-900">{product.price}</span>
            </div>
            <div className="flex justify-end">
              <button onClick={() => dispatch(addToCart(product.id), handleAddToCart(product))} className="hover:bg-gray-300 transition-all duration-150 cursor-pointer rounded-full items-center flex justify-center p-2">
                <img src={AddCart} alt="" width={25} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Liked;
