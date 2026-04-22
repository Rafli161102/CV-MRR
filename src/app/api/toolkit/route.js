/**
 * ============================================================================
 * Toolkit API Route
 * ============================================================================
 * Endpoint untuk mengambil dan mengelola data Toolkit dari MongoDB.
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Toolkit from '@/models/Toolkit';

/**
 * GET /api/toolkit
 * Mengambil daftar tools yang aktif dengan filter isPremium
 */
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isPremium = searchParams.get('isPremium');
    const status = searchParams.get('status') || 'live';
    
    // Build query
    const query = { status };
    if (category) query.category = category;
    if (isPremium !== null && isPremium !== '') {
      query.isPremium = isPremium === 'true';
    }
    
    const tools = await Toolkit.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-__v')
      .lean();
    
    return NextResponse.json(
      {
        success: true,
        data: tools,
        count: tools.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Toolkit GET Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch toolkit data',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/toolkit
 * Menambah tool baru (admin only)
 */
export async function POST(request) {
  try {
    const body = await request.json();
    
    await connectDB();
    
    const newTool = new Toolkit(body);
    await newTool.save();
    
    return NextResponse.json(
      {
        success: true,
        data: newTool,
        message: 'Tool created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Toolkit POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create tool',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/toolkit
 * CORS support
 */
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
