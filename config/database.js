import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connections = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("✅ MongoDB Connected Successfully!");
        return connections;
    } catch (error) {
        console.log("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
}

export default connectDB;