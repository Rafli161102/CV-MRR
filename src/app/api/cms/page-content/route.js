const { getDB } = require('@/lib/db');
const { getTokenFromHeaders, verifyToken } = require('@/lib/auth');

const DEFAULT_HOME_PAGE_UI = {
  version: 1,
  theme: {
    pageBg: '#030712',
    surface: '#0A1329',
    text: '#cbd5e1',
    muted: '#94a3b8',
    accent: '#67e8f9',
    accentStrong: '#06b6d4',
    accentMid: '#3b82f6',
    accentEnd: '#4f46e5',
    whatsapp: '#25D366'
  },
  hero: {
    statusLabel: 'Graphic Design & Community Development',
    titleLead: 'Menerjemahkan',
    titleAccent: 'Imajinasi',
    titleTrail: 'Menjadi Realitas Visual.',
    description:
      'Halo, saya Rafli. Membantu brand dan entitas mencapai potensi maksimalnya melalui desain identitas yang presisi, estetis, dan strategis.',
    primaryButtonLabel: 'Lihat CV Saya',
    primaryButtonHref: '/cv-print',
    secondaryButtonLabel: 'Mulai Diskusi',
    secondaryButtonHref:
      'https://wa.me/6285155020363?text=Halo%20Rafli%2C%20saya%20telah%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20mengenai%20proyek%20desain.',
    founderLabel: 'Founder of',
    founderName: 'AquaNime',
    experienceValue: '3+',
    experienceText: 'Years Experience',
    profileImage: '/profile.jpg'
  },
  sections: {
    toolkitEyebrow: 'Micro-SaaS Buatan Saya',
    toolkitTitle: 'MRR Toolkit Ecosystem',
    toolkitDescription:
      'Kumpulan aplikasi web dan utilitas desain gratis. Mulai dari ATS CV Maker, generator tautan WhatsApp premium, hingga ekstraktor palet warna untuk mempercepat alur kerja kreatif Anda.',
    toolkitButtonLabel: 'Eksplorasi Toolkit',
    toolkitButtonHref: '/toolkit',
    portfolioEyebrow: 'Portofolio Desain',
    portfolioTitleLead: 'Karya',
    portfolioTitleAccent: 'Unggulan',
    portfolioLinkLabel: 'Lihat Seluruh Karya',
    portfolioLinkHref: '/projects',
    galleryEyebrow: 'Lensa Kamera',
    galleryTitleLead: 'Sudut',
    galleryTitleAccent: 'Pandang',
    galleryLinkLabel: 'Lihat Seluruh Foto',
    galleryLinkHref: '/photography'
  }
};

function requireAuth(headers) {
  const token = getTokenFromHeaders(headers);
  if (!token) {
    return null;
  }

  const user = verifyToken(token);
  return user || null;
}

function mergeHomePageUIConfig(input = {}) {
  const source = input && typeof input === 'object' ? input : {};

  return {
    ...DEFAULT_HOME_PAGE_UI,
    ...source,
    theme: {
      ...DEFAULT_HOME_PAGE_UI.theme,
      ...(source.theme && typeof source.theme === 'object' ? source.theme : {})
    },
    hero: {
      ...DEFAULT_HOME_PAGE_UI.hero,
      ...(source.hero && typeof source.hero === 'object' ? source.hero : {})
    },
    sections: {
      ...DEFAULT_HOME_PAGE_UI.sections,
      ...(source.sections && typeof source.sections === 'object'
        ? source.sections
        : {})
    }
  };
}

function getRecord(id) {
  const db = getDB();
  const record = db
    .prepare('SELECT * FROM page_content WHERE id = ?')
    .get(id);

  if (!record) {
    return null;
  }

  let content = {};
  try {
    content = JSON.parse(record.content || '{}');
  } catch (error) {
    content = {};
  }

  return {
    id: record.id,
    section_name: record.section_name,
    content: mergeHomePageUIConfig(content),
    updated_at: record.updated_at
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || 'homepage-ui';

    const record = getRecord(id);

    if (!record && id === 'homepage-ui') {
      return Response.json({
        id,
        section_name: 'homepage-ui',
        content: DEFAULT_HOME_PAGE_UI,
        updated_at: null
      });
    }

    if (!record) {
      return Response.json({ error: 'Page content not found' }, { status: 404 });
    }

    return Response.json(record);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = requireAuth(request.headers);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const id = body.id || 'homepage-ui';
    const sectionName = body.section_name || id;
    const mergedContent = mergeHomePageUIConfig(body.content);

    const db = getDB();
    db.prepare(`
      INSERT INTO page_content (id, section_name, content, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        section_name = excluded.section_name,
        content = excluded.content,
        updated_at = CURRENT_TIMESTAMP
    `).run(id, sectionName, JSON.stringify(mergedContent));

    const savedRecord = getRecord(id);

    return Response.json({
      success: true,
      item: savedRecord
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
