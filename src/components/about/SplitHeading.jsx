import useInView from '../../hooks/useInView';

/**
 * The section title, revealed a word at a time. Each word sits in a clipped box
 * and rises out of it, so the line assembles itself the way the two halves of
 * the section below do — the motion is the argument, not decoration.
 */
export default function SplitHeading({ children, className = '' }) {
  const [ref, shown] = useInView({ threshold: 0.4 });
  const words = String(children).split(' ');

  return (
    <h2
      ref={ref}
      className={`font-display font-semibold leading-[0.95] tracking-tight ${className}`}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span
            className="inline-block will-change-transform"
            style={{
              transform: shown ? 'translateY(0)' : 'translateY(105%)',
              opacity: shown ? 1 : 0,
              transition: `transform 760ms cubic-bezier(0.16,1,0.3,1) ${i * 65}ms, opacity 500ms linear ${i * 65}ms`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </h2>
  );
}
