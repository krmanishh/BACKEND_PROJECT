import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asynchandler(async(req, res, next) => 
  {
  try 
  {
  
const authHeader = req.header("Authorization");

const token = req.cookies?.accessToken || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    if(!token){
      throw new ApiError(401, "Unauthorized request") 
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
    if(!user){
      throw new ApiError(401, "Invalid Access Token");
    }
  
    req.user = user;
    next()
} catch (error) {
 throw new ApiError(401, error?.message || "Ivalid access token") 
}
})