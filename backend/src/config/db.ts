import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    //const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-db');
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
