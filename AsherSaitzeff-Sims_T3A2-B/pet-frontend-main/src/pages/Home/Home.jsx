import React, { useEffect, useState } from "react";
import Hero from "../../assets/images/hero.png";
import { FaSearch } from "react-icons/fa";
import Card from "../../components/Card/Card";
import person from "../../assets/images/person.jpg";
import { FaArrowRight } from "react-icons/fa";
import Testimonial from "../../components/Testimonial/Testimonial";
import assets from "../../assets/images/assets.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAllPets } from "../../ApiService/ApiService";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [allPets, setAllPets] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const petsPerPage = 3;

  const navigate = useNavigate();

  const renderPets = async (page) => {
    try {
      const offset = (page - 1) * petsPerPage;
      const response = await getAllPets({
        limit: petsPerPage,
        offset: offset,
      });
      console.log(response.data);
      setAllPets(response.data.pets);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
    renderPets(1)
  }, []);

  return (
    <div className="overflow-hidden">
     
      <div className="bg-[#FFF4E3] flex sm:flex-row flex-col sm:px-[180px] px-[24px] pt-[30px] sm:pt-0 justify-between items-center gap-[90px] pb-[40px]">
        <div data-aos="fade-right px-[34px]">
          <h2 className="text-[#000400] sm:text-[90px] text-[37px] font-bold sm:leading-tight">
            Adopt A 
            Furry <br /> Friend
          </h2>
          <p className="text-[#55595e] sm:text-[18px] text-[14px] mt-4 button-font">
            Life is easier with a furry best friend by your side. Find your new
            pet from our animal shelters.
          </p>
          <div className="flex items-center bg-white rounded-full shadow-md p-3 max-w-md sm:mt-10 mt-8">
            <FaSearch className="text-gray-400 mx-3" />
            <input
              type="text"
              placeholder="Choose Your Location"
              className="flex-grow outline-none"
            />
            <button className="bg-[#ffa24c] text-white px-8 py-2 rounded-full button-font">
              Search
            </button>
          </div>
        </div>
        <div data-aos="fade-left" className="">
          <img src={Hero} className="object-cover sm:w-[550px]" alt="" />
        </div>
      </div>
     
      <div
        className="bg-[#ffff] sm:px-[140px] sm:py-[90px] py-[70px] flex flex-col items-center justify-center"
      >
        <div data-aos="fade-up">
          <h2 className="sm:text-[55px] text-[28px] text-center font-semibold">
            Animals Available For <br /> Adoption Near You
          </h2>
        </div>
        <div data-aos="fade-right" className="grid sm:grid-cols-3 grid-cols-1 sm:gap-[54px] gap-[42px] sm:mt-[60px] mt-[30px]">
          {allPets.map((pet, index) => (
              <Card
              key={index}
              name={pet.name}
              age={pet.age}
              gender={pet.gender}
              imageUrl={pet.image}
              bgColor="bg-gray-100"
              temperament={pet.temperament}
            />
          ))}
        </div>
      </div>
      
      <div className="pb-[90px] mt-4 grid sm:grid-cols-2 items-center justify-center sm:px-[140px] px-[24px]">
        <div data-aos="fade-right" className="flex items-center justify-center">
          <img src={person} className="object-cover w-[460px]" alt="" />
        </div>
        <div data-aos="fade-left">
          <h2 className="text-[#000400] sm:text-[55px] text-[28px] sm:mt-0 mt-[42px] font-bold leading-tight">
            Adopt Pets And Save Their Lives
          </h2>
          <p className="text-[#7f817f] sm:text-[18px] text-[14px] sm:my-[34px] my-[18px] sm:text-auto text-justify button-font">
            Why bother shopping for pets when they are thousands of homeless
            puppies and kittens looking for a family? Adopt rescued animals from
            our shelters and make a change in the lives of animals in your area.
          </p>
          <button onClick={() => navigate("/contact")} className="bg-[#ffa24c] text-white px-8 py-[10px] rounded-full button-font flex gap-2 items-center font-medium shadow-lg">
            Contact
            <FaArrowRight />
          </button>
        </div>
      </div>
    
      <div className="bg-[#FFF4E3] py-[90px] px-[24px] sm:px-0"
      style={{
        backgroundImage: `url(${assets})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      >
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-[#000400] sm:text-[55px] text-[28px] font-bold leading-tight">
            Hear From Our Pet Parents
          </h2>
          <p className="text-[#55595e] sm:text-[18px] text-[14px] my-[20px] button-font">
            Don’t just take our word for it. Hear from over hundreds of pet
            owners who have rescued animals from our shelters.
          </p>
        </div>
        <div data-aos="fade-left" className=""
        >
          <Testimonial />
        </div>
      </div>
    </div>
  );
};

export default Home;
