import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./common/Signup";
import Login from "./common/Login";
import AddProduct from "./admin/AddProduct";
import Product from "./user/Product";
import ProtectRoute from "./common/ProtectRoute";
import "./index.css";

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/addproduct"
            element={
              <ProtectRoute allowedRoles={["admin"]}>
                <AddProduct />
              </ProtectRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectRoute allowedRoles={["user"]}>
                <Product />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
