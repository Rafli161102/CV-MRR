/**
 * ============================================================================
 * Toolkit Model (Freemium Tools Data)
 * ============================================================================
 * Menyimpan data tools untuk sistem Freemium Toolkit.
 * Mendukung penanda paywall untuk sistem monetisasi.
 * ============================================================================
 */

import mongoose from 'mongoose';

// Schema untuk fitur tool
const ToolFeatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  isPremium: {
    type: Boolean,
    default: false
  }
}, { _id: true });

// Schema untuk limitasi penggunaan (freemium)
const UsageLimitSchema = new mongoose.Schema({
  free: {
    type: Number,
    default: null // null means unlimited
  },
  premium: {
    type: Number,
    default: null
  },
  period: {
    type: String,
    enum: ['day', 'week', 'month', 'year', 'lifetime'],
    default: 'month'
  }
}, { _id: false });

// Schema untuk pricing tier
const PricingSchema = new mongoose.Schema({
  free: {
    enabled: {
      type: Boolean,
      default: true
    },
    features: [String],
    limitations: [String]
  },
  premium: {
    enabled: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'IDR'
    },
    billingPeriod: {
      type: String,
      enum: ['monthly', 'yearly', 'lifetime'],
      default: 'monthly'
    },
    features: [String],
    stripePriceId: {
      type: String,
      default: null
    }
  }
}, { _id: false });

const ToolkitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tool title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [150, 'Short description cannot be more than 150 characters']
  },
  
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  
  // Kategori tool
  category: {
    type: String,
    required: true,
    enum: [
      'Design Utility',
      'Business Tool',
      'Productivity',
      'Converter',
      'Generator',
      'Analyzer'
    ],
    index: true
  },
  
  // Tags untuk filtering
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Icon dan branding
  icon: {
    type: String,
    default: null
  },
  
  coverImage: {
    type: String,
    default: null
  },
  
  screenshots: [{
    type: String
  }],
  
  // Fitur-fitur tool
  features: [ToolFeatureSchema],
  
  // Freemium/Premium penanda
  isPremium: {
    type: Boolean,
    default: false,
    index: true
  },
  
  // Paywall settings
  pricing: {
    type: PricingSchema,
    default: () => ({})
  },
  
  // Usage limits
  usageLimit: {
    type: UsageLimitSchema,
    default: () => ({})
  },
  
  // URL dan routing
  route: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  externalUrl: {
    type: String,
    default: null
  },
  
  isExternal: {
    type: Boolean,
    default: false
  },
  
  // Status
  status: {
    type: String,
    enum: ['development', 'beta', 'live', 'deprecated'],
    default: 'development',
    index: true
  },
  
  // Analytics
  usageStats: {
    totalUses: {
      type: Number,
      default: 0
    },
    uniqueUsers: {
      type: Number,
      default: 0
    },
    lastUsed: {
      type: Date,
      default: null
    }
  },
  
  // SEO
  meta: {
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  },
  
  // Tampilan order
  displayOrder: {
    type: Number,
    default: 0,
    index: true
  },
  
  // Featured flag
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  
  // Changelog
  changelog: [{
    version: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    changes: [{
      type: {
        type: String,
        enum: ['added', 'fixed', 'improved', 'removed']
      },
      description: String
    }]
  }]
}, {
  timestamps: true,
  collection: 'toolkits'
});

// Compound indexes untuk query yang sering digunakan
ToolkitSchema.index({ status: 1, isPremium: 1, displayOrder: 1 });
ToolkitSchema.index({ status: 1, category: 1, isFeatured: 1 });
ToolkitSchema.index({ tags: 1 });

// Virtual untuk status freemium
ToolkitSchema.virtual('freemiumStatus').get(function() {
  if (!this.isPremium) return 'free';
  if (this.pricing?.free?.enabled) return 'freemium';
  return 'premium';
});

// Virtual untuk formatted price
ToolkitSchema.virtual('formattedPrice').get(function() {
  if (!this.isPremium || !this.pricing?.premium?.enabled) return 'Free';
  const { price, currency, billingPeriod } = this.pricing.premium;
  const periodLabel = billingPeriod === 'monthly' ? '/mo' : billingPeriod === 'yearly' ? '/yr' : '';
  return `${currency} ${price.toLocaleString()}${periodLabel}`;
});

// Pre-save middleware untuk generate slug
ToolkitSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

// Static method untuk increment usage
ToolkitSchema.statics.incrementUsage = async function(toolId) {
  return this.findByIdAndUpdate(
    toolId,
    {
      $inc: { 'usageStats.totalUses': 1 },
      $set: { 'usageStats.lastUsed': new Date() }
    },
    { new: true }
  );
};

const Toolkit = mongoose.models.Toolkit || mongoose.model('Toolkit', ToolkitSchema);

export default Toolkit;
