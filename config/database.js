import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connections = await mongoose.connect("mongodb+srv://mdshoaib0:Kabooter123%40@mdshoaib.991gs6w.mongodb.net/Task-Manager")
        console.log("✅ MongoDB Connected Successfully!");
        return connections;
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
        process.exit(1);
    }
}

export default connectDB;