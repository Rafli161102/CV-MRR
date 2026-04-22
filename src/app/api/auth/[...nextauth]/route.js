/**
 * ============================================================================
 * NextAuth Configuration
 * ============================================================================
 * Setup autentikasi menggunakan Credentials Provider.
 * Hanya mengizinkan login dengan ADMIN_USER dan ADMIN_PASSWORD dari env.
 * Session role di-set sebagai 'admin' untuk kontrol akses CMS.
 * ============================================================================
 */

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Environment variables untuk admin credentials
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Validasi environment variables (hanya log warning jika di runtime, bukan build)
if (!ADMIN_USER || !ADMIN_PASSWORD) {
  // Skip warning during build
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    console.warn(
      'Warning: ADMIN_USER and ADMIN_PASSWORD environment variables are not set. ' +
      'Authentication will not work properly.'
    );
  }
}

// Export konfigurasi untuk digunakan di API lain (seperti /api/cms)
export const authOptions = {
  // Konfigurasi session menggunakan JWT
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Credentials Provider only (tidak ada Google Provider)
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      
      // Konfigurasi field yang ditampilkan di form login
      credentials: {
        username: { 
          label: 'Username', 
          type: 'text', 
          placeholder: 'Enter admin username' 
        },
        password: { 
          label: 'Password', 
          type: 'password', 
          placeholder: 'Enter admin password' 
        }
      },

      /**
       * Authorize function - validasi credentials
       * @param {Object} credentials - username dan password dari form
       * @returns {Object|null} User object jika valid, null jika invalid
       */
      async authorize(credentials) {
        // Validasi input
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }

        const { username, password } = credentials;

        // Validasi environment variables
        if (!ADMIN_USER || !ADMIN_PASSWORD) {
          console.error('Admin credentials not configured in environment');
          throw new Error('Authentication system not properly configured');
        }

        // Cek username (case-sensitive)
        if (username !== ADMIN_USER) {
          console.warn(`Failed login attempt for username: ${username}`);
          throw new Error('Invalid username or password');
        }

        // Verifikasi password menggunakan bcrypt
        const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD);

        if (!isValidPassword) {
          // Fallback: compare plain text jika ADMIN_PASSWORD belum di-hash
          // Ini untuk development/demo purposes
          if (password === ADMIN_PASSWORD) {
            console.warn('Using plain text password comparison - please hash your ADMIN_PASSWORD');
          } else {
            console.warn(`Failed login attempt for user: ${username}`);
            throw new Error('Invalid username or password');
          }
        }

        // Login berhasil - return user object
        // Role di-set sebagai 'admin' untuk kontrol akses
        return {
          id: 'admin',
          name: ADMIN_USER,
          email: `${ADMIN_USER}@mrr.local`,
          role: 'admin',
          image: null
        };
      }
    })
  ],

  // Callbacks untuk session dan JWT
  callbacks: {
    /**
     * JWT Callback - dipanggil saat JWT dibuat atau diupdate
     * Menambahkan role ke dalam token
     */
    async jwt({ token, user }) {
      // Saat pertama kali login, user object tersedia
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },

    /**
     * Session Callback - dipanggil saat session di-check
     * Menambahkan role ke dalam session object
     */
    async session({ session, token }) {
      // Tambahkan data dari token ke session
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    }
  },

  // Pages configuration
  pages: {
    signIn: '/admin/login',
    signOut: '/admin',
    error: '/admin/login', // Error code passed in query string as ?error=
    newUser: '/admin' // New users will be directed here on first sign in
  },

  // Debug mode (hanya di development)
  debug: process.env.NODE_ENV === 'development',

  // Events logging
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`Admin signed in: ${user.name} at ${new Date().toISOString()}`);
    },
    async signOut({ token }) {
      console.log(`Admin signed out: ${token.name} at ${new Date().toISOString()}`);
    },
    async createUser({ user }) {
      console.log(`New user created: ${user.name}`);
    }
  },

  // Security
  secret: process.env.NEXTAUTH_SECRET,
  
  // Use secure cookies in production
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? `__Secure-next-auth.session-token` 
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
