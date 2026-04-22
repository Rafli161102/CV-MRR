/**
 * ============================================================================
 * Owner API Endpoint
 * ============================================================================
 * Endpoint GET sederhana untuk mengambil data OwnerProfile.
 * Dapat di-extend untuk mendukung UPDATE (PUT) di masa depan.
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import OwnerProfile from '@/models/OwnerProfile';

/**
 * GET /api/owner
 * Mengambil data profil owner yang aktif
 */
export async function GET(request) {
  try {
    // Koneksi ke database
    const connection = await connectDB();
    
    // Jika build time (null connection), return mock data
    if (!connection) {
      return NextResponse.json(
        {
          success: true,
          data: {
            name: 'Muhammad Rafli Ramadhan',
            dualTitle: 'Graphic Designer & Community Development',
            tagline: 'Building brands and communities through strategic design',
            bio: 'A passionate graphic designer and community developer with expertise in brand identity, visual systems, and community engagement strategies.',
            avatar: null,
            email: 'contact@mrr.my.id',
            location: 'Indonesia',
            designArsenal: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'After Effects'],
            communityArsenal: ['Strategic Planning', 'Event Management', 'Community Engagement'],
            careerHistory: [],
            socialLinks: {}
          },
          _note: 'Using mock data - database not configured'
        },
        { status: 200 }
      );
    }

    // Ambil query parameters untuk filtering tambahan jika diperlukan
    const { searchParams } = new URL(request.url);
    const includeHistory = searchParams.get('history') === 'true';
    const includeArsenal = searchParams.get('arsenal') !== 'false'; // default true

    // Build projection berdasarkan query params
    let projection = {};
    if (!includeHistory) {
      projection.careerHistory = 0;
    }
    if (!includeArsenal) {
      projection.designArsenal = 0;
      projection.communityArsenal = 0;
    }

    // Cari profile yang aktif (atau yang pertama jika tidak ada flag isActive)
    const profile = await OwnerProfile.findOne(
      { isActive: true },
      projection
    ).lean();

    // Jika tidak ada profile, return error 404
    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          error: 'Owner profile not found',
          message: 'No active owner profile exists in the database'
        },
        { status: 404 }
      );
    }

    // Format response
    const response = {
      success: true,
      data: {
        id: profile._id.toString(),
        name: profile.name,
        dualTitle: profile.dualTitle,
        tagline: profile.tagline || null,
        bio: profile.bio || null,
        avatar: profile.avatar || null,
        email: profile.email || null,
        phone: profile.phone || null,
        location: profile.location || null,
        ...(includeHistory && {
          careerHistory: profile.careerHistory?.map(job => ({
            id: job._id.toString(),
            company: job.company,
            role: job.role,
            startDate: job.startDate,
            endDate: job.endDate,
            isCurrent: job.isCurrent,
            description: job.description
          })) || []
        }),
        ...(includeArsenal && {
          designArsenal: profile.designArsenal || [],
          communityArsenal: profile.communityArsenal || []
        }),
        socialLinks: profile.socialLinks || {},
        version: profile.version,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt
      }
    };

    // Return successful response
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });

  } catch (error) {
    console.error('Error fetching owner profile:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && {
          stack: error.stack
        })
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/owner
 * Update data owner profile (untuk CMS di masa depan)
 * Requires authentication
 */
export async function PUT(request) {
  try {
 // TODO: Implement authentication check using NextAuth session
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json(
    //     { success: false, error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    await connectDB();

    const body = await request.json();

    // Validasi minimal
    if (!body.name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          message: 'Name is required'
        },
        { status: 400 }
      );
    }

    // Cari atau buat profile
    let profile = await OwnerProfile.findOne({ isActive: true });
    
    if (!profile) {
      // Buat profile baru jika belum ada
      profile = new OwnerProfile({
        ...body,
        isActive: true
      });
    } else {
      // Update profile yang ada
      Object.assign(profile, body);
    }

    await profile.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          id: profile._id.toString(),
          name: profile.name,
          updatedAt: profile.updatedAt
        },
        message: 'Profile updated successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating owner profile:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/owner
 * Untuk CORS preflight requests
 */
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
