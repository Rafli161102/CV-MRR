'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Photography', href: '/photography' },
  { label: 'Toolkit', href: '/toolkit' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasCmsToken, setHasCmsToken] = useState(false);

  useEffect(() => {
    const syncCmsAccess = () => {
      if (typeof window === 'undefined') {
        return;
      }

      setHasCmsToken(Boolean(window.localStorage.getItem('cms_token')));
    };

    syncCmsAccess();
    window.addEventListener('storage', syncCmsAccess);
    window.addEventListener('focus', syncCmsAccess);
    document.addEventListener('visibilitychange', syncCmsAccess);

    return () => {
      window.removeEventListener('storage', syncCmsAccess);
      window.removeEventListener('focus', syncCmsAccess);
      document.removeEventListener('visibilitychange', syncCmsAccess);
    };
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const cmsEntry = useMemo(
    () =>
      hasCmsToken
        ? {
            label: 'Open Editor',
            href: '/?edit=1',
            secondaryLabel: 'CMS Admin',
            secondaryHref: '/admin',
            description: 'Signed in for live homepage editing.',
          }
        : {
            label: 'Admin Access',
            href: '/admin',
            secondaryLabel: 'Homepage',
            secondaryHref: '/',
            description: 'Sign in to manage the live portfolio.',
          },
    [hasCmsToken]
  );

  const isCmsActive =
    pathname === '/admin' || (pathname === '/' && cmsEntry.href === '/?edit=1');

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-semibold tracking-[0.22em] text-white">
              MR
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-[0.28em] text-white">
                Muhammad Rafli
              </p>
              <p className="truncate text-xs text-slate-400">
                Design systems, web experiences, and visual archives
              </p>
            </div>
          </Link>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  'rounded-full px-4 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-white text-slate-950'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="hidden max-w-xs text-right xl:block">
            <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
              CMS Sync
            </p>
            <p className="text-xs text-slate-400">{cmsEntry.description}</p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
            <Link
              href={cmsEntry.href}
              className={classNames(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                isCmsActive
                  ? 'bg-white text-slate-950'
                  : 'text-slate-100 hover:bg-white/10'
              )}
            >
              {cmsEntry.label}
            </Link>
            <Link
              href={cmsEntry.secondaryHref}
              className="rounded-full px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {cmsEntry.secondaryLabel}
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] p-3 text-white transition hover:bg-white/10 lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <span
              className={classNames(
                'block h-0.5 w-full rounded-full bg-current transition',
                isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
              )}
            />
            <span
              className={classNames(
                'block h-0.5 w-full rounded-full bg-current transition',
                isMenuOpen ? 'opacity-0' : ''
              )}
            />
            <span
              className={classNames(
                'block h-0.5 w-full rounded-full bg-current transition',
                isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
              )}
            />
          </span>
        </button>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-white/10 bg-slate-950/95 lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6">
            <div className="grid gap-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={classNames(
                      'rounded-2xl border px-4 py-3 text-sm transition-colors',
                      isActive
                        ? 'border-white/20 bg-white text-slate-950'
                        : 'border-white/10 bg-white/[0.04] text-slate-100 hover:bg-white/10'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  CMS Access
                </p>
                <p className="mt-2 text-sm text-slate-300">{cmsEntry.description}</p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <Link
                  href={cmsEntry.href}
                  className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                >
                  {cmsEntry.label}
                </Link>
                <Link
                  href={cmsEntry.secondaryHref}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm text-slate-100 transition hover:bg-white/10"
                >
                  {cmsEntry.secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}