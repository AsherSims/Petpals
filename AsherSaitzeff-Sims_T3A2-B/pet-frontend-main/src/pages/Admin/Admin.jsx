import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import {
  addPet,
  updatePet,
  deletePet,
  getAllPets,
} from "../../ApiService/ApiService";
import { ADMIN } from "../../Constants";
import { FaChevronLeft, FaChevronRight, FaPlus, FaPaw } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const User = useSelector((state) => state.User);
  console.log(User);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    image: null,
    temperament: "",
  });
  const [selectedPet, setSelectedPet] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allPets, setAllPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const petsPerPage = 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem("role")?.toUpperCase() !== ADMIN) navigate("/");
  }, []);

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
    renderPets(currentPage);
  }, [currentPage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds the maximum allowed limit of 5MB.");
        return;
      }

      setForm({
        ...form,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("gender", form.gender);
    formData.append("image", form.image);
    formData.append("temperament", form.temperament);

    try {
      if (selectedPet) {
        const response = await updatePet(selectedPet._id, formData);
        setSelectedPet(null);
        setShowEditModal(false);
        renderPets(currentPage);
        toast.success("Pet updated successfully!");
      } else {
        const newPet = await addPet(formData);
        renderPets(currentPage);
        toast.success("Pet added successfully!");
      }
      setForm({
        name: "",
        age: "",
        gender: "",
        image: null,
        temperament: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error occurred. Please try again.");
    }
  };

  const handleEdit = (pet) => {
    setForm(pet);
    setSelectedPet(pet);
    setShowEditModal(true);
  };

  const handleDelete = (pet) => {
    setSelectedPet(pet);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePet(selectedPet._id);
      setSelectedPet(null);
      const offset = (currentPage - 1) * petsPerPage;
      const response = await getAllPets({
        limit: petsPerPage,
        offset: offset,
      });
      const remainingPets = response.data.pets;

      if (remainingPets.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        setAllPets(remainingPets);
        setTotalPages(response.data.totalPages); 
      }
      toast.success("Pet deleted successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error occurred. Please try again.");
    }
    setShowDeleteModal(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="sm:p-4 min-h-screen flex flex-col items-center bg-[#FFF4E3] sm:pb-[120px] pb-[60px]">
      <ToastContainer />
      <div className="flex justify-between items-center sm:px-[210px] px-[24px] py-8 w-full">
        <h1 className="text-2xl font-bold card-font">Admin Panel</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-green-500 bg-green-500 text-white hover:bg-green-600 transition duration-300"
        >
          <FaPlus size={20} />
        </button>
      </div>

      {showForm && (
        <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
          <div className="overflow-hidden mt-5">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center button-font">
                {selectedPet ? "Edit Pet" : "Add New Pet"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  accept="image/*"
                  required
                />
                <input
                  type="text"
                  name="temperament"
                  value={form.temperament}
                  onChange={handleChange}
                  placeholder="Temperament (comma-separated)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full button-font border border-green-500 bg-green-500 text-white hover:bg-green-600 transition duration-300 font-semibold py-2 px-4 rounded-md "
                >
                  {selectedPet ? "Update Pet" : "Add Pet"}
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}

      {allPets.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-[54px] gap-[42px]">
            {allPets.map((pet, index) => (
              <Card
                key={index}
                role={ADMIN}
                name={pet.name}
                age={pet.age}
                gender={pet.gender}
                imageUrl={pet.image}
                bgColor="bg-gray-100"
                temperament={pet.temperament}
                onEdit={() => handleEdit(pet)}
                onDelete={() => handleDelete(pet)}
                setShowEditModal={setShowEditModal}
                setShowDeleteModal={setShowDeleteModal}
              />
            ))}
          </div>
          <div className="mt-[42px] flex justify-center items-center space-x-4">
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 min-h-screen">
          <FaPaw size={40} className="text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">
            Please add pets
          </h3>
          <p className="text-gray-500 mt-2">
            It looks like there are no pets available. Add some to get started!
          </p>
        </div>
      )}

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setForm({
            name: "",
            age: "",
            gender: "",
            image: null,
            temperament: "",
          });
          setSelectedPet(null);
        }}
      >
        <div className="p-4 sm:p-6 md:p-8 max-w-lg mx-auto bg-white rounded-lg ">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center button-font">
            Edit Pet
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
            <input
              type="text"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-200"
              accept="image/*"
            />
            <input
              type="text"
              name="temperament"
              value={form.temperament}
              onChange={handleChange}
              placeholder="Temperament (comma-separated)"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
            <button
              type="submit"
              className="w-full button-font border border-green-500 bg-green-500 text-white hover:bg-green-600 transition duration-300 font-semibold py-2 px-4 rounded-md"
            >
              Update Pet
            </button>
          </form>
        </div>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-4 button-font">
            Confirm Delete
          </h2>
          <p className="button-font">
            Are you sure you want to delete this pet?
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-500 text-white p-2 rounded button-font"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white p-2 rounded button-font"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
