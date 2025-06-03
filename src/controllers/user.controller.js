import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
uploadOnCloudinary
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asynchandler(async (req, res) => {
  res.status(200).json({
    message: "All good here"
  })
   
  const {fullName, email, username, password} = req.body
console.log("email : ", email, "password : ", password);


  if(
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ){
    throw new ApiError(400, "All fields are required") 
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }]
  })

  if(existedUser){
    throw new ApiError(409, "User with email or username");
  }

  console.log(req.files)

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImagePath = req.files?.coverImage[0]?.path

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is reqired")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  const coverImage = await uploadOnCloudinary(coverImagePath)

  if(!avatar){
    throw new ApiError(400, "Avatar file is required")
  }
   
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase()
  })


  const createdUser = User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Somethinig went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  )

}) 




export {registerUser}