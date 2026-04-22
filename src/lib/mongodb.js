/**
 * ============================================================================
 * MongoDB Connection with Caching
 * ============================================================================
 * Menggunakan teknik connection caching untuk menghindari multiple connections
 * saat Next.js melakukan hot-reload di development mode.
 * 
 * Connection disimpan di global.mongoose untuk persistency.
 * ============================================================================
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Check if MONGODB_URI is defined
  if (!MONGODB_URI) {
    // During build time, return a mock connection to allow static generation
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      console.warn('MongoDB URI not set - using mock connection for build');
      return null;
    }
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if none exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
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

export default connectDB;
