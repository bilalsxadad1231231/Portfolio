import { useTheme } from '../../context/Themecontext';

const THEMES = [
  { id: 'light', label: 'Light', swatch: '#FFFFFF', ring: '#D8D8E0' },
  { id: 'dark', label: 'Dark', swatch: '#0B0B10', ring: '#3A3A4A' },
  { id: 'blue', label: 'Blue', swatch: '#2563EB', ring: '#2563EB' },
];

/** One button that steps through the themes, showing the current one. */
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const index = Math.max(0, THEMES.findIndex((t) => t.id === theme));
  const current = THEMES[index];
  const next = THEMES[(index + 1) % THEMES.length];

  return (
    <button
      onClick={() => setTheme(next.id)}
      aria-label={`Theme: ${current.label}. Switch to ${next.label}.`}
      className="flex items-center gap-2 rounded-full border border-bone/15 py-1 pl-1 pr-3 transition-colors duration-200 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span
        aria-hidden="true"
        className="h-4 w-4 rounded-full border transition-colors duration-200"
        style={{ backgroundColor: current.swatch, borderColor: current.ring }}
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
        {current.label}
      </span>
    </button>
  );
}
