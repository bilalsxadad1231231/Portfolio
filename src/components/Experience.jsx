import { ROLES, PRODUCTION_SYSTEMS, formatMonth } from '../data/experienceData';
import SystemsDeck from './experience/SystemsDeck';

const Experience = () => {

  // overflow-x-clip rather than overflow-hidden: hidden would turn this section
  // into a scroll container, which silently breaks the deck's sticky pinning.
  return (
    <section
      id="experience"
      className="relative w-full overflow-x-clip bg-void py-24 text-bone"
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

        {/* The systems behind the AxonBuild role */}
        <div className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-bone/10 pb-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
              Production systems at AxonBuild
            </p>

            <p className="font-mono text-[11px] text-fog/70">
              {PRODUCTION_SYSTEMS.length} shipped
            </p>
          </div>

          <div className="mt-10">
            <SystemsDeck />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
