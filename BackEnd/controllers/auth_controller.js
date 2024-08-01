import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generater_token.js";

const signup = async (req, res) => {
    try {
        const {
            fullName,
            username,
            email,
            password
        } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                error:"Invalid email format"
            })
        }

        const existingUser=await User.findOne({username});
        if(existingUser){
            return res.status(400).json({
                error:"Username is already taken"
            })
        }

        const existingEmail=await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({
                error:"Email is already taken"
            })
        }

        if(password.length<6){
            res.status(400).json({ error: "Password must be at least 6 character long" });
        }

        // hash password

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName,
            username,
            email,
            password:hashedPassword,
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                email:newUser.email,
                followers: newUser.followers,
				following: newUser.following,
				profileImg: newUser.profileImg,
				coverImg: newUser.coverImg,
            })
        }else{
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (err) {
        console.log("Error in signup controller", err.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

const signin = async (req, res) => {
    try{

        const {username,password}=req.body;
        console.log("__",req.body)
        const user=await User.findOne({username});
        // console.log(user);
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "")
        console.log(isPasswordCorrect);

        if(!user || !isPasswordCorrect){
            return res.status(400).json({
                error:"Invalid username or password"
            })
        } 

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            email:user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        });
    }catch(err){
        console.log("Error in signin controller", err.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

const logout = async (req, res) => {
    try{
res.cookie("jwt","",{maxAge:0})
res.status(200).json({
    message:"Logged Out successfully"
})
    }catch(err){
        console.log("Error in logout controller", err.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

const authChcek = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
        console.log(user);
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const authController = {
    signin,
    signup,
    logout,
    authChcek
}

export default authController;