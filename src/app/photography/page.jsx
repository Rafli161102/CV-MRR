'use client';

import { useEffect, useMemo, useState } from 'react';
import { INSTAGRAM_STATS, PHOTO_GALLERY } from '@/data/store';

const INITIAL_VISIBLE_ITEMS = 9;
const FALLBACK_GALLERY = Array.isArray(PHOTO_GALLERY) ? PHOTO_GALLERY : [];

function normalizeGalleryItem(item, index = 0) {
  if (!item || typeof item !== 'object') {
    return null;
  }

  return {
    ...item,
    id: item.id ?? `${item.title || item.alt || 'photo'}-${index}`,
    title: item.title || item.alt || `Frame ${String(index + 1).padStart(2, '0')}`,
    image: item.image || item.image_url || item.url || item.src || '',
    alt: item.alt || item.title || 'Photography entry',
    category: item.category || item.collection || 'Photography',
    location: item.location || '',
    camera: item.camera || '',
    featured: Boolean(item.featured),
  };
}

function normalizeGalleryCollection(payload) {
  const candidates = [
    payload,
    payload?.photos,
    payload?.gallery,
    payload?.items,
    payload?.data,
  ].find(Array.isArray);

  if (!Array.isArray(candidates)) {
    return [];
  }

  return candidates.map(normalizeGalleryItem).filter(Boolean);
}

export default function PhotographyPage() {
  const [photos, setPhotos] = useState(FALLBACK_GALLERY.map(normalizeGalleryItem).filter(Boolean));
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);
  const [isLoading, setIsLoading] = useState(true);
  const instagramStats = Array.isArray(INSTAGRAM_STATS)
    ? INSTAGRAM_STATS
    : Object.entries(INSTAGRAM_STATS || {}).map(([label, value]) => ({
        label,
        value,
      }));

  useEffect(() => {
    let isMounted = true;

    async function loadGallery() {
      try {
        const response = await fetch('/api/cms/photo-gallery', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to load CMS gallery');
        }

        const payload = await response.json();
        const liveGallery = normalizeGalleryCollection(payload);

        if (isMounted && liveGallery.length > 0) {
          setPhotos(liveGallery);
        }
      } catch (error) {
        console.error('Photography page fallback to static store:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setVisibleCount((current) => Math.min(Math.max(current, INITIAL_VISIBLE_ITEMS), Math.max(photos.length, INITIAL_VISIBLE_ITEMS)));
  }, [photos.length]);

  const visiblePhotos = useMemo(() => photos.slice(0, visibleCount), [photos, visibleCount]);
  const categories = useMemo(() => {
    const values = new Set(photos.map((item) => item.category).filter(Boolean));
    return Array.from(values);
  }, [photos]);

  const remainingPhotos = Math.max(photos.length - visiblePhotos.length, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.618fr_1fr] lg:items-end lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/70">
              Photography Archive
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              A live visual journal with runtime gallery sync and graceful fallback support.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              The public gallery now reads from the CMS photo collection when available, while
              keeping the original curated store as a reliable fallback for uninterrupted browsing.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Frames</p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {String(photos.length).padStart(2, '0')}
              </p>
              <p className="mt-2 text-sm text-slate-400">Photos available in the current archive.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Collections</p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {String(categories.length).padStart(2, '0')}
              </p>
              <p className="mt-2 text-sm text-slate-400">Distinct themes across the gallery.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Source</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {isLoading ? 'Syncing CMS' : 'Live + Fallback Ready'}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Load-more interactions now respond to runtime gallery data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-4 md:grid-cols-3">
            {instagramStats.map((stat, index) => (
              <div
                key={`${stat.label || 'stat'}-${index}`}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                {stat.description ? (
                  <p className="mt-2 text-sm text-slate-400">{stat.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Current Gallery</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Published frames from the photography CMS
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

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePhotos.map((photo, index) => (
              <figure
                key={photo.id || index}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-900">
                  {photo.image ? (
                    <img
                      src={photo.image}
                      alt={photo.alt}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                      Photo preview pending
                    </div>
                  )}
                </div>

                <figcaption className="grid gap-3 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                    <span>{photo.category}</span>
                    {photo.location ? <span>{photo.location}</span> : null}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{photo.title}</h3>
                    {photo.camera ? (
                      <p className="mt-2 text-sm text-slate-400">{photo.camera}</p>
                    ) : null}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {!isLoading && photos.length === 0 ? (
            <div className="mt-8 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="text-lg font-medium text-white">No photography entries available.</p>
              <p className="mt-2 text-sm text-slate-400">
                Add images in the CMS to publish them here automatically.
              </p>
            </div>
          ) : null}

          {remainingPhotos > 0 ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((current) => Math.min(current + INITIAL_VISIBLE_ITEMS, photos.length))}
                className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Load more frames ({remainingPhotos} remaining)
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}