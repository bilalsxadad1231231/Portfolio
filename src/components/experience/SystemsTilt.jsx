import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PRODUCTION_SYSTEMS } from '../../data/experienceData';

const MAX_TILT = 7; // degrees

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/** One card that leans toward the pointer, with a highlight tracking the cursor. */
function TiltCard({ system }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - py) * MAX_TILT * 2, y: (px - 0.5) * MAX_TILT * 2 });
    setGlow({ x: px * 100, y: py * 100, on: true });
  };

  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setGlow((g) => ({ ...g, on: false }));
  };

  return (
    <li style={{ perspective: '900px' }}>
      <article
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        className="group relative h-full overflow-hidden rounded-2xl border border-bone/10 bg-surface/60 p-6"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transition: 'transform 260ms cubic-bezier(0.16,1,0.3,1), border-color 260ms linear',
          transformStyle: 'preserve-3d',
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(340px circle at ${glow.x}% ${glow.y}%, rgb(var(--accent-rgb) / 0.14), transparent 60%)`,
            opacity: glow.on ? 1 : 0,
            transition: 'opacity 260ms linear',
          }}
        />

        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70">
            {system.domain}
          </p>
          <h4 className="mt-2 font-display text-xl font-semibold tracking-tight">
            {system.name}
          </h4>
          {system.proof && (
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-accent">
              {system.proof}
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-fog">{system.blurb}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
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
              className="mt-5 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-glow underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
            >
              Visit <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1 text-[9px]" />
            </a>
          )}
        </div>
      </article>
    </li>
  );
}

/** Variant 2 — pointer-tilt card grid. */
export default function SystemsTilt() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PRODUCTION_SYSTEMS.map((system) => (
        <TiltCard key={system.name} system={system} />
      ))}
    </ul>
  );
}
