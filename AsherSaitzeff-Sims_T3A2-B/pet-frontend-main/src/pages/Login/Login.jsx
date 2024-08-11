import React, { useState } from "react";
import assets from "../../assets/images/assets.png";
import { loginUser } from "../../ApiService/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions/User";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const validate = () => {
    const errors = {};
    if (!username.trim()) errors.username = "Username/Email is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const loginData = { username, password, role };
    try {
      const response = await loginUser(loginData);
      if(response.statusCode===200){
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setUser(response.data))
        sessionStorage.setItem('role', response.data.user.role);
        toast.success(response.message);
      }
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center pb-[90px] pt-[50px] bg-[#FFF4E3]"
      style={{
        backgroundImage: `url(${assets})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ToastContainer />
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md sm:mx-0 mx-4">
        <h2 className="text-2xl font-semibold mb-6 text-center button-font">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username/Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.username
                  ? "border-red-500 focus:ring-red-200"
                  : "border-orange-400 focus:ring-orange-200"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-orange-400 focus:ring-orange-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 button-font font-semibold bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 w-full"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4 button-font">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-500 hover:underline font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
