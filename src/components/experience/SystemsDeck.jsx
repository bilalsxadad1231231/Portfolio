import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PRODUCTION_SYSTEMS } from '../../data/experienceData';

/** Viewport heights of scrolling that advance the deck by one card. */
const PER_CARD_VH = 55;
/** How many cards behind the front one are drawn. */
const VISIBLE = 3;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/**
 * Systems as a deck dealt by the scrollbar.
 *
 * The section pins while a tall track scrolls behind it, and scroll position
 * maps to a fractional index — so the front card lifts away and the next one
 * rises continuously with the wheel rather than snapping between states. Scroll
 * is the single source of truth: the arrows and the tick rail move the page,
 * they don't set state of their own.
 */
export default function SystemsDeck() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(prefersReduced);
  const total = PRODUCTION_SYSTEMS.length;
  const lastIndex = total - 1;

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq?.addEventListener?.('change', onChange);
    return () => mq?.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const scrolled = clamp(-rect.top, 0, travel);
      setProgress((scrolled / travel) * lastIndex);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced, lastIndex]);

  /** Scroll the page so the deck lands on `target`. */
  const goTo = (target) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = clamp(target, 0, lastIndex);
    const rect = track.getBoundingClientRect();
    // Document offset, not offsetTop — the section is positioned, so offsetTop
    // would be measured from the section rather than the page.
    const trackTop = rect.top + window.scrollY;
    const travel = rect.height - window.innerHeight;
    const top = trackTop + (clamped / lastIndex) * travel;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const index = Math.min(Math.round(progress), lastIndex);

  // Without motion the deck is simply a list — no pinning, no transforms.
  if (reduced) {
    return (
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PRODUCTION_SYSTEMS.map((system, i) => (
          <li key={system.name}>
            <Card system={system} position={i} total={total} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div ref={trackRef} style={{ height: `calc(100vh + ${lastIndex * PER_CARD_VH}vh)` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative w-full">
          <div className="mx-auto flex max-w-3xl items-center gap-8">
            {/* Tick rail — position in the deck, and a way to jump */}
            <ol className="hidden shrink-0 flex-col gap-2 sm:flex">
              {PRODUCTION_SYSTEMS.map((system, i) => {
                const isActive = i === index;
                return (
                  <li key={system.name}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to ${system.name}`}
                      aria-current={isActive}
                      className="group flex h-4 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span
                        className={`block h-px transition-all duration-500 ${
                          isActive ? 'w-8 bg-accent' : 'w-4 bg-bone/25 group-hover:w-6 group-hover:bg-bone/50'
                        }`}
                      />
                      <span
                        className={`font-mono text-[9px] tabular-nums transition-colors duration-300 ${
                          isActive ? 'text-accent' : 'text-fog/40 group-hover:text-fog'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* The stack */}
            <div
              className="relative h-[420px] flex-1"
              style={{ perspective: '1400px', perspectiveOrigin: '50% 30%' }}
            >
              {PRODUCTION_SYSTEMS.map((system, i) => {
                // Distance from the front of the deck, as a continuous value.
                const t = i - progress;
                if (t > VISIBLE || t < -1) return null;

                let style;
                if (t < 0) {
                  // Leaving: lifted clear of the deck before it fades, so the
                  // outgoing card never sits translucent over the incoming one.
                  const u = -t;
                  style = {
                    transform: `translateY(${-300 * u}px) translateZ(${200 * u}px) rotateX(${
                      18 * u
                    }deg) scale(${1 + 0.04 * u})`,
                    // Fully opaque for the first half of its exit, so it never
                    // overlaps the next card while see-through.
                    opacity: u < 0.5 ? 1 : 1 - Math.pow((u - 0.5) / 0.5, 1.5),
                    filter: `blur(${(3 * u * u).toFixed(2)}px)`,
                  };
                } else {
                  // Waiting: sits lower and further back, so each card behind
                  // shows a clean edge below the one in front of it.
                  style = {
                    transform: `translateY(${t * 30}px) translateZ(${-t * 70}px) scale(${
                      1 - t * 0.035
                    })`,
                    opacity: t > VISIBLE - 1 ? clamp(VISIBLE - t, 0, 1) : 1,
                    filter: `blur(${Math.min(t * 0.9, 2.5).toFixed(2)}px)`,
                  };
                }

                return (
                  <div
                    key={system.name}
                    aria-hidden={i !== index}
                    className="absolute inset-0"
                    style={{
                      ...style,
                      zIndex: total - Math.max(0, Math.round(t)),
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity, filter',
                      pointerEvents: i === index ? 'auto' : 'none',
                    }}
                  >
                    <Card
                      system={system}
                      position={i}
                      total={total}
                      scrim={t > 0 ? clamp(t * 0.26, 0, 0.7) : 0}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step controls, for anyone who would rather not scroll */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <StepButton
              label="Previous system"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
              rotate
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog/60">
              Scroll to deal
            </p>
            <StepButton
              label="Next system"
              disabled={index === lastIndex}
              onClick={() => goTo(index + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepButton({ label, onClick, disabled, rotate = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 text-fog transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none">
        <path
          d={rotate ? 'M6 10V2M6 2L2.5 5.5M6 2l3.5 3.5' : 'M6 2v8M6 10l3.5-3.5M6 10L2.5 6.5'}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/** One dossier. Kept separate so the reduced-motion list can reuse it. */
function Card({ system, position, total, scrim = 0 }) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-bone/10 bg-surface p-8 shadow-2xl">
      {/* Accent edge — the only colour on the card body */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent/70" />

      {/* The index, set large and quiet behind the stack chips */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 right-2 select-none font-display text-[8rem] font-semibold leading-none text-bone/[0.05]"
      >
        {String(position + 1).padStart(2, '0')}
      </span>

      <div className="relative flex items-baseline justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog/70">
          {system.domain}
        </p>
        <p className="font-mono text-[10px] tabular-nums text-fog/50">
          {String(position + 1).padStart(2, '0')} / {total}
        </p>
      </div>

      <h4 className="relative mt-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-none tracking-tight">
        {system.name}
      </h4>

      {system.proof && (
        <p className="relative mt-4 inline-block self-start rounded-md bg-accent/10 px-2.5 py-1.5 font-mono text-[11px] leading-relaxed text-accent">
          {system.proof}
        </p>
      )}

      <p className="relative mt-5 max-w-xl text-sm leading-relaxed text-fog">{system.blurb}</p>

      <div className="relative mt-auto pt-6">
        <ul className="flex flex-wrap gap-1.5">
          {system.stack.map((tool) => (
            <li
              key={tool}
              className="rounded border border-bone/10 px-1.5 py-0.5 font-mono text-[10px] text-fog"
            >
              {tool}
            </li>
          ))}
        </ul>

        {system.link && (
          <a
            href={system.link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-glow underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
          >
            Visit <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1 text-[9px]" />
          </a>
        )}
      </div>

      {/* Cards further back recede behind a wash of the page colour rather than
          going transparent, which would let the card beneath read through. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-void"
        style={{ opacity: scrim }}
      />
    </article>
  );
}
