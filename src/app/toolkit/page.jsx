"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toolkitDB, {
  TOOLKIT_CATEGORIES,
  TOOLKIT_STATUS_LABELS,
} from "@/data/toolkitDB";

const guideSteps = [
  {
    id: "discover",
    label: "Discover",
    title: "Start with the workflow you need right now.",
    description:
      "Filter the collection by category, compare active tools, and scan each toolkit headline before going deeper.",
  },
  {
    id: "evaluate",
    label: "Evaluate",
    title: "Review the details before you commit your time.",
    description:
      "Every toolkit includes feature focus, ideal users, expected outputs, and availability notes so the value is clear.",
  },
  {
    id: "launch",
    label: "Launch",
    title: "Open active tools immediately or track the roadmap.",
    description:
      "Live tools are one tap away, while planned tools still explain their intended use and long-term benefit.",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ToolkitIcon({ name, className = "h-5 w-5" }) {
  const sharedProps = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "document":
      return (
        <svg {...sharedProps}>
          <path d="M8 3.75h6.5L19.25 8.5V20a1.25 1.25 0 0 1-1.25 1.25H8A1.25 1.25 0 0 1 6.75 20V5A1.25 1.25 0 0 1 8 3.75Z" />
          <path d="M14.5 3.75V8.5h4.75" />
          <path d="M9.25 12h5.5" />
          <path d="M9.25 15.5h5.5" />
        </svg>
      );
    case "palette":
      return (
        <svg {...sharedProps}>
          <path d="M12 3.75a8.25 8.25 0 1 0 0 16.5h1.1a2.15 2.15 0 0 0 0-4.3H12.4a1.65 1.65 0 0 1 0-3.3h3.1a4.75 4.75 0 1 0 0-9.5H12Z" />
          <circle cx="8.25" cy="10.25" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="11" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="15.1" cy="8.3" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "receipt":
      return (
        <svg {...sharedProps}>
          <path d="M7 3.75h10a1.25 1.25 0 0 1 1.25 1.25v15.25l-2.25-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2.25 1.5V5A1.25 1.25 0 0 1 7 3.75Z" />
          <path d="M8.75 8.25h6.5" />
          <path d="M8.75 11.75h6.5" />
          <path d="M8.75 15.25h4.5" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...sharedProps}>
          <path d="M8 6.75V5.5A1.75 1.75 0 0 1 9.75 3.75h4.5A1.75 1.75 0 0 1 16 5.5v1.25" />
          <rect x="4.75" y="6.75" width="14.5" height="11.5" rx="1.75" />
          <path d="M4.75 11.5h14.5" />
          <path d="M10 11.5v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1.5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...sharedProps}>
          <path d="m12 4.5 7.25 4.25L12 13 4.75 8.75 12 4.5Z" />
          <path d="m4.75 12 7.25 4.25L19.25 12" />
          <path d="m4.75 15.5 7.25 4.25 7.25-4.25" />
        </svg>
      );
    case "camera":
      return (
        <svg {...sharedProps}>
          <path d="M8.5 6.25 10 4.75h4l1.5 1.5h2a1.75 1.75 0 0 1 1.75 1.75v8a1.75 1.75 0 0 1-1.75 1.75h-11A1.75 1.75 0 0 1 4.75 16v-8A1.75 1.75 0 0 1 6.5 6.25h2Z" />
          <circle cx="12" cy="12" r="3.25" />
        </svg>
      );
    case "spark-grid":
      return (
        <svg {...sharedProps}>
          <rect x="4.75" y="4.75" width="5.5" height="5.5" rx="1.2" />
          <rect x="13.75" y="4.75" width="5.5" height="5.5" rx="1.2" />
          <rect x="4.75" y="13.75" width="5.5" height="5.5" rx="1.2" />
          <path d="M15.25 13.75v2.1h-2.1v1.3h2.1v2.1h1.5v-2.1h2.1v-1.3h-2.1v-2.1Z" />
        </svg>
      );
    default:
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      );
  }
}

function StatusPill({ status }) {
  const isActive = status === "active";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
        isActive
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
          : "border-white/10 bg-white/5 text-white/65"
      )}
    >
      {TOOLKIT_STATUS_LABELS[status] || status}
    </span>
  );
}

