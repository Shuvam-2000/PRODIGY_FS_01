import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8000/api/user/signup', data);
      reset();
      toast.success('SignUp Successful');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Error submitting form");
        reset();
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200"
      >
        <div className="flex flex-col items-center mb-6">
          <p className="text-3xl font-mono font-bold text-gray-800">SignUp</p>
          <div className="w-12 h-1 bg-[#f21c1c] mt-2 rounded-full" />
        </div>

        {/* Name Field */}
        <input
          type="text"
          placeholder="Enter Your Name"
          className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          {...register("name", {
            required: "Name is Required",
            minLength: { value: 4, message: "Minimum 4 characters required" },
            maxLength: { value: 20, message: "Maximum 20 characters allowed" },
          })}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}

        {/* Email Field */}
        <input
          type="text"
          placeholder="Enter Your Email"
          className={`w-full mt-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          {...register("email", {
            required: "Email is Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}

        {/* Password Field */}
        <input
          type="password"
          placeholder="Enter Your Password"
          className={`w-full mt-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          {...register("password", {
            required: "Password is Required",
            minLength: { value: 6, message: "Minimum 6 characters required" },
            maxLength: { value: 12, message: "Maximum 12 characters allowed" },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
              message: "Password must contain at least 1 letter and 1 number",
            },
          })}
        />
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}

        {/* Role Field */}
        <select
          className={`w-full mt-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
          {...register("role", { required: "Role is required" })}
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-[#f21c1c] hover:bg-red-600 transition-all text-white font-semibold py-3 rounded-lg"
        >
          SignUp
        </button>

        {/* Login Link */}
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Already Have an Account?{" "}
            <span
              onClick={() => navigate('/login')}
              className="text-[#f21c1c] cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
