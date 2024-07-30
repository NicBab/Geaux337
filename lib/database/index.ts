// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connectToDatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

//   cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//     dbName: 'geaux337app',
//     bufferCommands: false,
//   })

//   cached.conn = await cached.promise;

//   return cached.conn;
// }


// import mongoose from 'mongoose';

// const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// /** 
//  * Global is used here to maintain a cached connection across hot reloads in development.
//  * This prevents connections growing exponentially during API Route usage.
//  */
// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       dbName: 'geaux337app',
//     };

//     cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     console.error('MongoDB connection error:', e);
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

import mongoose from 'mongoose';

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/** 
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: 'geaux337app',
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log('MongoDB connected');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
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
}
