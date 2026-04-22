/**
 * ============================================================================
 * OwnerProfile Model
 * ============================================================================
 * Dokumen tunggal untuk identitas owner (Muhammad Rafli Ramadhan).
 * Menyimpan data profil, career history, dan skill arsenal.
 * ============================================================================
 */

import mongoose from 'mongoose';

const CareerHistorySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    default: null
  },
  description: {
    type: String,
    trim: true
  },
  isCurrent: {
    type: Boolean,
    default: false
  }
}, { _id: true });

const OwnerProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  
  dualTitle: {
    type: String,
    required: true,
    default: 'Graphic Designer & Community Development',
    trim: true
  },
  
  tagline: {
    type: String,
    trim: true,
    maxlength: [200, 'Tagline cannot be more than 200 characters']
  },
  
  bio: {
    type: String,
    trim: true,
    maxlength: [2000, 'Bio cannot be more than 2000 characters']
  },
  
  avatar: {
    type: String,
    trim: true
  },
  
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  
  phone: {
    type: String,
    trim: true
  },
  
  location: {
    type: String,
    trim: true
  },
  
  // Career history sebagai array of subdocuments
  careerHistory: [CareerHistorySchema],
  
  // Design skills/arsenal sebagai array of strings
  designArsenal: [{
    type: String,
    trim: true
  }],
  
  // Community development skills sebagai array of strings
  communityArsenal: [{
    type: String,
    trim: true
  }],
  
  // Social links
  socialLinks: {
    instagram: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    dribbble: { type: String, trim: true },
    behance: { type: String, trim: true },
    github: { type: String, trim: true }
  },
  
  // Metadata untuk CMS versioning
  version: {
    type: String,
    default: '1.0.0'
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'owner_profiles'
});

// Ensure only one active profile exists
OwnerProfileSchema.pre('save', async function(next) {
  if (this.isActive) {
    await this.constructor.updateMany(
      { _id: { $ne: this._id } },
      { isActive: false }
    );
  }
  next();
});

// Virtual for full career duration calculation
OwnerProfileSchema.virtual('totalExperience').get(function() {
  return this.careerHistory.reduce((total, job) => {
    const end = job.endDate || new Date();
    const duration = end.getTime() - job.startDate.getTime();
    return total + duration;
  }, 0);
});

// Index untuk query optimization
OwnerProfileSchema.index({ isActive: 1 });
OwnerProfileSchema.index({ createdAt: -1 });

// Check if model exists to prevent overwrite in Next.js hot reload
const OwnerProfile = mongoose.models.OwnerProfile || mongoose.model('OwnerProfile', OwnerProfileSchema);

export default OwnerProfile;
