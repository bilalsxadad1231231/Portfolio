/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        border: "var(--color-border)",
        diffcolor: "var(--color-diffcolor)",

        // Latent-space palette, themed. Channel triplets rather than hex so
        // opacity modifiers (bg-void/80, text-fog/60) still resolve.
        void: "rgb(var(--void-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        bone: "rgb(var(--bone-rgb) / <alpha-value>)",
        fog: "rgb(var(--fog-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        onAccent: "rgb(var(--on-accent-rgb) / <alpha-value>)",
        glow: "rgb(var(--glow-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Clash Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'rise-slow': 'rise 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
      },
    },
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [],
}

