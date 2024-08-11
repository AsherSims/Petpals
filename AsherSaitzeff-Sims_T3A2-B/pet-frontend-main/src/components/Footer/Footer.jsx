import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import Logo from "../../assets/images/footer-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#000b18] text-white py-[60px] sm:px-[160px]">
      <div className="mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="sm:text-center md:text-left mb-6 md:mb-0 mr-10">
          <div className="flex items-center sm:justify-center md:justify-start">
            <img src={Logo } alt="Petpals Logo" className="w-[200px]" />
          </div>
          <p className="mt-4 text-white text-sm button-font">
            Lorem ipsum dolor sit amet, consetetur <br /> sadipscing elitr, sed diam.
          </p>
        </div>
        <div className="sm:ml-0 mr-24 flex sm:flex-row flex-col sm:justify-center items-start justify-start sm:gap-[120px] mb-6 md:mb-0 button-font">
          <div className="">
            <h3 className="text-lg font-semibold">Explore</h3>
            <ul className="mt-4 text-white">
              <li className="mt-2"><a href="#">About Us</a></li>
              <li className="mt-2"><a href="#">Adopt</a></li>
              <li className="mt-2"><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className='sm:mt-0 mt-4'>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 text-white">
              <li className="mt-2">38 Brisbane city, Australia.</li>
              <li className="mt-2">3297 0607</li>
              <li className="mt-2">Petpals@adoption.com</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center md:justify-start ">
          <a href="#" className="mx-2 text-white hover:text-white border-[4px] p-[10px] rounded-full"><FaFacebookF /></a>
          <a href="#" className="mx-2 text-white hover:text-white border-[4px] p-[10px] rounded-full"><FaInstagram /></a>
          <a href="#" className="mx-2 text-white hover:text-white border-[4px] p-[10px] rounded-full"><FaYoutube /></a>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-white button-font font-medium">
        Copyright © Petpals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
