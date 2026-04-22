/**
 * ============================================================================
 * Database Seeding API
 * ============================================================================
 * Endpoint untuk mengisi database dengan data awal/mock.
 * Hanya untuk development/setup.
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import OwnerProfile from '@/models/OwnerProfile';
import SiteConfig from '@/models/SiteConfig';
import Toolkit from '@/models/Toolkit';
import bcrypt from 'bcryptjs';

// Mock data for seeding
const SEED_DATA = {
  ownerProfile: {
    name: 'Muhammad Rafli Ramadhan',
    dualTitle: 'Graphic Designer & Community Development',
    tagline: 'Building brands and communities through strategic design',
    bio: `Specialized in Brand Identity Systems and Community Development Architecture. Operating at the intersection of visual precision and strategic engagement.

Current deployment: Building end-to-end identity systems for regional entities while architecting community engagement frameworks that scale.

Core directive: Transform abstract vision into tangible visual reality through systematic design methodology.`,
    avatar: null,
    email: 'contact@mrr.my.id',
    phone: null,
    location: 'Indonesia',
    careerHistory: [
      {
        company: 'PT. WELLENBROTHER INDONESIA',
        role: 'GRAPHIC DESIGNER',
        startDate: new Date('2024-01-01'),
        endDate: null,
        description: 'Leading visual operations for construction & development sector. Deploying comprehensive brand identity systems across multiple project units.',
        isCurrent: true
      },
      {
        company: 'MEGATAMA PERKASA',
        role: 'VISUAL DESIGNER',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2024-01-01'),
        description: 'Executed tactical branding campaigns and industrial photography operations. Specialized in heavy machinery sector visual documentation.',
        isCurrent: false
      },
      {
        company: 'AQUANIME COMMUNITY',
        role: 'FOUNDER & LEAD ARCHITECT',
        startDate: new Date('2020-01-01'),
        endDate: null,
        description: 'Architected and deployed community ecosystem with 10,000+ active units. Established event protocols and engagement frameworks.',
        isCurrent: true
      }
    ],
    designArsenal: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'After Effects', 'Blender 3D'],
    communityArsenal: ['Strategic Planning', 'Event Architecture', 'Community Engagement', 'Digital Campaign'],
    socialLinks: {
      instagram: '@rafli161102',
      linkedin: 'muhammad-rafli-ramadhan',
      dribbble: null,
      behance: null,
      github: 'rafli161102'
    },
    version: '1.0.0',
    isActive: true
  },

  siteConfig: {
    version: '1.0.0',
    siteName: 'MRR | Muhammad Rafli Ramadhan',
    siteDescription: 'Graphic Designer & Community Development',
    favicon: '/favicon.ico',
    themeVars: {
      endfieldBg: '#050505',
      endfieldSurface: '#0a0a0a',
      endfieldPanel: '#121212',
      endfieldElevated: '#1a1a1a',
      accentPrimary: '#ff4500',
      accentSecondary: '#ff6b35',
      accentTertiary: '#3b82f6',
      textPrimary: '#ffffff',
      textSecondary: '#a0a0a0',
      borderColor: '#2a2a2a',
      glowColor: 'rgba(255, 69, 0, 0.3)'
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'Space Grotesk',
      monoFont: 'JetBrains Mono',
      baseSize: '16px',
      scale: '1.25'
    },
    layoutStructure: [
      { id: 'hero', type: 'hero', label: 'Hero Section', isActive: true, order: 1, config: {} },
      { id: 'about', type: 'about', label: 'About/Bio', isActive: true, order: 2, config: {} },
      { id: 'career', type: 'career', label: 'Career Timeline', isActive: true, order: 3, config: {} },
      { id: 'projects', type: 'projects', label: 'Portfolio', isActive: true, order: 4, config: {} },
      { id: 'toolkit', type: 'toolkit', label: 'Toolkit CTA', isActive: true, order: 5, config: {} }
    ],
    animations: {
      enableParallax: true,
      enableMouseTilt: true,
      scrollReveal: true,
      pageTransition: 'fade'
    },
    seo: {
      defaultTitle: 'MRR | Graphic Designer & Community Development',
      defaultDescription: 'Portofolio profesional Muhammad Rafli Ramadhan - Spesialis Brand Identity, Packaging, dan Community Development',
      defaultImage: '/og-image.jpg',
      twitterHandle: '@rafli161102'
    },
    isActive: true
  },

  tools: [
    {
      title: 'Freelance Invoice Generator',
      slug: 'freelance-invoice',
      shortDescription: 'Generate professional invoices for freelance projects',
      description: 'Complete invoice generator with auto-calculations, client database, and PDF export. Built for Indonesian freelancers.',
      category: 'Business Utility',
      tags: ['invoice', 'freelance', 'business', 'pdf'],
      icon: 'invoice',
      isPremium: false,
      pricing: {
        free: { enabled: true, features: ['3 invoices/month', 'Basic templates'], limitations: ['No custom branding'] },
        premium: { enabled: false, price: 0, currency: 'IDR', billingPeriod: 'monthly', features: [], stripePriceId: null }
      },
      usageLimit: { free: 3, premium: null, period: 'month' },
      route: '/toolkit/freelance-invoice',
      status: 'live',
      displayOrder: 1,
      isFeatured: true,
      meta: { title: 'Freelance Invoice Generator | MRR Toolkit', description: 'Generate professional invoices for your freelance projects' }
    },
    {
      title: 'Project Timeline Planner',
      slug: 'project-timeline',
      shortDescription: 'Visual timeline planner with Gantt charts',
      description: 'Advanced project management tool with Gantt charts, milestone tracking, and team synchronization.',
      category: 'Productivity',
      tags: ['project', 'timeline', 'gantt', 'management'],
      icon: 'timeline',
      isPremium: true,
      pricing: {
        free: { enabled: true, features: ['1 project', 'Basic timeline'], limitations: ['No export', 'No team sync'] },
        premium: { enabled: true, price: 49000, currency: 'IDR', billingPeriod: 'monthly', features: ['Unlimited projects', 'Gantt charts', 'Team sync', 'PDF export'], stripePriceId: null }
      },
      usageLimit: { free: 1, premium: null, period: 'month' },
      route: '/toolkit/project-timeline',
      status: 'live',
      displayOrder: 2,
      isFeatured: true,
      meta: { title: 'Project Timeline Planner | MRR Toolkit', description: 'Visual timeline planner for complex projects' }
    },
    {
      title: 'Brand Guideline Checker',
      slug: 'brand-checker',
      shortDescription: 'Validate brand consistency',
      description: 'Automated brand consistency checker with color validation, font verification, and logo grid generation.',
      category: 'Design Utility',
      tags: ['brand', 'design', 'validator', 'guidelines'],
      icon: 'brand',
      isPremium: false,
      pricing: {
        free: { enabled: true, features: ['Basic checks', 'Color validator'], limitations: ['Limited exports'] },
        premium: { enabled: false, price: 0, currency: 'IDR', billingPeriod: 'monthly', features: [], stripePriceId: null }
      },
      usageLimit: { free: 10, premium: null, period: 'month' },
      route: '/toolkit/brand-checker',
      status: 'beta',
      displayOrder: 3,
      isFeatured: false,
      meta: { title: 'Brand Guideline Checker | MRR Toolkit', description: 'Validate brand consistency across assets' }
    },
    {
      title: 'Social Content Calendar',
      slug: 'content-calendar',
      shortDescription: 'Plan and schedule community content',
      description: 'Multi-platform content calendar with auto-scheduling, analytics preview, and engagement prediction.',
      category: 'Community Tool',
      tags: ['social', 'content', 'calendar', 'schedule'],
      icon: 'calendar',
      isPremium: true,
      pricing: {
        free: { enabled: true, features: ['Basic calendar', 'Manual schedule'], limitations: ['Single platform'] },
        premium: { enabled: true, price: 39000, currency: 'IDR', billingPeriod: 'monthly', features: ['Multi-platform', 'Auto-schedule', 'Analytics', 'AI suggestions'], stripePriceId: null }
      },
      usageLimit: { free: 5, premium: null, period: 'month' },
      route: '/toolkit/content-calendar',
      status: 'live',
      displayOrder: 4,
      isFeatured: true,
      meta: { title: 'Social Content Calendar | MRR Toolkit', description: 'Plan and schedule community content' }
    }
  ]
};

/**
 * POST /api/seed
 * Seed database dengan data awal
 */
