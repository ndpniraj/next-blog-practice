import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

async function dbConnect() {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    return connection;
  } catch (error) {
    throw new Error("Mongo Connection Failed");
  }
}

export default dbConnect;