export default function ToolkitPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeGuideStep, setActiveGuideStep] = useState(guideSteps[0].id);
  const [selectedToolkitId, setSelectedToolkitId] = useState(
    toolkitDB.find((tool) => tool.status === "active")?.id || toolkitDB[0]?.id || null
  );

  const filteredToolkits = useMemo(() => {
    if (activeCategory === "All") {
      return toolkitDB;
    }

    return toolkitDB.filter((toolkit) => toolkit.category === activeCategory);
  }, [activeCategory]);

  const selectedToolkit = useMemo(() => {
    return (
      filteredToolkits.find((toolkit) => toolkit.id === selectedToolkitId) ||
      filteredToolkits[0] ||
      null
    );
  }, [filteredToolkits, selectedToolkitId]);

  const activeGuide = useMemo(() => {
    return guideSteps.find((step) => step.id === activeGuideStep) || guideSteps[0];
  }, [activeGuideStep]);

  const activeCount = useMemo(() => {
    return toolkitDB.filter((toolkit) => toolkit.status === "active").length;
  }, []);

  const roadmapCount = useMemo(() => {
    return toolkitDB.filter((toolkit) => toolkit.status !== "active").length;
  }, []);

  useEffect(() => {
    if (!filteredToolkits.some((toolkit) => toolkit.id === selectedToolkitId)) {
      setSelectedToolkitId(filteredToolkits[0]?.id || null);
    }
  }, [filteredToolkits, selectedToolkitId]);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_50%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:grid lg:grid-cols-[1.618fr_1fr] lg:gap-10 lg:px-8 lg:py-24">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70 backdrop-blur">
              Digital toolkit library
            </div>

            <div className="max-w-3xl space-y-5">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Toolkit collection for practical workflows, sharper outputs, and premium utility.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Explore live tools you can use immediately and roadmap tools with enough detail to
                understand where the ecosystem is heading. Every entry explains its purpose,
                workflow value, and expected output before you open it.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                  Total toolkits
                </div>
                <div className="mt-3 text-3xl font-semibold">{toolkitDB.length}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                  Available now
                </div>
                <div className="mt-3 text-3xl font-semibold">{activeCount}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                  In roadmap
                </div>
                <div className="mt-3 text-3xl font-semibold">{roadmapCount}</div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                  Guided tour
                </p>
                <h2 className="mt-2 text-2xl font-semibold">How to navigate the toolkit</h2>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/65">
                <ToolkitIcon name="layers" className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {guideSteps.map((step, index) => {
                const isActive = step.id === activeGuideStep;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveGuideStep(step.id)}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-left transition",
                      isActive
                        ? "border-white/20 bg-white/10"
                        : "border-white/10 bg-black/10 hover:border-white/20 hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                          Step {index + 1}
                        </div>
                        <div className="mt-1 text-base font-medium">{step.label}</div>
                      </div>
                      <span className="text-sm text-white/40">0{index + 1}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                Current step
              </div>
              <h3 className="mt-3 text-xl font-semibold">{activeGuide.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{activeGuide.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">
              Filter by category
            </p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Browse by current need
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/60">
            Choose a category to narrow the library. Select any card to inspect its workflow,
            audience fit, outputs, and launch status in detail.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {TOOLKIT_CATEGORIES.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition",
                  isActive
                    ? "border-white/20 bg-white text-[#050816]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {filteredToolkits.map((toolkit) => {
              const isSelected = toolkit.id === selectedToolkit?.id;
              const isActive = toolkit.status === "active";

              return (
                <article
                  key={toolkit.id}
                  className={cn(
                    "group relative overflow-hidden rounded-[2rem] border p-5 transition duration-300",
                    toolkit.theme?.glow,
                    isSelected
                      ? "border-white/20 bg-white/10"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br opacity-80",
                      toolkit.theme?.accent
                    )}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-white/80">
                        <ToolkitIcon name={toolkit.iconName} className="h-6 w-6" />
                      </div>
                      <StatusPill status={toolkit.status} />
                    </div>

                    <div className="mt-5 flex-1 space-y-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                          {toolkit.category}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{toolkit.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-white/68">{toolkit.description}</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                          Focus
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/72">{toolkit.headline}</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                          <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                            Outputs
                          </p>
                          <ul className="mt-3 space-y-2 text-sm text-white/72">
                            {toolkit.outputs.slice(0, 2).map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                          <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                            Best for
                          </p>
                          <ul className="mt-3 space-y-2 text-sm text-white/72">
                            {toolkit.idealFor.slice(0, 2).map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => setSelectedToolkitId(toolkit.id)}
                        className={cn(
                          "inline-flex min-h-[48px] flex-1 items-center justify-center rounded-2xl border px-4 text-sm font-medium transition",
                          isSelected
                            ? "border-white/20 bg-white/10 text-white"
                            : "border-white/10 bg-black/10 text-white/72 hover:border-white/20 hover:bg-white/5"
                        )}
                      >
                        View details
                      </button>

                      {isActive ? (
                        <Link
                          href={toolkit.link}
                          className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#050816] transition hover:bg-white/90"
                        >
                          {toolkit.ctaLabel}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedToolkitId(toolkit.id)}
                          className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/10"
                        >
                          {toolkit.ctaLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="xl:sticky xl:top-24 xl:h-fit">
            {selectedToolkit ? (
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur">
                <div
                  className={cn(
                    "h-36 bg-gradient-to-br",
                    selectedToolkit.theme?.accent || "from-white/10 to-transparent"
                  )}
                />
                <div className="relative px-5 pb-5">
                  <div className="-mt-10 inline-flex rounded-3xl border border-white/10 bg-[#0a1024] p-4 text-white shadow-lg shadow-black/30">
                    <ToolkitIcon name={selectedToolkit.iconName} className="h-7 w-7" />
                  </div>

                  <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                        {selectedToolkit.category}
                      </p>
                      <h3 className="mt-2 text-3xl font-semibold">{selectedToolkit.title}</h3>
                    </div>
                    <StatusPill status={selectedToolkit.status} />
                  </div>

                  <p className="mt-4 text-sm leading-7 text-white/70">{selectedToolkit.detail}</p>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                          Availability
                        </p>
                        <h4 className="mt-2 text-lg font-semibold">
                          {selectedToolkit.availabilityLabel}
                        </h4>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
                        {selectedToolkit.status === "active" ? "Immediate access" : "Planned release"}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/68">
                      {selectedToolkit.headline}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                        Key features
                      </p>
                      <ul className="mt-4 space-y-3 text-sm text-white/72">
                        {selectedToolkit.features.map((feature) => (
                          <li key={feature} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                          Ideal for
                        </p>
                        <ul className="mt-4 space-y-3 text-sm text-white/72">
                          {selectedToolkit.idealFor.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                          Outputs
                        </p>
                        <ul className="mt-4 space-y-3 text-sm text-white/72">
                          {selectedToolkit.outputs.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    {selectedToolkit.status === "active" ? (
                      <Link
                        href={selectedToolkit.link}
                        className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-white px-5 text-sm font-semibold text-[#050816] transition hover:bg-white/90"
                      >
                        {selectedToolkit.ctaLabel}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-white/70"
                      >
                        {selectedToolkit.ctaLabel}
                      </button>
                    )}

                    <Link
                      href="/"
                      className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/10 bg-black/10 px-5 text-sm font-medium text-white/72 transition hover:border-white/20 hover:bg-white/5"
                    >
                      Return to homepage
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-sm text-white/60">
                No toolkit matches the current filter.
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:py-16">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">Roadmap lens</p>
            <h2 className="text-3xl font-semibold text-white">Why upcoming toolkits are already worth exploring</h2>
            <p className="text-sm leading-7 text-white/65">
              The roadmap entries are not placeholders. Each one defines the intended workflow,
              output, and user segment so you can anticipate how the toolkit ecosystem will evolve
              around creative, business, and production work.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {toolkitDB
              .filter((toolkit) => toolkit.status !== "active")
              .slice(0, 4)
              .map((toolkit) => (
                <div
                  key={toolkit.id}
                  className={cn(
                    "rounded-3xl border border-white/10 p-5",
                    toolkit.theme?.surface || "bg-white/5"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-white/85">
                      <ToolkitIcon name={toolkit.iconName} className="h-5 w-5" />
                    </div>
                    <StatusPill status={toolkit.status} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{toolkit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{toolkit.headline}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(toolkit.category);
                      setSelectedToolkitId(toolkit.id);
                    }}
                    className="mt-5 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm font-medium text-white/75 transition hover:border-white/20 hover:bg-white/10"
                  >
                    Inspect roadmap detail
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}