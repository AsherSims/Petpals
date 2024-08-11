import React, { useState, useEffect } from "react";
import assets from "../../assets/images/assets.png";
import Card from "../../components/Card/Card";
import Dog from "../../assets/images/dog.png";
import { getAllPets } from "../../ApiService/ApiService";
import { FaChevronLeft, FaChevronRight, FaPlus, FaPaw } from 'react-icons/fa';

function PetPage() {
  const [allPets, setAllPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const petsPerPage = 6;

  const renderPets = async (page) => {
    try {
      const offset = (page - 1) * petsPerPage;
      const response = await getAllPets({
        limit: petsPerPage,
        offset: offset,
      });
      setAllPets(response.data.pets);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    renderPets(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };



  return (
    <div className="overflow-hidden">
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
          <h2 className="text-[#000400] sm:text-[85px] text-[43px] font-bold mb-[20px]">
            Adopt a Pet
          </h2>
          <p className="text-[#55595e] sm:text-[18px] text-[15px] button-font">
            Pets available for adoption. Find your new pet from our animal shelters and rescue partners.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid sm:grid-cols-3 sm:gap-[54px] gap-[42px] sm:mt-[120px] mt-[70px]">
          {allPets.map((pet, index) => (
            <>
              <Card
                key={index}
                name={pet.name}
                age={pet.age}
                gender={pet.gender}
                imageUrl={pet.image}
                bgColor="bg-gray-100"
                temperament={pet.temperament}
              />
            </>
          ))}
        </div>
      </div>
      <div className="mt-[42px] sm:mb-[120px] mb-[60px] flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`flex items-center justify-center w-12 h-12 rounded-full border border-green-500 bg-green-500 text-white hover:bg-grey-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          <FaChevronLeft size={18} />
        </button>
        <span className="text-lg font-medium">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`flex items-center justify-center w-12 h-12 rounded-full border border-green-500 bg-green-500 text-white hover:bg-grey-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          <FaChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default PetPage;
