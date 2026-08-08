import { useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faPaperPlane,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { projectsData } from '../data/projectData';
import { DOMAINS, getDomain, getDomainLabel } from '../data/projectDomains';
import { getProjectImage } from '../data/projectImages';

const ProjectRing = lazy(() => import('./three/ProjectRing'));

/**
 * Card-shaped stand-in for the moment before the canvas module arrives, so the
 * gallery has visible structure instead of a blank band.
 */
function RingSkeleton() {
  return (
    <div className="pointer-events-none flex h-full items-center justify-center gap-4">
      {[0.4, 0.7, 1, 0.7, 0.4].map((scale, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-bone/10 bg-bone/[0.06]"
          style={{
            width: `${scale * 240}px`,
            height: `${scale * 150}px`,
            opacity: 0.25 + scale * 0.5,
            animationDelay: `${i * 120}ms`,
          }}
        />
      ))}
    </div>
  );
}

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

const pad = (n) => String(n).padStart(2, '0');

const ProjectsGallery = () => {
  const sectionRef = useRef(null);
  const [domain, setDomain] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => setWebgl(supportsWebGL()), []);

  // The ring is expensive: don't build it until the section is close to view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const projects = useMemo(
    () =>
      domain === 'all'
        ? projectsData
        : projectsData.filter((p) => getDomain(p.id) === domain),
    [domain]
  );

  useEffect(() => setActiveIndex(0), [domain]);

  const active = projects[Math.min(activeIndex, projects.length - 1)];

  const move = (delta) =>
    setActiveIndex((i) => Math.max(0, Math.min(projects.length - 1, i + delta)));

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      move(-1);
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-void py-24 text-bone"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
              Selected work
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[0.95] tracking-tight">
              Projects
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-fog">
            {projectsData.length} shipped builds across language models,
            generative systems, and vision. Drag the ring, or use the arrow keys.
          </p>
        </div>

        {/* Domain filter */}
        <div className="mt-10 flex flex-wrap gap-2">
          {DOMAINS.map((d) => {
            const selected = d.id === domain;
            return (
              <button
                key={d.id}
                onClick={() => setDomain(d.id)}
                aria-pressed={selected}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? 'border-accent bg-accent text-onAccent'
                    : 'border-bone/15 text-fog hover:border-glow hover:text-glow'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* The ring */}
      {webgl ? (
        <div
          role="group"
          aria-label="Project gallery"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-6 h-[42vh] min-h-[300px] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-glow"
        >
          {inView ? (
            <Suspense fallback={<RingSkeleton />}>
              <ProjectRing
                key={domain}
                projects={projects}
                activeIndex={Math.min(activeIndex, projects.length - 1)}
                onSelect={setActiveIndex}
                onContextLost={() => setWebgl(false)}
              />
            </Suspense>
          ) : (
            <RingSkeleton />
          )}
        </div>
      ) : (
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
          {projects.map((p) => (
            <img
              key={p.id}
              src={getProjectImage(p.id)}
              alt={`${p.name} preview`}
              loading="lazy"
              className="aspect-[16/10] w-full rounded-xl border border-bone/10 object-cover"
            />
          ))}
        </div>
      )}

      {/* Detail panel for the active project */}
      {active && (
        <div className="mx-auto mt-8 max-w-6xl px-6 md:px-10">
          <div className="rounded-2xl border border-bone/10 bg-surface/70 p-6 backdrop-blur-sm md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
                {pad(activeIndex + 1)} / {pad(projects.length)} ·{' '}
                <span className="text-glow">{getDomainLabel(active.id)}</span>
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => move(-1)}
                  disabled={activeIndex === 0}
                  aria-label="Previous project"
                  className="rounded-full border border-bone/15 px-4 py-2 text-fog transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-bone/15 disabled:hover:text-fog focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  onClick={() => move(1)}
                  disabled={activeIndex >= projects.length - 1}
                  aria-label="Next project"
                  className="rounded-full border border-bone/15 px-4 py-2 text-fog transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-bone/15 disabled:hover:text-fog focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {active.name}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              {active.role}
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fog md:text-base">
              {active.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {active.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-md border border-bone/10 px-2.5 py-1 font-mono text-[11px] text-fog"
                >
                  {tool}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              {active.code && (
                <a
                  href={active.code}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-onAccent transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Source code <FontAwesomeIcon icon={faCode} className="ml-1.5" />
                </a>
              )}
              {active.demo && (
                <a
                  href={active.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-bone/20 px-5 py-2.5 text-sm font-semibold text-bone transition-colors duration-200 hover:border-glow hover:text-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
                >
                  Live demo <FontAwesomeIcon icon={faPaperPlane} className="ml-1.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsGallery;
