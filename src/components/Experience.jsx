import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ROLES, PRODUCTION_SYSTEMS, formatMonth } from '../data/experienceData';

const Experience = () => {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden bg-void py-24 text-bone"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
              Experience
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[0.95] tracking-tight">
              Where I&apos;ve shipped
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-fog">
            Two years of production AI work — currently building agentic
            assistants and RAG platforms at AxonBuild.
          </p>
        </div>

        {/* Roles */}
        <ol className="mt-16">
          {ROLES.map((role) => (
            <li
              key={role.id}
              className="grid grid-cols-1 gap-2 border-t border-bone/10 py-8 md:grid-cols-[200px_1fr] md:gap-10"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
                <p className="text-accent">
                  {formatMonth(role.start)} — {formatMonth(role.end)}
                </p>
                <p className="mt-1">{role.location}</p>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm text-glow">{role.company}</p>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-fog">
                  {role.summary}
                </p>

                {role.bullets.length > 0 && (
                  <ul className="mt-4 max-w-2xl space-y-2">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="relative pl-5 text-sm leading-relaxed text-fog before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* The ten systems behind the AxonBuild role */}
        <div className="mt-20">
          <div className="flex items-baseline justify-between border-b border-bone/10 pb-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
              Production systems at AxonBuild
            </p>
            <p className="font-mono text-[11px] text-fog/70">
              {PRODUCTION_SYSTEMS.length} shipped
            </p>
          </div>

          <ul>
            {PRODUCTION_SYSTEMS.map((system, i) => {
              const isOpen = open === system.name;
              return (
                <li key={system.name} className="border-b border-bone/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : system.name)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="font-mono text-[11px] tabular-nums text-fog/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display text-lg font-semibold tracking-tight md:text-xl">
                      {system.name}
                    </span>
                    <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-fog sm:block">
                      {system.domain}
                    </span>
                    <FontAwesomeIcon
                      icon={isOpen ? faMinus : faPlus}
                      className="text-xs text-fog transition-colors group-hover:text-accent"
                    />
                  </button>

                  {isOpen && (
                    <div className="grid gap-4 pb-6 pl-9 md:grid-cols-[1fr_260px] md:gap-10">
                      <p className="max-w-2xl text-sm leading-relaxed text-fog">
                        {system.blurb}
                      </p>

                      <div>
                        {system.proof && (
                          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                            {system.proof}
                          </p>
                        )}
                        <ul className="mt-3 flex flex-wrap gap-1.5">
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
                            className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-glow underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
                          >
                            Visit{' '}
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1 text-[9px]" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
