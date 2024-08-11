import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import assets from "../../assets/images/assets.png";
import assets2 from "../../assets/images/asset2.png";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { submitContactForm } from "../../ApiService/ApiService";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(formData);
      toast.success("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="overflow-hidden">
      <ToastContainer />
      <div
        className="bg-[#FFF4E3] sm:py-[120px] py-[60px]"
        style={{
          backgroundImage: `url(${assets})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center px-[24px] sm:px-0">
          <h2 className="text-[#000400] sm:text-[85px] text-[43px] font-bold sm:mb-[20px] mb-2">
            Contact
          </h2>
          <p className="text-[#55595e] sm:text-[18px] text-[15px] button-font">
            If you would like to donate to our cause or report a stray animal,
            then please contact our 24/7 help center
          </p>
        </div>
      </div>
      <div
        className="flex flex-col justify-center items-center mt-[60px] sm:mb-[120px] mb-[60px] sm:mx-0 mx-4"
        style={{
          backgroundImage: `url(${assets2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-between gap-8 sm:gap-16 mb-16 px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col items-center text-center font-semibold button-font">
            <div className="flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-400 mb-4">
              <FaEnvelope className="text-white text-xl sm:text-2xl" />
            </div>
            <p>Petpals@adoption.com</p>
          </div>
          <div className="flex flex-col items-center text-center font-semibold button-font">
            <div className="flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-400 mb-4">
              <FaPhone className="text-white text-xl sm:text-2xl" />
            </div>
            <p>3297 0607</p>
          </div>
          <div className="flex flex-col items-center text-center font-semibold button-font">
            <div className="flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-400 mb-4">
              <FaMapMarkerAlt className="text-white text-xl sm:text-2xl" />
            </div>
            <p>38 Brisbane city</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                rows="4"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-4 py-2 w-full button-font font-semibold bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
