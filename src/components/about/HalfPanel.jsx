import { createContext, useContext } from 'react';
import useInView from '../../hooks/useInView';

const RevealContext = createContext(false);

/**
 * A named tool inside the prose. Set in the same mono face the badge uses for
 * its chrome, with a rule that draws itself under the word as the paragraph
 * arrives — the paragraph reads as prose, but the stack stays scannable.
 */
export function Term({ children, delay = 0 }) {
  const shown = useContext(RevealContext);

  return (
    <span className="group/term relative inline-block whitespace-nowrap font-mono text-[0.86em] tracking-tight text-bone transition-colors duration-200 hover:text-accent">
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-[2px] h-px origin-left bg-accent/45 group-hover/term:bg-accent"
        style={{
          transform: shown ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 620ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, background-color 200ms linear`,
        }}
      />
    </span>
  );
}

/**
 * One of the two halves. The index and the rule down the left edge are the
 * structure: there are exactly two, the heading says so, and the rule grows to
 * the length of the paragraph it belongs to.
 */
export default function HalfPanel({ index, title, delay = 0, children }) {
  const [ref, shown] = useInView({ threshold: 0.3 });

  return (
    <RevealContext.Provider value={shown}>
      <article
        ref={ref}
        className="group relative pl-12 md:pl-16"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(18px)',
          transition: `opacity 700ms linear ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}
      >
        <span className="absolute left-0 top-[2px] font-mono text-[10px] tabular-nums tracking-[0.2em] text-fog/60 transition-colors duration-300 group-hover:text-accent">
          {index}
        </span>

        <span
          aria-hidden="true"
          className="absolute bottom-1 left-[6px] top-6 w-px origin-top bg-bone/15 transition-colors duration-300 group-hover:bg-accent/40"
          style={{
            transform: shown ? 'scaleY(1)' : 'scaleY(0)',
            transition: `transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay + 120}ms, background-color 300ms linear`,
          }}
        />

        <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          {title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-fog md:text-lg">{children}</p>
      </article>
    </RevealContext.Provider>
  );
}
