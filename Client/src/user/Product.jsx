import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Error Logging In");
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:8000/api/product/getproducts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data.products || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch products. Try again."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Logout Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        All Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {product.productName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {product.productDescription}
              </p>
              <p className="text-gray-800 font-bold">₹{product.productPrice}</p>
              <p className="text-xs text-gray-500 mt-1">
                Quantity: {product.productQuantity}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
