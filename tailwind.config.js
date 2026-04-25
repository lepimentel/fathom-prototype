/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--color-bg) / <alpha-value>)',
          deep: 'rgb(var(--color-bg-deep) / <alpha-value>)',
        },
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
        },
        ink: {
          primary: 'rgb(var(--color-ink-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-ink-secondary) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'accent-glow': '0 0 24px -4px rgb(var(--color-accent) / 0.5)',
        'accent-glow-lg': '0 0 60px -10px rgb(var(--color-accent) / 0.6)',
        'accent-glow-sm': '0 0 24px -6px rgb(var(--color-accent) / 0.6)',
        'accent-ring': '0 0 0 3px rgb(var(--color-accent) / 0.08)',
      },
    },
  },
  plugins: [],
};
