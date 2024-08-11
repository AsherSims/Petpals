import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-around w-full max-w-4xl">
        <div className="text-center">
          <div className="flex justify-center items-center w-16 h-16 rounded-full bg-orange-400 mb-4">
            <FaEnvelope className="text-white text-2xl" />
          </div>
          <p>contact@trimbar.com</p>
          <p>contact@trimbar.com</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center items-center w-16 h-16 rounded-full bg-orange-400 mb-4">
            <FaPhone className="text-white text-2xl" />
          </div>
          <p>+88 0123 456 789</p>
          <p>+88 0123 456 789</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center items-center w-16 h-16 rounded-full bg-orange-400 mb-4">
            <FaMapMarkerAlt className="text-white text-2xl" />
          </div>
          <p>62, 74th Avenue - Glendale</p>
          <p>NY 11385, US</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
