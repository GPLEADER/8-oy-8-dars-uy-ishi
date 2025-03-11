import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleLike } from "../features/likedProductsSlice";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddCart from "../assets/addCart.png";
import Heart from '../assets/heart.png';
import LikedHeart from '../assets/likedHeart.png';

function Products({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [likedProducts, setLikedProducts] = useState(() => JSON.parse(localStorage.getItem("likedProducts")) || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=8&skip=${page * 8}`);
      const newProducts = response.data.products;

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm && products.length > 0) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  function handleLiked(productId) {
    setLikedProducts((prev) => {
      const updatedLikes = { ...prev, [productId]: !prev[productId] };
      localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
    dispatch(toggleLike(productId));
  }

  const displayProducts = searchTerm ? filteredProducts || [] : products || [];


  return (
    <div className="flex flex-wrap justify-between gap-6 mt-7">
      {displayProducts.map((product) => (
        <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="w-72 p-3 hover:shadow-lg transition-all duration-200 cursor-pointer rounded-xl bg-white">
          <div className="relative">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded-lg" />
            <img onClick={(e) => { e.stopPropagation(); handleLiked(product.id); }} className="absolute top-2 right-2 cursor-pointer" src={likedProducts[product.id] ? LikedHeart : Heart} alt="Like" width={25} />
            <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">Super narx</span>
          </div>
          <div className="p-3">
            <h3 className="text-sm text-gray-700 font-semibold">{product.title}</h3>
            <div className="text-xs bg-yellow-200 text-gray-800 px-2 py-1 rounded mt-1 inline-block">{Math.round(product.price / 12)} so‘m/oyiga</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="line-through text-gray-400 text-sm">{product.price * 1.2}</span>
              <span className="text-lg font-bold text-gray-900">{product.price}</span>
            </div>
            <div className="flex justify-end">
              <button onClick={(e) => { e.stopPropagation(); dispatch(addToCart(product.id)); toast.success(`${product.title} savatga qo‘shildi!`); }} className="hover:bg-gray-300 transition-all duration-150 cursor-pointer rounded-full items-center flex justify-center p-2">
                <img src={AddCart} alt="Cart" width={25} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {loading && <p className="text-center w-full text-gray-600">Yuklanmoqda...</p>}
      {!hasMore && <p className="text-center w-full text-gray-400">Barcha mahsulotlar yuklandi.</p>}
    </div>
  );
}

export default Products;
