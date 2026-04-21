'use client';

import { useEffect, useMemo, useState } from 'react';

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500 ${
          type === 'color' ? 'h-12 cursor-pointer p-2' : ''
        }`}
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500"
      />
    </label>
  );
}

const PANELS = [
  { id: 'theme', label: 'Theme' },
  { id: 'hero', label: 'Hero' },
  { id: 'sections', label: 'Sections' }
];

export default function HomeVisualEditor({ initialContent, onSaved }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('theme');
  const [draft, setDraft] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setIsMounted(true);

    const token = window.localStorage.getItem('cms_token');
    setHasToken(Boolean(token));

    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') === '1' && token) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    setDraft(initialContent);
  }, [initialContent]);

  const token = useMemo(() => {
    if (!isMounted) return '';
    return window.localStorage.getItem('cms_token') || '';
  }, [isMounted, hasToken, isOpen]);

  const updateSection = (section, key, value) => {
    setDraft((prev) => ({
      ...prev,
      [section]: {
        ...(prev?.[section] || {}),
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    if (!token) {
      setFeedback('Token CMS tidak ditemukan. Login dulu di /admin.');
      return;
    }

    try {
      setIsSaving(true);
      setFeedback('');

      const response = await fetch('/api/cms/page-content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: 'homepage-ui',
          section_name: 'homepage-ui',
          content: draft
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedback(data.error || 'Gagal menyimpan perubahan.');
        return;
      }

      setFeedback('Perubahan UI berhasil disimpan.');
      if (typeof onSaved === 'function') {
        onSaved(data.item?.content || draft);
      }
    } catch (error) {
      console.error(error);
      setFeedback('Terjadi error saat menyimpan perubahan UI.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isMounted || !hasToken) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-[60] rounded-full border border-cyan-400/40 bg-slate-950/90 px-5 py-3 text-sm font-bold text-cyan-300 shadow-[0_10px_30px_rgba(6,182,212,0.25)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-slate-900"
      >
        {isOpen ? 'Tutup Editor UI' : 'Edit UI Homepage'}
      </button>

      {isOpen && (
        <aside className="fixed right-0 top-0 z-[70] h-screen w-full max-w-md border-l border-white/10 bg-[#020617]/95 text-white shadow-2xl backdrop-blur-xl">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                    Front Browser CMS
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight">
                    Homepage Visual Editor
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Ubah teks, warna, tombol, dan label section langsung dari halaman depan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 transition hover:bg-white/5"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto">
                {PANELS.map((panel) => (
                  <button
                    key={panel.id}
                    type="button"
                    onClick={() => setActivePanel(panel.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition ${
                      activePanel === panel.id
                        ? 'bg-cyan-500 text-slate-950'
                        : 'border border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {panel.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto px-5 py-5">
              {activePanel === 'theme' && (
                <div className="space-y-5">
                  <Field
                    label="Page Background"
                    type="color"
                    value={draft?.theme?.pageBg}
                    onChange={(value) => updateSection('theme', 'pageBg', value)}
                  />
                  <Field
                    label="Surface"
                    type="color"
                    value={draft?.theme?.surface}
                    onChange={(value) => updateSection('theme', 'surface', value)}
                  />
                  <Field
                    label="Text"
                    type="color"
                    value={draft?.theme?.text}
                    onChange={(value) => updateSection('theme', 'text', value)}
                  />
                  <Field
                    label="Muted Text"
                    type="color"
                    value={draft?.theme?.muted}
                    onChange={(value) => updateSection('theme', 'muted', value)}
                  />
                  <Field
                    label="Accent Soft"
                    type="color"
                    value={draft?.theme?.accent}
                    onChange={(value) => updateSection('theme', 'accent', value)}
                  />
                  <Field
                    label="Accent Main"
                    type="color"
                    value={draft?.theme?.accentStrong}
                    onChange={(value) => updateSection('theme', 'accentStrong', value)}
                  />
                  <Field
                    label="Accent Mid"
                    type="color"
                    value={draft?.theme?.accentMid}
                    onChange={(value) => updateSection('theme', 'accentMid', value)}
                  />
                  <Field
                    label="Accent End"
                    type="color"
                    value={draft?.theme?.accentEnd}
                    onChange={(value) => updateSection('theme', 'accentEnd', value)}
                  />
                  <Field
                    label="WhatsApp Color"
                    type="color"
                    value={draft?.theme?.whatsapp}
                    onChange={(value) => updateSection('theme', 'whatsapp', value)}
                  />
                </div>
              )}

              {activePanel === 'hero' && (
                <div className="space-y-5">
                  <Field
                    label="Status Label"
                    value={draft?.hero?.statusLabel}
                    onChange={(value) => updateSection('hero', 'statusLabel', value)}
                  />
                  <Field
                    label="Title Lead"
                    value={draft?.hero?.titleLead}
                    onChange={(value) => updateSection('hero', 'titleLead', value)}
                  />
                  <Field
                    label="Title Accent"
                    value={draft?.hero?.titleAccent}
                    onChange={(value) => updateSection('hero', 'titleAccent', value)}
                  />
                  <Field
                    label="Title Trail"
                    value={draft?.hero?.titleTrail}
                    onChange={(value) => updateSection('hero', 'titleTrail', value)}
                  />
                  <TextAreaField
                    label="Description"
                    value={draft?.hero?.description}
                    onChange={(value) => updateSection('hero', 'description', value)}
                    rows={5}
                  />
                  <Field
                    label="Primary Button Label"
                    value={draft?.hero?.primaryButtonLabel}
                    onChange={(value) => updateSection('hero', 'primaryButtonLabel', value)}
                  />
                  <Field
                    label="Primary Button Link"
                    value={draft?.hero?.primaryButtonHref}
                    onChange={(value) => updateSection('hero', 'primaryButtonHref', value)}
                  />
                  <Field
                    label="Secondary Button Label"
                    value={draft?.hero?.secondaryButtonLabel}
                    onChange={(value) => updateSection('hero', 'secondaryButtonLabel', value)}
                  />
                  <Field
                    label="Secondary Button Link"
                    value={draft?.hero?.secondaryButtonHref}
                    onChange={(value) => updateSection('hero', 'secondaryButtonHref', value)}
                  />
                  <Field
                    label="Founder Label"
                    value={draft?.hero?.founderLabel}
                    onChange={(value) => updateSection('hero', 'founderLabel', value)}
                  />
                  <Field
                    label="Founder Name"
                    value={draft?.hero?.founderName}
                    onChange={(value) => updateSection('hero', 'founderName', value)}
                  />
                  <Field
                    label="Experience Value"
                    value={draft?.hero?.experienceValue}
                    onChange={(value) => updateSection('hero', 'experienceValue', value)}
                  />
                  <Field
                    label="Experience Text"
                    value={draft?.hero?.experienceText}
                    onChange={(value) => updateSection('hero', 'experienceText', value)}
                  />
                  <Field
                    label="Profile Image URL"
                    value={draft?.hero?.profileImage}
                    onChange={(value) => updateSection('hero', 'profileImage', value)}
                  />
                </div>
              )}

              {activePanel === 'sections' && (
                <div className="space-y-5">
                  <Field
                    label="Toolkit Eyebrow"
                    value={draft?.sections?.toolkitEyebrow}
                    onChange={(value) => updateSection('sections', 'toolkitEyebrow', value)}
                  />
                  <Field
                    label="Toolkit Title"
                    value={draft?.sections?.toolkitTitle}
                    onChange={(value) => updateSection('sections', 'toolkitTitle', value)}
                  />
                  <TextAreaField
                    label="Toolkit Description"
                    value={draft?.sections?.toolkitDescription}
                    onChange={(value) => updateSection('sections', 'toolkitDescription', value)}
                    rows={4}
                  />
                  <Field
                    label="Toolkit Button Label"
                    value={draft?.sections?.toolkitButtonLabel}
                    onChange={(value) => updateSection('sections', 'toolkitButtonLabel', value)}
                  />
                  <Field
                    label="Toolkit Button Link"
                    value={draft?.sections?.toolkitButtonHref}
                    onChange={(value) => updateSection('sections', 'toolkitButtonHref', value)}
                  />
                  <Field
                    label="Portfolio Eyebrow"
                    value={draft?.sections?.portfolioEyebrow}
                    onChange={(value) => updateSection('sections', 'portfolioEyebrow', value)}
                  />
                  <Field
                    label="Portfolio Title Lead"
                    value={draft?.sections?.portfolioTitleLead}
                    onChange={(value) => updateSection('sections', 'portfolioTitleLead', value)}
                  />
                  <Field
                    label="Portfolio Title Accent"
                    value={draft?.sections?.portfolioTitleAccent}
                    onChange={(value) => updateSection('sections', 'portfolioTitleAccent', value)}
                  />
                  <Field
                    label="Portfolio Link Label"
                    value={draft?.sections?.portfolioLinkLabel}
                    onChange={(value) => updateSection('sections', 'portfolioLinkLabel', value)}
                  />
                  <Field
                    label="Portfolio Link Href"
                    value={draft?.sections?.portfolioLinkHref}
                    onChange={(value) => updateSection('sections', 'portfolioLinkHref', value)}
                  />
                  <Field
                    label="Gallery Eyebrow"
                    value={draft?.sections?.galleryEyebrow}
                    onChange={(value) => updateSection('sections', 'galleryEyebrow', value)}
                  />
                  <Field
                    label="Gallery Title Lead"
                    value={draft?.sections?.galleryTitleLead}
                    onChange={(value) => updateSection('sections', 'galleryTitleLead', value)}
                  />
                  <Field
                    label="Gallery Title Accent"
                    value={draft?.sections?.galleryTitleAccent}
                    onChange={(value) => updateSection('sections', 'galleryTitleAccent', value)}
                  />
                  <Field
                    label="Gallery Link Label"
                    value={draft?.sections?.galleryLinkLabel}
                    onChange={(value) => updateSection('sections', 'galleryLinkLabel', value)}
                  />
                  <Field
                    label="Gallery Link Href"
                    value={draft?.sections?.galleryLinkHref}
                    onChange={(value) => updateSection('sections', 'galleryLinkHref', value)}
                  />
                </div>
              )}
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              {feedback && (
                <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                  {feedback}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDraft(initialContent)}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/5"
                >
                  Reset Draft
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSave}
                  className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
