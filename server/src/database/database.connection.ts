import mongoose from "mongoose";
import "dotenv/config";

const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.r047aq3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_CLUSTER}`;

const connectMongoose = async (): Promise<void> => {
  try {
    await mongoose.connect(url);
    console.log(" Database connection established successfully.");
  } catch (error) {
    console.error(" Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default connectMongoose;
