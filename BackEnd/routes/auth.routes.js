import express from "express";
import authController from "../controllers/auth_controller.js";
import { protectRoute}  from "../Middleware/protectRoute.js";


const authRouter=express.Router();

authRouter.post("/signup",authController.signup)

authRouter.post("/login",authController.signin)

authRouter.post("/logout",authController.logout)

authRouter.get("/authCheck",protectRoute,authController.authChcek)

export default authRouter