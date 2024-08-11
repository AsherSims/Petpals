import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Image } from "../models/image.model.js";
import { Pet } from "../models/pet.model.js";
import fs from 'fs';
import { removeLocalFile } from "../utils/helpers.js";

const addPet = asyncHandler(async (req, res) => {
    try {
        const { name, age, gender, temperament } = req.body;

        
        const imageBuffer = fs.readFileSync(req.file.path);
        const imageData = {
            data: imageBuffer,
            contentType: req.file.mimetype,
            size: req.file.size,
            imageName: req.file.originalname
        };
        const insetedImage = await Image.create(imageData);
        removeLocalFile(req.file?.path);
        if (!insetedImage) {
            throw new ApiError(400, "Image not saved");
        }

        const petData = {
            name,
            age,
            gender,
            temperament,
            image: insetedImage._id
        }
        const insertedPet = await Pet.create(petData);
        if (!insertedPet) {
            throw new ApiError(400, "Pet not saved");
        }

        
        return res
            .status(201)
            .json(new ApiResponse(201, insertedPet, "Pet added Successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while adding the pet");
    }
});

const updatePet = asyncHandler(async (req, res) => {
    try {
        const { petId } = req.params;
        const { name, age, gender, temperament } = req.body;

        const pet = await Pet.findById(petId);
        if (!pet) {
            throw new ApiError(404, "Pet not found");
        }

        
        if (req.file) {
            const petExistingImage = await Image.findById(pet.image);
            const imageBuffer = fs.readFileSync(req.file.path);
            petExistingImage.data = imageBuffer;
            petExistingImage.contentType = req.file.mimetype;
            petExistingImage.size = req.file.size;
            petExistingImage.imageName = req.file.originalname;
            const updatedImage = await petExistingImage.save();
            removeLocalFile(req.file?.path);
            if (!updatedImage) {
                throw new ApiError(400, "Image not updated");
            }
        }
        if (name) {
            pet.name = name;
        }
        if (age) {
            pet.age = age;
        }
        if (gender) {
            pet.gender = gender;
        }
        if (temperament) {
            pet.temperament = temperament;
        }

        const updatedPet = await pet.save();
        if (!updatedPet) {
            throw new ApiError(400, "Pet not updated");
        }

        
        return res
            .status(200)
            .json(new ApiResponse(200, updatedPet, "Pet Updated Successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while updating the pet");
    }
});

const removePet = asyncHandler(async (req, res) => {
    try {
        const { petId } = req.params;

        const pet = await Pet.findById(petId);
        if (!pet) {
            throw new ApiError(404, "Pet not found");
        }

        await Image.findByIdAndDelete(pet.image);
        const deletedPet = await Pet.findByIdAndDelete(petId);
        if (!deletedPet) {
            throw new ApiError(400, "Pet not deleted");
        }

        
        return res
            .status(200)
            .json(new ApiResponse(200, "Pet removed Successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while deleting the pet");
    }
});

const petDetails = asyncHandler(async (req, res) => {
    try {
        const { petId } = req.params;

        const pet = await Pet.findById(petId);
        if (!pet) {
            throw new ApiError(404, "Pet not found");
        }

        
        return res
            .status(200)
            .json(new ApiResponse(200, pet, "Pet details fatched Successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while fething pet details");
    }
});

const allPetDetails = asyncHandler(async (req, res) => {
    try {
        
        let { limit, offset } = req.body;
        limit = parseInt(limit, 10) || 10; 
        offset = parseInt(offset, 10) || 0; 

        
        const pets = await Pet.find({})
            .populate('image') 
            .skip(offset)
            .limit(limit);

        const petsWithBase64Images = pets.map(pet => {
            const base64Image = pet.image.data.toString('base64');
            return {
                ...pet._doc,
                image: {
                    ...pet.image._doc,
                    data: base64Image
                }
            };
        });

        const totalPets = await Pet.countDocuments();

        const response = {
            pets: petsWithBase64Images,
            totalPets,
            currentPage: Math.floor(offset / limit) + 1,
            totalPages: Math.ceil(totalPets / limit),
            limit,
            offset,
        };

        return res.status(200).json(new ApiResponse(200, response, "All pet details fetched successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while fetching pets");
    }
});

export {
    addPet,
    updatePet,
    removePet,
    petDetails,
    allPetDetails
}