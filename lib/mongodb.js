import mongoose from "mongoose";
export const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected database.......");
  } catch (error) {
    console.log("connect database failed");
  }
};
