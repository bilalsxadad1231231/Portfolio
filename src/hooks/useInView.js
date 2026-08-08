import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the element first crosses into view. Used for scroll-triggered
 * reveals, so it deliberately stops observing afterwards — re-animating text a
 * reader has already read is noise.
 *
 * Returns [ref, shown]. `shown` starts true when the visitor has asked for
 * reduced motion, so the content is simply present instead of animating in.
 */
export default function useInView({ threshold = 0.25, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  );

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown, threshold, rootMargin]);

  return [ref, shown];
}
