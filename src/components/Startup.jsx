import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { STARTUP, formatMonth } from '../data/experienceData';

const Startup = () => (
  <section
    id="startup"
    className="relative w-full overflow-hidden bg-surface py-24 text-bone"
  >
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
          {STARTUP.role}
        </p>
        <span className="rounded-full border border-glow/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-glow">
          {STARTUP.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[0.95] tracking-tight">
          Nexa&nbsp;Home
        </h2>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
          {formatMonth(STARTUP.tenure.start)} — {formatMonth(STARTUP.tenure.end)} ·{' '}
          {STARTUP.team}
        </p>
      </div>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-fog md:text-lg">
        {STARTUP.pitch}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={STARTUP.demo}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-onAccent transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Try the 3D demo{' '}
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1.5 text-xs" />
        </a>
        <a
          href={STARTUP.site}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-bone/20 px-5 py-2.5 text-sm font-semibold text-bone transition-colors duration-200 hover:border-glow hover:text-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
        >
          nexahome.co
        </a>
      </div>

      {/* What makes it technically interesting */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {STARTUP.technical.map((item, i) => (
          <div key={item.title} className="border-t border-bone/10 pt-5">
            <p className="font-mono text-[11px] tabular-nums text-accent">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fog">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* Being explicit about what exists, because the vision is bigger than the build */}
      <div className="mt-16 grid grid-cols-1 gap-10 border-t border-bone/10 pt-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
            Live today
          </p>
          <ul className="mt-4 space-y-2">
            {STARTUP.live.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-fog">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-1 shrink-0 text-[10px] text-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
            Still to build
          </p>
          <ul className="mt-4 space-y-2">
            {STARTUP.building.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-fog/70">
                <span className="mt-2 h-px w-2.5 shrink-0 bg-fog/40" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-fog/60">
            {STARTUP.contribution}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Startup;
