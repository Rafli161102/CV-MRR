import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { PROJECT_LIST } from '@/data/store';

export const dynamic = 'force-dynamic';

function parseStringList(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch (error) {
    // Continue to comma-separated parsing.
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProject(project) {
  if (!project || typeof project !== 'object') {
    return null;
  }

  const technologies = parseStringList(project.technologies || project.stack);

  const additionalImages = parseStringList(project.additional_images || project.additionalImages);

  const metrics = Array.isArray(project.metrics)
    ? project.metrics
    : Array.isArray(project.highlights)
    ? project.highlights
    : [];

  return {
    ...project,
    id: project.id ?? project.slug ?? project.title,
    slug: String(project.slug ?? project.id ?? ''),
    title: project.title || 'Untitled Project',
    category: project.category || 'Selected Work',
    description: project.description || project.summary || 'Project details are being prepared.',
    image: project.image || project.cover || project.thumbnail || '',
    year: project.year || project.period || '',
    client: project.client || '',
    role: project.role || '',
    overview: project.overview || project.description || '',
    challenge: project.challenge || '',
    solution: project.solution || '',
    results: project.results || '',
    metrics,
    technologies,
    additionalImages,
    link: project.link || project.live_url || project.liveUrl || '',
    github: project.github || project.repository || '',
  };
}

function extractProjectPayload(payload) {
  if (!payload) {
    return null;
  }

  if (Array.isArray(payload)) {
    return normalizeProject(payload[0]);
  }

  if (payload.project && typeof payload.project === 'object') {
    return normalizeProject(payload.project);
  }

  if (payload.data && !Array.isArray(payload.data) && typeof payload.data === 'object') {
    return normalizeProject(payload.data);
  }

  if (Array.isArray(payload.projects) && payload.projects.length > 0) {
    return normalizeProject(payload.projects[0]);
  }

  if (typeof payload === 'object') {
    return normalizeProject(payload);
  }

  return null;
}

function findFallbackProject(slug) {
  return normalizeProject(
    (Array.isArray(PROJECT_LIST) ? PROJECT_LIST : []).find((project) => project.slug === slug)
  );
}

function getRequestOrigin() {
  const headerStore = headers();
  const host =
    headerStore.get('x-forwarded-host') ||
    headerStore.get('host') ||
    process.env.VERCEL_URL ||
    '';
  const protocol = headerStore.get('x-forwarded-proto') || 'http';

  if (!host) {
    return process.env.NEXT_PUBLIC_SITE_URL || '';
  }

  if (host.startsWith('http://') || host.startsWith('https://')) {
    return host;
  }

  return `${protocol}://${host}`;
}

async function getLiveProject(slug) {
  const origin = getRequestOrigin();
  if (!origin) {
    return null;
  }

  try {
    const baseUrl = origin.replace(/\/$/, '');
    const response = await fetch(`${baseUrl}/api/cms/projects?id=${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return extractProjectPayload(payload);
  } catch (error) {
    console.error(`Project detail fallback to static store for slug "${slug}":`, error);
    return null;
  }
}

function renderMetric(metric, index) {
  if (typeof metric === 'string') {
    return {
      label: `Highlight ${String(index + 1).padStart(2, '0')}`,
      value: metric,
    };
  }

  if (metric && typeof metric === 'object') {
    return {
      label: metric.label || metric.title || `Highlight ${String(index + 1).padStart(2, '0')}`,
      value: metric.value || metric.description || metric.content || '',
    };
  }

  return null;
}

export async function generateMetadata({ params }) {
  const project = (await getLiveProject(params.slug)) || findFallbackProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const liveProject = await getLiveProject(params.slug);
  const fallbackProject = findFallbackProject(params.slug);
  const project = liveProject || fallbackProject;

  if (!project) {
    notFound();
  }

  const galleryImages = [project.image, ...project.additionalImages].filter(Boolean);
  const metrics = project.metrics.map(renderMetric).filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            Back to projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.618fr_1fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                {project.category}
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                {project.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Year</p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {project.year || 'Ongoing'}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Role</p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {project.role || 'Creative and technical direction'}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Client</p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {project.client || 'Independent / internal initiative'}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Source</p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {liveProject ? 'Live CMS entry' : 'Static fallback entry'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
            <div className="aspect-[16/9] bg-slate-900">
              {project.image ? (
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  Project visual pending
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.618fr_1fr] lg:px-8 lg:py-16">
          <div className="space-y-8">
            {project.overview ? (
              <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Overview</p>
                <p className="mt-4 text-base leading-7 text-slate-300">{project.overview}</p>
              </article>
            ) : null}

            {project.challenge ? (
              <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Challenge</p>
                <p className="mt-4 text-base leading-7 text-slate-300">{project.challenge}</p>
              </article>
            ) : null}

            {project.solution ? (
              <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Solution</p>
                <p className="mt-4 text-base leading-7 text-slate-300">{project.solution}</p>
              </article>
            ) : null}

            {project.results ? (
              <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Results</p>
                <p className="mt-4 text-base leading-7 text-slate-300">{project.results}</p>
              </article>
            ) : null}
          </div>

          <aside className="space-y-6">
            {project.technologies.length > 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Toolkit</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((item) => (
                    <span
                      key={`${project.slug}-${item}`}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {metrics.length > 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Highlights</p>
                <div className="mt-4 grid gap-4">
                  {metrics.map((metric) => (
                    <div key={`${project.slug}-${metric.label}`} className="rounded-2xl border border-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {(project.link || project.github) ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Links</p>
                <div className="mt-4 grid gap-3">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                    >
                      Visit live project
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm text-slate-100 transition hover:bg-white/10"
                    >
                      View repository
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {galleryImages.length > 1 ? (
        <section>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Gallery</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Supporting visuals</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-400">
                Additional imagery stays in sync with the CMS when available and gracefully falls
                back to the portfolio store when needed.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {galleryImages.map((image, index) => (
                <div
                  key={`${project.slug}-gallery-${index}`}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
                >
                  <div className="aspect-[4/3] bg-slate-900">
                    <img
                      src={image}
                      alt={`${project.title} visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}