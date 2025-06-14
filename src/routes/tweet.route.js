import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";
import { Tweet } from "../models/tweet.model.js";
const router = Router()

router.route("/create-tweet").post(verifyJWT, createTweet)
router.route("/get-user-tweets").get(verifyJWT, getUserTweets)
router.route("/update-tweet/:tweetId").patch(verifyJWT, updateTweet)
router.route("/delete-tweet/:tweetId").delete(verifyJWT, deleteTweet)

export default router;