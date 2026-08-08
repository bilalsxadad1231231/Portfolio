import { useEffect, useState } from 'react';

/**
 * Reports which section currently occupies the middle of the viewport.
 *
 * The nav previously only highlighted whatever you last clicked, so scrolling
 * left it stale. The margins collapse the observation area to a horizontal band
 * across the viewport centre, which is what a reader perceives as "here".
 */
export default function useScrollSpy(ids, { topOffset = 45, bottomOffset = 50 } = {}) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        if (!visible.size) return;
        // Keep document order so ties resolve downward rather than jittering.
        const winner = ids.filter((id) => visible.has(id)).pop();
        if (winner) setActive(winner);
      },
      {
        rootMargin: `-${topOffset}% 0px -${bottomOffset}% 0px`,
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, topOffset, bottomOffset]);

  return active;
}
