import mongoose from "mongoose";


const postSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    text:{
        type:String,
    },
    img:{
        type:String,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    comments:[{
        text:{
            type:String,
            required:true,
        },
        user:{
            type:String,
            ref:'User',
            required:true,
        }
    }]


},{timestamps:true})


const postModel=mongoose.model("post",postSchema)
export default postModel