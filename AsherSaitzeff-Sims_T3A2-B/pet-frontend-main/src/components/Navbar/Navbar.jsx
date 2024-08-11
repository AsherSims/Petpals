import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ADMIN } from "../../Constants";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogOut = (e) =>{
    e.preventDefault();
    navigate("/login")
    localStorage.setItem("token", "");  
    sessionStorage.setItem("role", "");
  }
  console.log(localStorage.getItem("token")?.length);
  return (
    <nav className="relative bg-[#FFF4E3] py-4 px-4 md:px-24 flex justify-between items-center">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Pawwelfare Logo"
          className="sm:w-56 w-40 h-auto object-cover"
        />
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleDrawer} className="text-black text-3xl">
          {isDrawerOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

     
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-[#FFF4E3] transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-50 shadow-lg`}
      >
        <div className="flex justify-between items-center p-4">
          <img
            src={logo}
            alt="Pawwelfare Logo"
            className="w-32 h-auto object-cover"
            onClick={() => {
              navigate("/");
              toggleDrawer();
            }}
          />
          <button onClick={toggleDrawer} className="text-black text-3xl">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col p-6 space-y-6 text-xl">
          <a
            href="/"
            className="text-black hover:text-orange-600 font-semibold"
            onClick={toggleDrawer}
          >
            Home
          </a>
          
          <a
            href="/pets"
            className="text-black hover:text-orange-600 font-semibold"
            onClick={toggleDrawer}
          >
            Pet Adoption
          </a>
          <a
            href="/contact"
            className="text-black hover:text-orange-600 font-semibold"
            onClick={toggleDrawer}
          >
            Contact
          </a>
            {
              localStorage.getItem("token")?.length===0  ? (
                <a
                href="/login"
                className="text-black hover:text-orange-600 font-semibold"
                onClick={toggleDrawer}
              >
                Login
              </a>
              ) : (
                <a
                href="/login"
                className="text-black hover:text-orange-600 font-semibold"
                onClick={handleLogOut}>Logout</a>
              )
            }
          <a
            href="/register"
            className="text-black hover:text-orange-600 font-semibold"
            onClick={toggleDrawer}
          >
            Register
          </a>
          {sessionStorage.getItem("role")?.toUpperCase() === ADMIN && (
            <a
              href="/admin"
              className="text-black hover:text-orange-600 font-semibold"
              onClick={toggleDrawer}
            >
              Admin
            </a>
          )}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-lg">
        <a
          href="/"
          className="text-black hover:text-orange-600 font-semibold transition duration-300"
        >
          Home
        </a>
      
        <a
          href="/pets"
          className="text-black hover:text-orange-600 font-semibold transition duration-300"
        >
          Pet Adoption
        </a>
        <a
          href="/contact"
          className="text-black hover:text-orange-600 font-semibold transition duration-300"
        >
          Contact
        </a>
        {
          localStorage.getItem("token")?.length===0 ? (
            <a
            href="/login"
            className="text-black hover:text-orange-600 font-semibold transition duration-300"
          >
            Login
          </a>
          ) : (
            <a
            href="/login"
            className="text-black hover:text-orange-600 font-semibold transition duration-300"
            onClick={handleLogOut}
          >
            Logout
          </a>
          )
        }
        <a
          href="/register"
          className="text-black hover:text-orange-600 font-semibold transition duration-300"
        >
          Register
        </a>
        {sessionStorage.getItem("role")?.toUpperCase() === ADMIN && (
          <a
            href="/admin"
            className="text-black hover:text-orange-600 font-semibold transition duration-300"
          >
            Admin
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
