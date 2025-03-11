import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
    toast.success(`${product.title} savatga qo‘shildi!`);
  };

  if (!product) {
    return <p className="text-center text-gray-600">Yuklanmoqda...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img src={product.thumbnail} alt={product.title} className="w-full h-96 object-cover rounded-lg" />
          <div className="flex gap-2 mt-3">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt="product" className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75" />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-gray-700 mt-4"><strong>Brend:</strong> {product.brand}</p>
          <p className="text-gray-700"><strong>Kategoriya:</strong> {product.category}</p>
          <p className="text-yellow-500 flex items-center gap-1 mt-2">
            ⭐ {product.rating} ({product.stock} dona mavjud)
          </p>

          <div className="mt-4">
            <span className="line-through text-gray-400 text-lg">{product.price * 1.2} so‘m</span>
            <span className="text-2xl font-bold text-gray-900 ml-2">{product.price} so‘m</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-lg text-lg font-semibold transition-all"
          >
            🛒 Savatga qoshish
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
