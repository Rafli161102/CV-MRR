/**
 * ============================================================================
 * Next.js Middleware - Admin Route Protection
 * ============================================================================
 * Melindungi seluruh rute /admin dengan memeriksa session NextAuth.
 * Redirect ke / jika tidak ada session atau bukan admin.
 * ============================================================================
 */

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user has admin role
    const token = req.nextauth.token;
    
    if (!token || token.role !== 'admin') {
      // Redirect non-admin users to homepage
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    // Allow access for admin
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Require token for all /admin routes
        if (!token) {
          return false;
        }
        // Must have admin role
        return token.role === 'admin';
      },
    },
    pages: {
      signIn: '/',
      error: '/',
    },
  }
);

// Match all admin routes
export const config = {
  matcher: ['/admin/:path*', '/api/cms/:path*'],
};
