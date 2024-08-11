import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import assets from "../../assets/images/assets.png";
import { registerUser } from '../../ApiService/ApiService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!fullName.trim()) errors.fullName = "Full Name is required";
    if (!username.trim()) errors.username = "Username is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email address is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters long";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = { fullName, username, email, password, role };
    try {
      const response = await registerUser(userData);
      console.log(userData);
      toast.success(response.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 seconds delay
    } catch (error) {
      toast.error(error.message || 'Registration failed');
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
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md sm:mx-0 mx-4">
        <h2 className="text-2xl font-semibold mb-6 text-center button-font">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-orange-400 focus:ring-orange-200'}`}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.username ? 'border-red-500 focus:ring-red-200' : 'border-orange-400 focus:ring-orange-200'}`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-orange-400 focus:ring-orange-200'}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-orange-400 focus:ring-orange-200'}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 w-full button-font font-semibold bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
