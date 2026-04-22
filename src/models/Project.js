/**
 * ============================================================================
 * Project Model (Portfolio)
 * ============================================================================
 * Menyimpan data portofolio dengan konten blok dari Visual CMS.
 * Mendukung kategori untuk memisahkan karya desain dan community development.
 * ============================================================================
 */

import mongoose from 'mongoose';

// Schema untuk blok konten dinamis (Visual CMS)
const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'heading', 'image', 'video', 'gallery', 'quote', 'embed', 'divider', 'list', 'stats']
  },
  id: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  styles: {
    type: Map,
    of: String,
    default: {}
  },
  order: {
    type: Number,
    required: true
  }
}, { _id: false });

// Schema untuk statistik proyek
const ProjectStatsSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  }
}, { _id: true });

// Schema untuk metadata client/collaborator
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: null
  },
  website: {
    type: String,
    default: null
  },
  industry: {
    type: String,
    default: null
  }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  
  subtitle: {
    type: String,
    trim: true,
    maxlength: [300, 'Subtitle cannot be more than 300 characters']
  },
  
  // Kategori untuk memisahkan karya desain dan community development
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Visual Identity', 'UI/UX Design', 'Community Strategy', 'Event Architecture'],
      message: 'Category must be Visual Identity, UI/UX Design, Community Strategy, or Event Architecture'
    },
    index: true
  },
  
  // Tags untuk filtering tambahan
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Thumbnail untuk preview
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail is required'],
    trim: true
  },
  
  // Cover image untuk header detail
  coverImage: {
    type: String,
    trim: true
  },
  
  // Konten dinamis dari Visual CMS
  content: [ContentBlockSchema],
  
  // Statistik proyek
  stats: [ProjectStatsSchema],
  
  // Informasi client
  client: ClientSchema,
  
  // Timeline proyek
  timeline: {
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    duration: {
      type: String,
      trim: true
    }
  },
  
  // Status publikasi
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
    index: true
  },
  
  // Urutan tampilan (untuk sorting manual)
  displayOrder: {
    type: Number,
    default: 0,
    index: true
  },
  
  // Metadata SEO
  meta: {
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  
  // Featured project flag
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'projects'
});

// Compound index untuk query yang sering digunakan
ProjectSchema.index({ status: 1, category: 1, displayOrder: 1 });
ProjectSchema.index({ status: 1, isFeatured: 1, createdAt: -1 });
ProjectSchema.index({ tags: 1 });

// Virtual untuk URL lengkap
ProjectSchema.virtual('url').get(function() {
  return `/projects/${this.slug}`;
});

// Virtual untuk durasi formatted
ProjectSchema.virtual('formattedDuration').get(function() {
  if (this.timeline.duration) {
    return this.timeline.duration;
  }
  if (this.timeline.startDate && this.timeline.endDate) {
    const diff = this.timeline.endDate.getTime() - this.timeline.startDate.getTime();
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    return months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '< 1 month';
  }
  return null;
});

// Pre-save middleware untuk generate slug jika belum ada
ProjectSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
