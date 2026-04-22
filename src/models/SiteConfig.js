/**
 * ============================================================================
 * SiteConfig Model (God-Mode Visual CMS)
 * ============================================================================
 * Penyimpanan konfigurasi website dengan struktur God-Mode CMS.
 * Menyimpan theme variables, layout structure, dan konten editable.
 * ============================================================================
 */

import mongoose from 'mongoose';

// Schema untuk section dalam layout
const LayoutSectionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'hero', 
      'about', 
      'projects', 
      'toolkit', 
      'testimonials', 
      'stats', 
      'contact', 
      'footer',
      'custom'
    ]
  },
  label: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    required: true
  },
  // Konfigurasi section spesifik
  config: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  // Style overrides untuk section ini
  styles: {
    type: Map,
    of: String,
    default: {}
  }
}, { _id: false });

// Schema untuk theme variables
const ThemeVarsSchema = new mongoose.Schema({
  // Endfield Background Colors (Sci-Fi Brutalist)
  endfieldBg: {
    type: String,
    default: '#030712'
  },
  endfieldSurface: {
    type: String,
    default: '#0A1329'
  },
  endfieldElevated: {
    type: String,
    default: '#111827'
  },
  
  // Accent Colors
  accentPrimary: {
    type: String,
    default: '#06b6d4'
  },
  accentSecondary: {
    type: String,
    default: '#67e8f9'
  },
  accentTertiary: {
    type: String,
    default: '#3b82f6'
  },
  accentEnd: {
    type: String,
    default: '#4f46e5'
  },
  
  // Text Colors
  textPrimary: {
    type: String,
    default: '#ffffff'
  },
  textSecondary: {
    type: String,
    default: '#cbd5e1'
  },
  textMuted: {
    type: String,
    default: '#94a3b8'
  },
  
  // Border & Shadow
  borderColor: {
    type: String,
    default: 'rgba(255,255,255,0.08)'
  },
  glowColor: {
    type: String,
    default: 'rgba(6,182,212,0.3)'
  },
  
  // WhatsApp Brand Color
  whatsappColor: {
    type: String,
    default: '#25D366'
  }
}, { _id: false });

// Schema untuk typography settings
const TypographySchema = new mongoose.Schema({
  headingFont: {
    type: String,
    default: 'Inter'
  },
  bodyFont: {
    type: String,
    default: 'Inter'
  },
  monoFont: {
    type: String,
    default: 'JetBrains Mono'
  },
  baseSize: {
    type: String,
    default: '16px'
  },
  scale: {
    type: String,
    default: '1.25'
  }
}, { _id: false });

// Schema untuk global animations
const AnimationSettingsSchema = new mongoose.Schema({
  enableParallax: {
    type: Boolean,
    default: true
  },
  enableMouseTilt: {
    type: Boolean,
    default: true
  },
  scrollReveal: {
    type: Boolean,
    default: true
  },
  pageTransition: {
    type: String,
    enum: ['fade', 'slide', 'scale', 'none'],
    default: 'fade'
  }
}, { _id: false });

const SiteConfigSchema = new mongoose.Schema({
  // Versioning untuk CMS
  version: {
    type: String,
    required: true,
    default: '1.0.0'
  },
  
  // Site Identity
  siteName: {
    type: String,
    default: 'MRR | Muhammad Rafli Ramadhan'
  },
  siteDescription: {
    type: String,
    default: 'Graphic Designer & Community Development'
  },
  favicon: {
    type: String,
    default: '/favicon.ico'
  },
  
  // Theme Variables (God-Mode CMS Core)
  themeVars: {
    type: ThemeVarsSchema,
    default: () => ({})
  },
  
  // Typography Settings
  typography: {
    type: TypographySchema,
    default: () => ({})
  },
  
  // Layout Structure (Urutan section yang aktif)
  layoutStructure: [LayoutSectionSchema],
  
  // Global Animations
  animations: {
    type: AnimationSettingsSchema,
    default: () => ({})
  },
  
  // Global SEO Settings
  seo: {
    defaultTitle: {
      type: String,
      default: 'MRR | Graphic Designer & Community Development'
    },
    defaultDescription: {
      type: String,
      default: 'Portofolio profesional Muhammad Rafli Ramadhan - Spesialis Brand Identity, Packaging, dan Community Development'
    },
    defaultImage: {
      type: String,
      default: '/og-image.jpg'
    },
    twitterHandle: {
      type: String,
      default: '@rafli161102'
    }
  },
  
  // Analytics Integration
  analytics: {
    googleAnalyticsId: {
      type: String,
      default: null
    },
    gtmId: {
      type: String,
      default: null
    },
    fbPixelId: {
      type: String,
      default: null
    }
  },
  
  // Maintenance Mode
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maintenanceMessage: {
    type: String,
    default: 'Site is under maintenance. Please check back soon.'
  },
  
  // CMS Lock (prevent concurrent editing)
  isLocked: {
    type: Boolean,
    default: false
  },
  lockedBy: {
    type: String,
    default: null
  },
  lockedAt: {
    type: Date,
    default: null
  },
  
  // Active config flag (ensure only one active config)
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true,
  collection: 'site_configs'
});

// Index untuk query optimization
SiteConfigSchema.index({ isActive: 1, version: -1 });

// Pre-save middleware untuk ensure single active config
SiteConfigSchema.pre('save', async function(next) {
  if (this.isActive) {
    await this.constructor.updateMany(
      { _id: { $ne: this._id } },
      { isActive: false }
    );
  }
  next();
});

// Static method untuk get active config
SiteConfigSchema.statics.getActive = async function() {
  let config = await this.findOne({ isActive: true });
  if (!config) {
    // Create default config if none exists
    config = await this.create({});
  }
  return config;
};

const SiteConfig = mongoose.models.SiteConfig || mongoose.model('SiteConfig', SiteConfigSchema);

export default SiteConfig;
