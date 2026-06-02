import mongoose from "mongoose";
/**
 * MongoDB database configuration for octofit_db
 * Connects to the local MongoDB instance using Mongoose ORM
 */
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/octofit_db";
export const connectDatabase = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("✅ Successfully connected to MongoDB at octofit_db");
        return mongoose.connection;
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
};
export const disconnectDatabase = async () => {
    try {
        await mongoose.disconnect();
        console.log("✅ Disconnected from MongoDB");
    }
    catch (error) {
        console.error("❌ MongoDB disconnection error:", error);
        throw error;
    }
};
export default mongoose;
