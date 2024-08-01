import express from "express";
import  {protectRoute}  from "../Middleware/protectRoute.js";
import userController from "../controllers/user_controller.js";
const userRouter=express.Router();

userRouter.get("/profile/:username",protectRoute, userController.getUserProfile)
userRouter.get("/suggested",protectRoute,userController.getSuggestion)
userRouter.post("/follow/:id",protectRoute,userController.followUnfollowUser)
userRouter.post("/update",protectRoute,userController.updateUserProfile)

export default userRouter;