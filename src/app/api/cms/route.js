/**
 * ============================================================================
 * CMS API Route - God-Mode Visual CMS Backend
 * ============================================================================
 * Endpoint untuk mengambil dan menyimpan data OwnerProfile dan SiteConfig.
 * Diproteksi oleh middleware - hanya admin yang dapat mengakses.
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import OwnerProfile from '@/models/OwnerProfile';
import SiteConfig from '@/models/SiteConfig';

/**
 * GET /api/cms
 * Mengambil data OwnerProfile dan SiteConfig untuk Visual Studio
 */
export async function GET(request) {
  try {
    // Verify admin session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Get query params
    const { searchParams } = new URL(request.url);
    const includeHistory = searchParams.get('history') === 'true';
    const includeArsenal = searchParams.get('arsenal') !== 'false';

    // Fetch OwnerProfile
    let projection = {};
    if (!includeHistory) projection.careerHistory = 0;
    if (!includeArsenal) {
      projection.designArsenal = 0;
      projection.communityArsenal = 0;
    }

    const ownerProfile = await OwnerProfile.findOne(
      { isActive: true },
      projection
    ).lean();

    // Fetch SiteConfig (active config)
    const siteConfig = await SiteConfig.findOne({ isActive: true }).lean();

    // Return data
    return NextResponse.json(
      {
        success: true,
        data: {
          ownerProfile: ownerProfile || null,
          siteConfig: siteConfig || null,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('CMS GET Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms
 * Menyimpan update data OwnerProfile dan SiteConfig
 */
export async function PUT(request) {
  try {
    // Verify admin session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { ownerProfile: ownerData, siteConfig: configData } = body;

    // Connect to database
    await connectDB();

    const results = {
      ownerProfile: null,
      siteConfig: null,
    };

    // Update OwnerProfile
    if (ownerData) {
      let ownerProfile = await OwnerProfile.findOne({ isActive: true });

      if (!ownerProfile) {
        // Create new if not exists
        ownerProfile = new OwnerProfile({
          ...ownerData,
          isActive: true,
        });
      } else {
        // Update existing
        Object.assign(ownerProfile, ownerData);
      }

      await ownerProfile.save();
      results.ownerProfile = {
        id: ownerProfile._id.toString(),
        name: ownerProfile.name,
        updatedAt: ownerProfile.updatedAt,
      };
    }

    // Update SiteConfig
    if (configData) {
      let siteConfig = await SiteConfig.findOne({ isActive: true });

      if (!siteConfig) {
        // Create new if not exists
        siteConfig = new SiteConfig({
          ...configData,
          isActive: true,
        });
      } else {
        // Update existing - increment version
        Object.assign(siteConfig, {
          ...configData,
          version: incrementVersion(siteConfig.version),
        });
      }

      await siteConfig.save();
      results.siteConfig = {
        id: siteConfig._id.toString(),
        version: siteConfig.version,
        updatedAt: siteConfig.updatedAt,
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: 'CMS data deployed successfully',
        data: results,
        deployedBy: session.user.name,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('CMS PUT Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function untuk increment version string (1.0.0 -> 1.0.1)
 */
function incrementVersion(version = '1.0.0') {
  const parts = version.split('.').map(Number);
  parts[2]++; // Increment patch version
  if (parts[2] > 99) {
    parts[2] = 0;
    parts[1]++;
  }
  if (parts[1] > 99) {
    parts[1] = 0;
    parts[0]++;
  }
  return parts.join('.');
}

/**
 * OPTIONS /api/cms
 * CORS support
 */
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