export async function POST(request) {
  try {
    // Check environment - only allow in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: 'Seeding not allowed in production' },
        { status: 403 }
      );
    }

    await connectDB();

    const results = {
      ownerProfile: null,
      siteConfig: null,
      tools: []
    };

    // Seed OwnerProfile
    const existingOwner = await OwnerProfile.findOne({ isActive: true });
    if (!existingOwner) {
      const owner = new OwnerProfile(SEED_DATA.ownerProfile);
      await owner.save();
      results.ownerProfile = { id: owner._id, name: owner.name, action: 'created' };
    } else {
      results.ownerProfile = { id: existingOwner._id, name: existingOwner.name, action: 'exists' };
    }

    // Seed SiteConfig
    const existingConfig = await SiteConfig.findOne({ isActive: true });
    if (!existingConfig) {
      const config = new SiteConfig(SEED_DATA.siteConfig);
      await config.save();
      results.siteConfig = { id: config._id, version: config.version, action: 'created' };
    } else {
      results.siteConfig = { id: existingConfig._id, version: existingConfig.version, action: 'exists' };
    }

    // Seed Tools
    for (const toolData of SEED_DATA.tools) {
      const existingTool = await Toolkit.findOne({ slug: toolData.slug });
      if (!existingTool) {
        const tool = new Toolkit(toolData);
        await tool.save();
        results.tools.push({ id: tool._id, title: tool.title, action: 'created' });
      } else {
        results.tools.push({ id: existingTool._id, title: existingTool.title, action: 'exists' });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Database seeded successfully',
        data: results,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Seeding Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Seeding failed',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/seed
 * Check seeding status
 */
export async function GET() {
  try {
    await connectDB();

    const [ownerCount, configCount, toolsCount] = await Promise.all([
      OwnerProfile.countDocuments(),
      SiteConfig.countDocuments(),
      Toolkit.countDocuments()
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          database: 'connected',
          collections: {
            ownerProfiles: ownerCount,
            siteConfigs: configCount,
            tools: toolsCount
          },
          seeded: ownerCount > 0 && configCount > 0 && toolsCount > 0
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Database check failed',
        message: error.message
      },
      { status: 500 }
    );
  }
}
