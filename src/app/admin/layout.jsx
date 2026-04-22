/**
 * ============================================================================
 * Admin Layout with NextAuth SessionProvider
 * ============================================================================
 * Layout wrapper untuk seluruh area admin dengan autentikasi.
 * ============================================================================
 */

'use client';

import { SessionProvider } from 'next-auth/react';

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
