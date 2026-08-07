import { EDUCATION, CERTIFICATIONS, formatMonth } from '../data/experienceData';

const Education = () => (
  <section
    id="education"
    className="relative w-full overflow-hidden bg-void py-24 text-bone"
  >
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
        Education
      </p>

      <div className="mt-8 grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <div className="border-t border-bone/10 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {formatMonth(EDUCATION.start)} — {formatMonth(EDUCATION.end)} ·{' '}
              {EDUCATION.grade}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight md:text-2xl">
              {EDUCATION.degree}
            </h3>
            <p className="mt-1 text-sm text-glow">
              {EDUCATION.school} · {EDUCATION.location}
            </p>
          </div>

          {/* The FYP is academic and solo — kept separate from the client work. */}
          <div className="mt-10 border-t border-bone/10 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
              Final year project · {EDUCATION.fyp.team}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
              {EDUCATION.fyp.name}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog">
              {EDUCATION.fyp.blurb}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog">
              {EDUCATION.fyp.detail}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {EDUCATION.fyp.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded border border-bone/10 px-1.5 py-0.5 font-mono text-[10px] text-fog"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between border-t border-bone/10 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
              Certifications
            </p>
            <p className="font-mono text-[11px] text-fog/70">{CERTIFICATIONS.length}</p>
          </div>

          <ul className="mt-4">
            {CERTIFICATIONS.map((cert, i) => (
              <li
                key={cert}
                className="flex items-baseline gap-3 border-b border-bone/10 py-2.5"
              >
                <span className="font-mono text-[11px] tabular-nums text-fog/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-fog">{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Education;
