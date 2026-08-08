import { useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PRODUCTION_SYSTEMS } from '../../data/experienceData';

/**
 * Variant 1 — master/detail console.
 *
 * A rail of every system with an indicator that slides to the selection (the
 * same measured-DOM mechanic as the nav capsule), and a detail pane that leads
 * with the proof line. Everything is one click deep and the page never jumps.
 */
export default function SystemsConsole() {
  const [index, setIndex] = useState(0);
  const railRef = useRef(null);
  const itemRefs = useRef([]);
  const [bar, setBar] = useState({ top: 0, height: 0, ready: false });

  const system = PRODUCTION_SYSTEMS[index];

  useLayoutEffect(() => {
    const measure = () => {
      const el = itemRefs.current[index];
      const rail = railRef.current;
      if (!el || !rail) return;
      setBar({ top: el.offsetTop, height: el.offsetHeight, ready: true });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [index]);

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const next =
      e.key === 'ArrowDown'
        ? (index + 1) % PRODUCTION_SYSTEMS.length
        : (index - 1 + PRODUCTION_SYSTEMS.length) % PRODUCTION_SYSTEMS.length;
    setIndex(next);
    itemRefs.current[next]?.focus();
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(200px,260px)_1fr] md:gap-12">
      {/* Rail */}
      <div ref={railRef} className="relative" onKeyDown={onKeyDown}>
        <span
          aria-hidden="true"
          className="absolute left-0 w-px bg-accent"
          style={{
            top: bar.top,
            height: bar.height,
            opacity: bar.ready ? 1 : 0,
            transition:
              'top 460ms cubic-bezier(0.16,1,0.3,1), height 460ms cubic-bezier(0.16,1,0.3,1), opacity 200ms linear',
          }}
        />
        <ul role="tablist" aria-orientation="vertical" className="border-l border-bone/10">
          {PRODUCTION_SYSTEMS.map((s, i) => {
            const isActive = i === index;
            return (
              <li key={s.name}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onClick={() => setIndex(i)}
                  className={`flex w-full items-baseline gap-3 py-2.5 pl-4 pr-2 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isActive ? 'text-bone' : 'text-fog hover:text-bone'
                  }`}
                >
                  <span className="font-mono text-[10px] tabular-nums text-fog/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-base font-semibold tracking-tight">
                    {s.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Detail */}
      <div key={system.name} className="animate-rise">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
          {system.domain}
        </p>
        {system.proof && (
          <p className="mt-3 max-w-xl font-display text-[clamp(1.25rem,2.6vw,1.9rem)] font-semibold leading-tight tracking-tight text-accent">
            {system.proof}
          </p>
        )}
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-fog">{system.blurb}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {system.stack.map((tool) => (
            <li
              key={tool}
              className="rounded border border-bone/10 px-2 py-1 font-mono text-[10px] text-fog"
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
            className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-glow underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
          >
            Visit <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1 text-[9px]" />
          </a>
        )}
      </div>
    </div>
  );
}
