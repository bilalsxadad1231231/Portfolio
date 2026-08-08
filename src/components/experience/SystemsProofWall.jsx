import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PRODUCTION_SYSTEMS } from '../../data/experienceData';

/**
 * Variant 4 — proof-first wall.
 *
 * Inverts the hierarchy: the evidence is the biggest thing on each tile and the
 * name is the caption. Clicking a tile expands its detail in place rather than
 * navigating away from the grid.
 */
export default function SystemsProofWall() {
  const [open, setOpen] = useState(null);

  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
      {PRODUCTION_SYSTEMS.map((system) => {
        const isOpen = open === system.name;
        return (
          <li key={system.name} className="bg-void">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : system.name)}
              aria-expanded={isOpen}
              className="group flex h-full w-full flex-col justify-between p-6 text-left transition-colors duration-300 hover:bg-surface/50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              <p className="font-display text-[clamp(1.05rem,1.9vw,1.45rem)] font-semibold leading-tight tracking-tight text-accent">
                {system.proof || system.domain}
              </p>

              <div className="mt-8">
                <p className="font-display text-sm font-semibold tracking-tight text-bone">
                  {system.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog/70">
                  {system.domain}
                </p>
              </div>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed text-fog">{system.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
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
                      tabIndex={isOpen ? 0 : -1}
                      className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-glow underline-offset-4 hover:underline"
                    >
                      Visit{' '}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1 text-[9px]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
