import { useEffect, useState } from 'react';

/**
 * Reads the CSS custom properties that drive the WebGL scenes and re-reads them
 * whenever the theme changes. The canvases can't use Tailwind classes, so this
 * is how they stay in step with the rest of the page.
 */
const read = () => {
  if (typeof window === 'undefined') {
    return {
      fieldA: '#7C5CFF',
      fieldB: '#FF8904',
      fieldC: '#22D3EE',
      additive: true,
      fieldOpacity: 1,
      dimFloor: 0.22,
      surface: '#15151D',
      accent: '#FF8904',
    };
  }

  const s = getComputedStyle(document.documentElement);
  const num = (name, fallback) => {
    const v = parseFloat(s.getPropertyValue(name));
    return Number.isFinite(v) ? v : fallback;
  };
  const rgb = (name, fallback) => {
    const v = s.getPropertyValue(name).trim();
    return v ? `rgb(${v.split(/\s+/).join(',')})` : fallback;
  };

  return {
    fieldA: s.getPropertyValue('--field-a').trim() || '#7C5CFF',
    fieldB: s.getPropertyValue('--field-b').trim() || '#FF8904',
    fieldC: s.getPropertyValue('--field-c').trim() || '#22D3EE',
    additive: num('--field-additive', 1) === 1,
    fieldOpacity: num('--field-opacity', 1),
    dimFloor: num('--card-dim-floor', 0.22),
    surface: rgb('--surface-rgb', '#15151D'),
    accent: rgb('--accent-rgb', '#FF8904'),
  };
};

export default function useThemeTokens() {
  const [tokens, setTokens] = useState(read);

  useEffect(() => {
    const update = () => setTokens(read());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return tokens;
}
