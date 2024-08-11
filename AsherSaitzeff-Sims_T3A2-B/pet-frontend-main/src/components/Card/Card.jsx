import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { ADMIN } from '../../Constants';

const Card = ({ name, role, age, gender, imageUrl, bgColor, temperament, onEdit, onDelete, setShowEditModal, setShowDeleteModal }) => {
  const temperamentTags = temperament?.split(', ');
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleEditClick = (e) =>{
    e.preventDefault();
    setShowDeleteModal(false)
    setIsMenuOpen(false)
    onEdit()
  }

  const handleDeleteClick = (e) =>{
    e.preventDefault();
    setShowEditModal(false)
    setIsMenuOpen(false)
    onDelete()
  }

  return (
    <div
      className={`rounded-[50px] shadow-lg overflow-hidden min-w-[320px] ${bgColor} cursor-pointer relative`}
    >
      <div className="relative">
        <img
          src={`data:${imageUrl?.contentType};base64,${imageUrl?.data}`}
          alt={name}
          className="w-full max-h-[250px] object-cover"
        />
        {
          role === ADMIN && (
            <div className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-1 shadow-md" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
              <FiMoreVertical className="text-gray-700 hover:text-gray-900" size={20} />
            </div>
          )
        }
            {isMenuOpen && (
              <div className="absolute top-8 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-32 z-10">
                <ul className="py-1">
                  <li
                    onClick={handleEditClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Edit
                  </li>
                  <li
                    onClick={handleDeleteClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
      </div>
      <div className="bg-white text-start py-6 px-6 transition duration-300 ease-in-out transform hover:bg-[#FFF4E3]">
        <h2 className="text-lg font-semibold card-font">{name}</h2>
        <div className="flex justify-between card-font text-[#55595e] font-medium">
          <p>{age} year old</p>
          <p>{gender}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-md font-semibold card-font">Temperament</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {temperamentTags?.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 card-font text-sm px-3 py-1 rounded-full font-medium border border-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
