export const TOOLKIT_DB = [
  {
    id: "cv-maker",
    title: "CV Maker",
    description:
      "Build a polished curriculum vitae with clear structure, modern spacing, and export-ready content blocks.",
    link: "/cv-maker",
    status: "active",
    category: "Career",
    headline: "Shape a premium CV in minutes without losing your personal voice.",
    detail:
      "CV Maker is designed for professionals who need a structured resume workflow that feels clean, fast, and practical. It helps you move from raw information to a presentable CV layout with sections that stay readable for recruiters, collaborators, and clients.",
    features: [
      "Structured profile, experience, and education sections",
      "Clean visual hierarchy for professional presentation",
      "Fast editing workflow for quick revisions before applying",
      "Ready-to-use formatting for digital sharing and review",
      "Focused interface that keeps attention on content quality",
      "ATS-friendly format for better application tracking",
      "Export to PDF with professional typography",
    ],
    idealFor: [
      "Job seekers preparing tailored applications",
      "Freelancers who need a credible profile document",
      "Students building their first professional CV",
      "Professionals updating their career portfolio",
    ],
    outputs: [
      "Professional CV content layout",
      "Refined personal profile summary",
      "Application-ready resume structure",
      "PDF export for job applications",
      "Print-ready document format",
    ],
    availabilityLabel: "Available now",
    ctaLabel: "Open CV Maker",
    theme: {
      accent: "from-sky-500/30 via-cyan-400/10 to-transparent",
      surface: "border-sky-400/20 bg-sky-500/10",
      glow: "shadow-[0_24px_80px_-40px_rgba(56,189,248,0.55)]",
    },
    iconName: "document",
    version: "1.2.0",
    lastUpdated: "2024-04-15",
    complexity: "Beginner",
    estimatedTime: "15-30 minutes",
    requirements: ["Basic personal information", "Work history details", "Education background"],
  },
  {
    id: "css-studio",
    title: "CSS Studio",
    description:
      "Explore visual styling ideas with a focused interface for gradients, layout direction, and polished front-end details.",
    link: "/css-studio",
    status: "active",
    category: "Design",
    headline: "Prototype visual direction faster with a studio built for front-end refinement.",
    detail:
      "CSS Studio helps designers and developers test visual combinations without breaking momentum. It is positioned as a practical playground for experimenting with gradients, surfaces, spacing rhythm, and interface polish before moving into production styling.",
    features: [
      "Visual controls for exploring style direction",
      "Fast experimentation for gradients and surface treatment",
      "Useful for UI concepting and portfolio presentation work",
      "Reduces friction between idea, preview, and refinement",
    ],
    idealFor: [
      "Front-end developers refining presentation layers",
      "Designers testing interface directions",
      "Portfolio builders who want a stronger visual finish",
    ],
    outputs: [
      "Reusable styling direction",
      "Sharper UI surface concepts",
      "Presentation-ready visual references",
    ],
    availabilityLabel: "Available now",
    ctaLabel: "Launch CSS Studio",
    theme: {
      accent: "from-violet-500/30 via-fuchsia-400/10 to-transparent",
      surface: "border-violet-400/20 bg-violet-500/10",
      glow: "shadow-[0_24px_80px_-40px_rgba(168,85,247,0.55)]",
    },
    iconName: "palette",
    version: "1.0.0",
    lastUpdated: "2024-03-20",
    complexity: "Intermediate",
    estimatedTime: "Varies by project",
    requirements: ["Basic CSS knowledge", "Design references or inspiration"],
  },
  {
    id: "freelance-invoice",
    title: "Freelance Invoice",
    description:
      "Generate clear invoice details for client billing with better structure, credibility, and delivery readiness.",
    link: "/toolkit/freelance-invoice",
    status: "active",
    category: "Business",
    headline: "Turn project scope into a confident invoice draft that feels organized and client-ready.",
    detail:
      "Freelance Invoice is built for independent professionals who need a cleaner billing workflow. The tool helps frame service details, payment information, and invoice structure so the final result feels more trustworthy and easier for clients to review.",
    features: [
      "Clear invoice fields for client, scope, and totals",
      "Professional structure that improves billing clarity",
      "Useful for one-off projects and recurring work",
      "Quick generation flow for faster project administration",
    ],
    idealFor: [
      "Freelancers sending invoices to direct clients",
      "Independent designers and developers",
      "Consultants who need a simple billing workflow",
    ],
    outputs: [
      "Structured invoice draft",
      "Clear client billing summary",
      "Shareable payment-ready document content",
    ],
    availabilityLabel: "Available now",
    ctaLabel: "Create invoice",
    theme: {
      accent: "from-emerald-500/30 via-lime-400/10 to-transparent",
      surface: "border-emerald-400/20 bg-emerald-500/10",
      glow: "shadow-[0_24px_80px_-40px_rgba(16,185,129,0.55)]",
    },
    iconName: "receipt",
    version: "1.1.0",
    lastUpdated: "2024-04-10",
    complexity: "Beginner",
    estimatedTime: "10-20 minutes",
    requirements: ["Client details", "Service descriptions", "Payment terms"],
  },
  {
    id: "proposal-canvas",
    title: "Proposal Canvas",
    description:
      "Draft persuasive service proposals with a tighter narrative around scope, value, deliverables, and next steps.",
    link: "/toolkit/proposal-canvas",
    status: "coming-soon",
    category: "Business",
    headline: "Translate client goals into a concise proposal structure with stronger business clarity.",
    detail:
      "Proposal Canvas is planned as a focused framework for turning discovery notes into a more persuasive proposal. It will help organize challenges, strategic response, deliverables, timeline, and commercial terms into a sequence that feels intentional rather than improvised.",
    features: [
      "Guided proposal sections from problem to solution",
      "Value framing for services and deliverables",
      "Clear sequencing for timeline, pricing, and approval",
      "Sharper presentation for freelance and studio work",
    ],
    idealFor: [
      "Freelancers preparing proposals after discovery calls",
      "Studios handling tailored client offers",
      "Consultants packaging services more clearly",
    ],
    outputs: [
      "Proposal structure draft",
      "Scope and deliverables summary",
      "Client-facing approval-ready narrative",
    ],
    availabilityLabel: "In roadmap",
    ctaLabel: "Preview roadmap",
    theme: {
      accent: "from-amber-500/30 via-orange-400/10 to-transparent",
      surface: "border-amber-400/20 bg-amber-500/10",
      glow: "shadow-[0_24px_80px_-40px_rgba(245,158,11,0.5)]",
    },
    iconName: "briefcase",
    version: "0.9.0",
    lastUpdated: "2024-04-01",
    complexity: "Intermediate",
    estimatedTime: "30-45 minutes",
    requirements: ["Discovery call notes", "Client requirements", "Service offerings", "Pricing strategy"],
    roadmap: ["Q2 2024: Beta testing", "Q3 2024: Public release"],
  },
  {
    id: "content-brief-lab",
    title: "Content Brief Lab",
    description:
      "Map content goals, audience intent, structure, and production notes before writing or publishing.",
    link: "/toolkit/content-brief-lab",
    status: "coming-soon",
    category: "Content",
    headline: "Create content briefs that align message, audience, and production direction from the start.",
    detail:
      "Content Brief Lab is envisioned as a planning tool for creators and teams who want cleaner handoffs before content production begins. The experience will help translate campaign goals into a brief covering message angle, audience, structure, assets, and review notes.",
    features: [
      "Brief templates for topic, angle, and audience intent",
      "Production notes for assets, channels, and review flow",
      "Structure planning before copywriting starts",
      "Useful for solo creators and collaborative teams",
    ],
    idealFor: [
      "Content strategists and copywriters",
      "Creative teams planning campaigns",
      "Freelancers handling content production end to end",
    ],
    outputs: [
      "Content brief draft",
      "Audience and message alignment notes",
      "Production-ready planning document",
    ],
    availabilityLabel: "In roadmap",
    ctaLabel: "View upcoming details",
    theme: {
      accent: "from-rose-500/30 via-pink-400/10 to-transparent",
      surface: "border-rose-400/20 bg-rose-500/10",
      glow: "shadow-[0_24px_80px_-40px_rgba(244,63,94,0.48)]",
    },
    iconName: "layers",
    version: "0.8.0",
    lastUpdated: "2024-03-15",
    complexity: "Intermediate",
    estimatedTime: "20-40 minutes",
    requirements: ["Campaign goals", "Target audience data", "Content angle ideas"],
    roadmap: ["Q2 2024: Template library", "Q3 2024: Team collaboration"],
  },
  {
    id: "shot-planner",
    title: "Shot Planner",
    description:
      "Plan photography direction with scene notes, subject intent, visual references, and production checklists.",
    link: "/toolkit/shot-planner",
    status: "coming-soon",
    category: "Photography",
    headline: "Organize visual sessions with a clearer bridge between concept, execution, and output.",
    detail:
      "Shot Planner is a future toolkit for photographers and visual creators who need a compact pre-production workflow. It is intended to capture scene concepts, subject notes, reference direction, shot priorities, and logistics so sessions move with less friction.",
    features: [
      "Shot list planning with creative priorities",
      "Reference and production note organization",
      "Useful for portraits, editorial, and product sessions",
      "Keeps concept and logistics in one place",
    ],
    idealFor: [
      "Photographers preparing client shoots",
      "Creative directors building shot direction",
      "Visual teams managing compact productions",
    ],
    outputs: [
      "Session shot list",
      "Concept and reference summary",
      "Pre-production checklist",
    ],
    availabilityLabel: "In roadmap",
    ctaLabel: "Track release plan",
    theme: {
      accent: "from-cyan-500/30 via-blue-400/10 to-transparent",
      surface: "border-cyan-400/20 bg-cyan-500/10",
      glow: "shadow-[0_24px_80px_-40px_rgba(34,211,238,0.5)]",
    },
    iconName: "camera",
    version: "0.7.0",
    lastUpdated: "2024-03-10",
    complexity: "Intermediate",
    estimatedTime: "45-60 minutes",
    requirements: ["Shot list references", "Location details", "Equipment list", "Model/subject info"],
    roadmap: ["Q2 2024: Mobile app preview", "Q3 2024: Full release"],
  },
  {
    id: "portfolio-copy-lab",
    title: "Portfolio Copy Lab",
    description:
      "Refine portfolio messaging with stronger project framing, clearer service language, and sharper positioning.",
    link: "/toolkit/portfolio-copy-lab",
    status: "coming-soon",
    category: "Career",
    headline: "Upgrade how your work reads, not just how it looks.",
    detail:
      "Portfolio Copy Lab is planned to help creatives clarify what they did, why it mattered, and how the work should be understood by recruiters or clients. It focuses on the narrative layer that often makes a portfolio feel more strategic and credible.",
    features: [
      "Guided copy prompts for project context and impact",
      "Sharper service and capability positioning",
      "Useful for portfolios, case studies, and profile pages",
      "Supports stronger storytelling around outcomes",
    ],
    idealFor: [
      "Designers and developers improving case studies",
      "Freelancers refining service positioning",
      "Job seekers strengthening project narratives",
    ],
    outputs: [
      "Project story draft",
      "Positioning and service copy",
      "Stronger portfolio content outline",
    ],
    availabilityLabel: "In roadmap",
    ctaLabel: "See roadmap value",
    theme: {
      accent: "from-indigo-500/30 via-blue-400/10 to-transparent",
      surface: "border-indigo-400/20 bg-indigo-500/10",
      glow: "shadow-[0_24px_80px_-40px_rgba(99,102,241,0.5)]",
    },
    iconName: "spark-grid",
    version: "0.6.0",
    lastUpdated: "2024-02-28",
    complexity: "Beginner",
    estimatedTime: "20-30 minutes",
    requirements: ["Project details", "Outcome metrics", "Client testimonials"],
    roadmap: ["Q3 2024: AI-assisted copy suggestions", "Q4 2024: Integration with portfolio templates"],
  },
];

export const TOOLKIT_CATEGORIES = [
  "All",
  ...Array.from(new Set(TOOLKIT_DB.map((toolkit) => toolkit.category))),
];

export const TOOLKIT_STATUS_LABELS = {
  active: "Available now",
  "coming-soon": "Coming soon",
};

export const toolkitDB = TOOLKIT_DB;
export const toolkits = TOOLKIT_DB;
export const toolkitCategories = TOOLKIT_CATEGORIES;
export const toolkitStatusLabels = TOOLKIT_STATUS_LABELS;
export const getToolkitById = (id) => TOOLKIT_DB.find((toolkit) => toolkit.id === id) || null;

export default TOOLKIT_DB;