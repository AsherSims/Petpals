import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists");
        }

        const userData = {
            fullName,
            email,
            password,
            username: username.toLowerCase()
        };
        const user = await User.create(userData);
        if (!user) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        const userObject = user.toObject();   
        delete userObject.password;
        delete userObject.__v;

        return res
            .status(201)
            .json(new ApiResponse(201, userObject, "User registered Successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while registering the user");
    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username) {
            throw new ApiError(400, "Username or email is required");
        }

        const user = await User.findOne({
            $or: [{ username: username }, { email: username }],
            role: role || "user"
        });
        if (!user) {
            throw new ApiError(401, "Invalid user credentials");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials");
        }

        const accessToken = await user.generateAccessToken();

        const logged = await User.findById(user._id);
        const loggedInUser = logged.toObject();   
        delete loggedInUser.password;
        delete loggedInUser.__v;

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, accessToken
                    },
                    "User logged In Successfully"
                )
            );
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while logging in the user");
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User details fetched successfully"));
})

export {
    registerUser,
    loginUser,
    getCurrentUser,
}