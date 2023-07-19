// For database connections

import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  // Set mongoose options. This set prevents console warnings
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('Database connection established');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('Database connection established successfully');
  } catch (error) {
    console.log(error);
  }
}