/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ============================================
      // ENDFIELD BRUTALIST COLOR PALETTE
      // ============================================
      colors: {
        // Core Backgrounds
        endfieldBg: '#050505',
        endfieldSurface: '#0a0a0a',
        endfieldPanel: '#121212',
        endfieldElevated: '#1a1a1a',
        endfieldOverlay: 'rgba(5, 5, 5, 0.95)',
        
        // Accent Colors (Endfield Yellow - Gryphline Style)
        endfieldAccent: '#fffa00',
        endfieldAccentHover: '#fff500',
        endfieldAccentGlow: 'rgba(255, 250, 0, 0.4)',
        
        // Secondary Accents (Endfield Style)
        endfieldPink: '#ff1aac',
        endfieldTeal: '#00ffa2',
        endfieldPinkGlow: 'rgba(255, 26, 172, 0.4)',
        endfieldTealGlow: 'rgba(0, 255, 162, 0.4)',
        
        // Text Colors (Endfield Light Theme)
        endfieldText: '#ffffff',
        endfieldTextMuted: '#888888',
        endfieldTextDark: '#6e6e6e',
        endfieldTextLight: '#f0f0f0',
        
        // Border & HUD Colors
        endfieldBorder: '#2a2a2a',
        endfieldBorderActive: '#3a3a3a',
        endfieldHudLine: 'rgba(255, 250, 0, 0.3)',
        
        // Status Colors
        endfieldSuccess: '#22c55e',
        endfieldWarning: '#f59e0b',
        endfieldError: '#ef4444',
        endfieldInfo: '#3b82f6',
      },
      
      // ============================================
      // TYPOGRAPHY - Geometric & Monospace
      // ============================================
      fontFamily: {
        // Primary: Geometric Sans-serif
        sans: ['Space Grotesk', 'Orbitron', 'Inter', 'system-ui', 'sans-serif'],
        // Display: Futuristic/Tech
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
        // Monospace: Code/Terminal style
        mono: ['JetBrains Mono', 'Chivo Mono', 'Fira Code', 'monospace'],
        // HUD: All caps technical
        hud: ['Chivo Mono', 'JetBrains Mono', 'monospace'],
      },
      
      // ============================================
      // SPACING & SIZING (Technical Grid)
      // ============================================
      spacing: {
        'panel': '1.5rem',
        'panel-sm': '1rem',
        'panel-lg': '2rem',
        'hud': '0.5rem',
      },
      
      // ============================================
      // BORDER RADIUS (Sharp/Technical)
      // ============================================
      borderRadius: {
        'none': '0',
        'sharp': '0',
        'bevel': '2px',
        'panel': '0',
        'hud': '0',
      },
      
      // ============================================
      // BOX SHADOW (Flat/HUD Style)
      // ============================================
      boxShadow: {
        'none': 'none',
        'hud': '0 0 0 1px rgba(255, 250, 0, 0.3)',
        'hud-hover': '0 0 0 1px rgba(255, 250, 0, 0.6), 0 0 20px rgba(255, 250, 0, 0.2)',
        'panel': '0 0 0 1px #2a2a2a',
        'panel-active': '0 0 0 1px #3a3a3a, inset 0 0 20px rgba(255, 250, 0, 0.05)',
        'glow': '0 0 30px rgba(255, 250, 0, 0.3)',
        'glow-sm': '0 0 10px rgba(255, 250, 0, 0.3)',
        'glow-pink': '0 0 30px rgba(255, 26, 172, 0.3)',
        'glow-teal': '0 0 30px rgba(0, 255, 162, 0.3)',
      },
      
      // ============================================
      // ANIMATIONS
      // ============================================
      animation: {
        'glitch': 'glitch 0.3s ease-in-out',
        'glitch-slow': 'glitch 0.5s ease-in-out',
        'scan': 'scan 4s linear infinite',
        'pulse-hud': 'pulseHud 2s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
        'typing': 'typing 0.8s steps(20) forwards',
      },
      
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseHud: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '52%': { opacity: '0.4' },
          '54%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
