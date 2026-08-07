import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { personalData } from '../data/personalData';
import { projectsData } from '../data/projectData';
import { DOMAINS } from '../data/projectDomains';
import profileImage from '../assetes/myProfile.png';

const DRAG_PER_PIXEL = 0.55;
const DRAG_THRESHOLD = 6; // px before a press counts as a drag, not a tap

/** The tools that actually recur across the shipped work, most-used first. */
const useTopTools = (limit) =>
  useMemo(() => {
    const counts = new Map();
    projectsData.forEach((project) =>
      project.tools.forEach((tool) => counts.set(tool, (counts.get(tool) || 0) + 1))
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, limit);
  }, [limit]);

const IdBadge = () => {
  const [rotY, setRotY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const cardRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startRot: 0, moved: 0 });

  const topTools = useTopTools(20);
  const domainCount = DOMAINS.length - 1;

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const flip = useCallback(() => setRotY((r) => Math.round(r / 180) * 180 + 180), []);

  const onPointerDown = (e) => {
    drag.current = { active: true, startX: e.clientX, startRot: rotY, moved: 0 };
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    setRotY(drag.current.startRot + dx * DRAG_PER_PIXEL);
  };

  const onPointerUp = (e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);

    // A press that never moved is a tap: flip. Otherwise settle on a face.
    if (drag.current.moved < DRAG_THRESHOLD) flip();
    else setRotY((r) => Math.round(r / 180) * 180);
  };

  // Ambient tilt, so the card reads as a solid object before you touch it.
  useEffect(() => {
    if (reducedMotion) return;
    const el = cardRef.current;
    if (!el) return;

    const onMove = (e) => {
      if (drag.current.active) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      if (Math.abs(dx) > 1.6 || Math.abs(dy) > 1.6) return setTilt({ x: 0, y: 0 });
      setTilt({ x: -dy * 9, y: dx * 5 });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reducedMotion]);

  const showingBack = ((Math.round(rotY) % 360) + 360) % 360 > 90 &&
    ((Math.round(rotY) % 360) + 360) % 360 < 270;

  return (
    <div className="[perspective:1400px]">
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`Identity card for ${personalData.name}. Activate to turn it over.`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            flip();
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative mx-auto aspect-[5/7] w-full max-w-[340px] cursor-grab touch-pan-y select-none active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${rotY + tilt.y}deg)`,
          transition: dragging ? 'none' : 'transform 620ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* ---------------- Front: who ---------------- */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-bone/12 bg-surface p-5 shadow-2xl [backface-visibility:hidden]">
          <div className="flex items-center justify-between">
            <span className="rounded bg-accent px-2 py-1 font-display text-xs font-semibold text-onAccent">
              MB
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog">
              ID · 21 builds
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-bone/10">
            <img
              src={profileImage}
              alt={personalData.name}
              className="aspect-[4/3] w-full object-cover object-top"
              draggable="false"
              decoding="async"
            />
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold leading-[0.95] tracking-tight text-bone">
            Muhammad
            <br />
            Bilal
          </h3>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {personalData.designation}
          </p>

          <div className="mt-auto pt-4">
            {/* Barcode: decorative, so it is hidden from assistive tech. */}
            <div
              aria-hidden="true"
              className="h-7 w-full opacity-70"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgb(var(--bone-rgb)) 0 2px, transparent 2px 4px, rgb(var(--bone-rgb)) 4px 5px, transparent 5px 9px, rgb(var(--bone-rgb)) 9px 12px, transparent 12px 14px)',
              }}
            />
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-fog">
              {personalData.address} · turn for the stack
            </p>
          </div>
        </div>

        {/* ---------------- Back: what ---------------- */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-bone/12 bg-surface p-5 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            The stack
          </p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {topTools.map(([tool, n]) => (
              <li
                key={tool}
                className="rounded border border-bone/10 px-1.5 py-0.5 font-mono text-[10px] text-fog"
              >
                {tool}
                <span className="ml-1 text-bone/45">{n}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-bone/10 pt-4">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-fog">
                Builds
              </dt>
              <dd className="font-display text-2xl font-semibold text-bone">
                {projectsData.length}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-fog">
                Domains
              </dt>
              <dd className="font-display text-2xl font-semibold text-bone">
                {domainCount}
              </dd>
            </div>
          </dl>

          <p className="mt-3 break-all font-mono text-[9px] uppercase tracking-[0.16em] text-fog">
            {personalData.email}
          </p>
        </div>
      </div>

      <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
        {showingBack ? 'Turn back' : 'Drag or tap to turn'}
      </p>
    </div>
  );
};

export default IdBadge;
