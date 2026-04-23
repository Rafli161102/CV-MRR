/**
 * DEPRECATED: This route is no longer used.
 * Authentication now handled by NextAuth.js at /api/auth/[...nextauth]
 * 
 * Kept for backward compatibility - returns redirect info.
 */

export async function POST() {
  return Response.json(
    { 
      error: 'Deprecated: Use /api/auth/callback/credentials instead',
      redirect: '/api/auth/signin',
      message: 'Authentication migrated to NextAuth.js with MongoDB'
    },
    { status: 410 } // Gone
  );
}
