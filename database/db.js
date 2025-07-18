import mongoose from "mongoose";


const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("( O ) Database Connected Successfully");
  } catch (error) {
    console.error(" ( X )Error connecting to database:", error);
  }
};

export default dbConnect;