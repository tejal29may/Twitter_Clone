import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import connectMongoDb from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

console.log('Cloudinary Config:', process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);

const app = express();
const __dirname=path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/notification", notificationRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/FrontEnd/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"FrontEnd","dist","index.html"));
        
    })
}

app.listen(8080, () => {
    console.log("Server is running on port 8080");
    connectMongoDb();
});
