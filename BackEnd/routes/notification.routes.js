import express from "express"
import { protectRoute } from "../Middleware/protectRoute.js";
import notificationController from "../controllers/notification_controller.js";

const notificationRoutes=express.Router();

notificationRoutes.get("/",protectRoute,notificationController.getNotification)
notificationRoutes.delete("/",protectRoute,notificationController.deleteNotification)

export default notificationRoutes;