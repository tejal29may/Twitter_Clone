import mongoose from "mongoose";

const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo Connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connection to mongoDB: ${error.message}`);
        process.exit(1);
    }
}


export default connectMongoDb;