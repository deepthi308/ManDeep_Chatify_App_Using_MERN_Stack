import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(ENV.MONGO_URI);
    console.log(
      `Server is connected to MongoDB sucessfully: ${connection.connection.host}`
    );
  } catch (error) {
    console.log(`Error while connecting to MongoDB: ${error}`);
    process.exit(1); // 1 status code means fail, 0 means success
  }
};
