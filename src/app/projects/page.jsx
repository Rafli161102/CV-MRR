'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { PROJECT_LIST } from '@/data/store';

const FALLBACK_PROJECTS = Array.isArray(PROJECT_LIST) ? PROJECT_LIST : [];

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

function normalizeProject(project, index = 0) {
  if (!project || typeof project !== 'object') {
    return null;
  }

  const slugSource = project.slug || project.id || project.title || `project-${index}`;
  const technologies = parseStringList(project.technologies || project.stack);

  return {
    ...project,
    id: project.id ?? slugSource,
    slug: String(slugSource),
    title: project.title || 'Untitled Project',
    category: project.category || 'Selected Work',
    description: project.description || project.summary || 'Project details are being prepared.',
    image: project.image || project.cover || project.thumbnail || '',
    year: project.year || project.period || project.timeline || '',
    technologies,
    featured: Boolean(project.featured),
  };
}

function normalizeProjectCollection(payload) {
  const candidates = [
    payload,
    payload?.projects,
    payload?.data,
    payload?.items,
  ].find(Array.isArray);

  if (!Array.isArray(candidates)) {
    return [];
  }

  return candidates.map(normalizeProject).filter(Boolean);
}

function formatProjectCount(count) {
  return count.toString().padStart(2, '0');
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS.map(normalizeProject).filter(Boolean));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const response = await fetch('/api/cms/projects', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to load CMS projects');
        }

        const payload = await response.json();
        const liveProjects = normalizeProjectCollection(payload);

        if (isMounted && liveProjects.length > 0) {
          setProjects(liveProjects);
        }
      } catch (error) {
        console.error('Projects page fallback to static store:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const values = new Set(projects.map((project) => project.category).filter(Boolean));
    return Array.from(values);
  }, [projects]);

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured).slice(0, 2),
    [projects]
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.618fr_1fr] lg:items-end lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[#fffa00]/70">
              Portfolio Archive
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Live-selected projects, synced from the CMS and ready to review.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              This archive now reads from the portfolio CMS at runtime, so every published
              update can flow directly into the public project index while preserving static
              fallbacks for resilience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Archive</p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {formatProjectCount(projects.length)}
              </p>
              <p className="mt-2 text-sm text-slate-400">Runtime project entries available.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Categories</p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {formatProjectCount(categories.length)}
              </p>
              <p className="mt-2 text-sm text-slate-400">Distinct disciplines in the archive.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Source</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {isLoading ? 'Syncing CMS' : 'Live + Fallback Ready'}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                If the API is unavailable, the static store remains available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 ? (
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Featured Selection
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Current highlights from the portfolio system
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-400">
                These projects are surfaced first when marked as featured in the CMS, helping
                the homepage and archive stay aligned.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {featuredProjects.map((project) => (
                <Link
                  key={`featured-${project.slug}`}
                  href={`/projects/${project.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        Project cover pending
                      </div>
                    )}
                  </div>
                  <div className="grid gap-4 p-6 md:grid-cols-[1.618fr_1fr] md:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                        <span>{project.category}</span>
                        {project.year ? <span>{project.year}</span> : null}
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {project.technologies.slice(0, 4).map((item) => (
                        <span
                          key={`${project.slug}-${item}`}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">All Projects</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Runtime archive with graceful fallback support
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-slate-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <Link
                key={project.slug || project.id || index}
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="aspect-[5/4] overflow-hidden bg-slate-900">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                      Project cover pending
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                    <span>{project.category}</span>
                    <span>{project.year || `Archive ${String(index + 1).padStart(2, '0')}`}</span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">
                    {project.description}
                  </p>

                  {project.technologies.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((item) => (
                        <span
                          key={`${project.slug}-${item}`}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-slate-400">Open case study</span>
                    <span className="font-medium text-white transition group-hover:translate-x-1">
                      View project
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!isLoading && projects.length === 0 ? (
            <div className="mt-8 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="text-lg font-medium text-white">No projects available right now.</p>
              <p className="mt-2 text-sm text-slate-400">
                Publish a project in the CMS to have it appear here automatically.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}