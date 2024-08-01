
import User from "../models/user_model.js";
import notificationModel from "../models/notification_model.js";
const getNotification=async(req,res)=>{
    try {
		const userId = req.user._id;

		const notifications = await notificationModel.find({ to: userId }).populate({
			path: "from",
			select: "username profileImg",
		});

		await notificationModel.updateMany({ to: userId }, { read: true });

		res.status(200).json(notifications);
	} catch (error) {
		console.log("Error in getNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

const deleteNotification=async(req,res)=>{
    try {
		const userId = req.user._id;

		await notificationModel.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

const notificationController={
    getNotification,
    deleteNotification
}



export default notificationController