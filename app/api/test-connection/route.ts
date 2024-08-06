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