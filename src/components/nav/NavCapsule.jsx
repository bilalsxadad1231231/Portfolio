import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import { NAV_ITEMS, SCROLL_PROPS } from './navItems';

/**
 * A filled capsule that glides to whichever item is active. Its geometry is
 * measured from the live DOM rather than assumed, so it stays correct when the
 * font loads late or the labels change.
 */
export default function NavCapsule({ active }) {
  const listRef = useRef(null);
  const itemRefs = useRef({});
  const [box, setBox] = useState({ left: 0, width: 0, ready: false });

  useLayoutEffect(() => {
    const measure = () => {
      const el = itemRefs.current[active];
      const list = listRef.current;
      if (!el || !list) return;
      const a = el.getBoundingClientRect();
      const b = list.getBoundingClientRect();
      setBox({ left: a.left - b.left, width: a.width, ready: true });
    };

    measure();
    window.addEventListener('resize', measure);
    // Web fonts change label widths after first paint.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  useEffect(() => {
    const id = setTimeout(() => setBox((b) => ({ ...b, ready: true })), 80);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      ref={listRef}
      className="relative flex items-center gap-1 rounded-full border border-bone/10 bg-bone/[0.04] p-1"
    >
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-full bg-accent"
        style={{
          transform: `translateX(${box.left}px)`,
          width: box.width,
          left: 0,
          opacity: box.ready && box.width ? 1 : 0,
          transition:
            'transform 520ms cubic-bezier(0.16,1,0.3,1), width 520ms cubic-bezier(0.16,1,0.3,1), opacity 200ms linear',
        }}
      />

      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <span
            key={item.id}
            ref={(el) => {
              itemRefs.current[item.id] = el;
            }}
            className="relative z-10 inline-flex"
          >
            <Link
              to={item.id}
              {...SCROLL_PROPS}
              tabIndex={0}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive ? 'text-onAccent' : 'text-fog hover:text-bone'
              }`}
            >
              {item.label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
