import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Error Logged In");
        navigate("/login");
        return;
      }
      await axios.post("http://localhost:8000/api/product/newproduct", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product added successfully!");
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add product. Try again."
      );
    }
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      {/* Logout Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto mt-20 bg-white p-8 rounded-xl shadow-xl border border-gray-200"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add Product
        </h2>

        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          className={`w-full px-4 py-3 text-sm border rounded-lg ${
            errors.productName ? "border-red-500" : "border-gray-300"
          }`}
          {...register("productName", { required: "Product name is required" })}
        />
        {errors.productName && (
          <p className="text-xs text-red-500 mt-1">
            {errors.productName.message}
          </p>
        )}

        {/* Product Description */}
        <textarea
          placeholder="Product Description"
          className={`w-full mt-4 px-4 py-3 text-sm border rounded-lg ${
            errors.productDescription ? "border-red-500" : "border-gray-300"
          }`}
          {...register("productDescription", {
            required: "Description is required",
          })}
        />
        {errors.productDescription && (
          <p className="text-xs text-red-500 mt-1">
            {errors.productDescription.message}
          </p>
        )}

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          className={`w-full mt-4 px-4 py-3 text-sm border rounded-lg ${
            errors.productPrice ? "border-red-500" : "border-gray-300"
          }`}
          {...register("productPrice", { required: "Price is required",  valueAsNumber: true, })}
        />
        {errors.productPrice && (
          <p className="text-xs text-red-500 mt-1">
            {errors.productPrice.message}
          </p>
        )}

        {/* Quantity */}
        <input
          type="number"
          placeholder="Quantity"
          className={`w-full mt-4 px-4 py-3 text-sm border rounded-lg ${
            errors.productQuantity ? "border-red-500" : "border-gray-300"
          }`}
          {...register("productQuantity", { required: "Quantity is required",  valueAsNumber: true, })}
        />
        {errors.productQuantity && (
          <p className="text-xs text-red-500 mt-1">
            {errors.productQuantity.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
