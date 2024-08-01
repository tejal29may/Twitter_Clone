import express from "express";
import { protectRoute } from "../Middleware/protectRoute.js";
import postController from "../controllers/post_controller.js";

const postRouter=express.Router();

postRouter.post("/create",protectRoute,postController.createPost);
postRouter.post("/like/:id",protectRoute,postController.likePost)
postRouter.post("/comment/:id",protectRoute,postController.commentOnPost)
postRouter.delete("/:id",protectRoute,postController.deletePost)
postRouter.get("/allPosts",protectRoute,postController.getAllPosts)
postRouter.get("/likedPosts/:id",protectRoute,postController.getLikedPosts)
postRouter.get("/followingPosts",protectRoute,postController.getFollowingPosts)
postRouter.get("/getUsersPosts/:username",protectRoute,postController.getUsersPosts)

export default postRouter;
