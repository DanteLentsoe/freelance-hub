import { Mongoose } from "mongoose";

const mongoose: Mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${connection}`);
  } catch (error) {
    console.log("Error, ", error);
  }
};
