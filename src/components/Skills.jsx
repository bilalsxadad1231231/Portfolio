import { useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import skills, { SKILL_CATEGORIES } from '../data/Skillicon';
import { useTextureProgress } from './three/useLazyTexture';

const SkillGlobe = lazy(() => import('./three/SkillGlobe'));

const EMPTY = [];

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

/**
 * Stand-in shown while the canvas module is still downloading: a ring of faint
 * tiles roughly where the sphere will be, so the section reads as loading
 * rather than as empty.
 */
function GlobeSkeleton() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[300px] w-[300px]">
        {SKELETON_TILES.map((tile, i) => (
          <span
            key={i}
            className="absolute h-7 w-7 animate-pulse rounded-md bg-bone/10"
            style={{
              left: `calc(50% + ${tile.x}px)`,
              top: `calc(50% + ${tile.y}px)`,
              opacity: tile.o,
              animationDelay: `${i * 60}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Fixed positions so the skeleton does not reshuffle between renders. */
const SKELETON_TILES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const radius = 88 + (i % 3) * 26;
  return {
    x: Math.cos(angle) * radius - 14,
    y: Math.sin(angle) * radius * 0.78 - 14,
    o: 0.35 + (i % 3) * 0.2,
  };
});

const Skills = () => {
  const sectionRef = useRef(null);
  const [category, setCategory] = useState('all');
  const [hovered, setHovered] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [webgl, setWebgl] = useState(true);

  // Icons stream in one at a time, so report the count rather than leaving the
  // sphere looking broken while it fills.
  const iconUrls = useMemo(() => skills.map((s) => s.skillicon), []);
  const { loaded, total, done } = useTextureProgress(revealed ? iconUrls : EMPTY);

  useEffect(() => setWebgl(supportsWebGL()), []);

  // 59 textures is real weight — don't fetch them until the section is close.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setRevealed(true),
      { rootMargin: '350px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const counts = useMemo(
    () =>
      skills.reduce((acc, s) => {
        acc[s.category] = (acc[s.category] || 0) + 1;
        return acc;
      }, {}),
    []
  );

  const visible = useMemo(
    () => (category === 'all' ? skills : skills.filter((s) => s.category === category)),
    [category]
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-void py-24 text-bone"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
              Toolkit
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[0.95] tracking-tight">
              Skills
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-fog">
            {skills.length} tools I work with, arranged as one object. Drag to
            spin it, or pick a group to isolate.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap gap-2">
          {SKILL_CATEGORIES.map((c) => {
            const selected = c.id === category;
            const n = c.id === 'all' ? skills.length : counts[c.id] || 0;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                aria-pressed={selected}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? 'border-accent bg-accent text-onAccent'
                    : 'border-bone/15 text-fog hover:border-glow hover:text-glow'
                }`}
              >
                {c.label}
                <span className="ml-2 opacity-60">{n}</span>
              </button>
            );
          })}
        </div>
      </div>

      {webgl ? (
        <>
          <div className="relative mt-6 h-[62vh] min-h-[420px] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing">
            {revealed && (
              <Suspense fallback={<GlobeSkeleton />}>
                <SkillGlobe
                  activeCategory={category}
                  onHover={setHovered}
                  onContextLost={() => setWebgl(false)}
                />
              </Suspense>
            )}
            {!revealed && <GlobeSkeleton />}

            {/* Loading count, gone the moment every icon is in */}
            <div
              aria-live="polite"
              className={`pointer-events-none absolute inset-x-0 top-2 flex justify-center transition-opacity duration-500 ${
                done ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">
                Loading icons {loaded} / {total}
              </p>
            </div>

            {/* Readout for the icon under the cursor */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
              <p
                className={`font-mono text-sm uppercase tracking-[0.2em] transition-opacity duration-200 ${
                  hovered ? 'text-bone opacity-100' : 'text-fog/50 opacity-100'
                }`}
              >
                {hovered ? hovered.name : 'Drag to spin'}
              </p>
            </div>
          </div>

          {/* The same list as plain text: keeps every skill crawlable and
              reachable by keyboard, which sprites in a canvas are not. */}
          <div className="mx-auto mt-10 max-w-6xl px-6 md:px-10">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {visible.map((skill) => (
                <li
                  key={skill.name}
                  onMouseEnter={() => setHovered(skill)}
                  onMouseLeave={() => setHovered(null)}
                  className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    hovered?.name === skill.name ? 'text-accent' : 'text-fog/70'
                  }`}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-3 gap-4 px-6 sm:grid-cols-4 md:grid-cols-6 md:px-10">
          {visible.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-2 rounded-lg border border-bone/10 p-4"
            >
              <img
                src={skill.skillicon}
                alt=""
                loading="lazy"
                className="h-8 w-8 object-contain"
              />
              <p className="text-center text-xs text-fog">{skill.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;
