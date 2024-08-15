import mongoose from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
let cached: any = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "geaux337app",
    };

    cached.promise =
      cached.promise ||
      mongoose
        .connect(MONGODB_URI as string, opts)
        .then((mongoose) => {
          console.log("MongoDB connected");
          return mongoose;
        })
        .catch((error) => {
          console.error("MongoDB connection error:", error);
          throw error;
        });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

//****
//**IF DATABASE ISSUES OCCUR PUT THIS SCRIPT IN API/TEST-CONNECTION/ROUTE.TS
//http://localhost:3000/api/test-connection
//node test-mongodb-connection.js

// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';

// const MONGODB_URI: string = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// export async function GET() {
//   try {
//     console.log('Attempting to connect to MongoDB');
//     await mongoose.connect(MONGODB_URI, { dbName: 'geaux337app' });
//     console.log('MongoDB connected successfully');
//     return NextResponse.json({ message: 'Database connection successful' });
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     return NextResponse.json({ message: 'Database connection failed', error }, { status: 500 });
//   }
// }
