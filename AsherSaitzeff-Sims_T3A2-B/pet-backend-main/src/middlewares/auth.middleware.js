import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);
        if (!user) {
           
            throw new ApiError(401, "Invalid access token");
        }
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject.__v;
        req.user = userObject;
        next();
    } catch (error) {
       
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export const verifyAdmin = asyncHandler(async (req, _, next) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Access denied. You do not have permission to access this resource.");
    }
    next();
});