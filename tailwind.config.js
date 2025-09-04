/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'hsl(220, 25%, 95%)',
        'accent': 'hsl(170, 60%, 45%)',
        'primary': 'hsl(230, 70%, 55%)',
        'surface': 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(220, 25%, 20%)',
        'text-secondary': 'hsl(220, 25%, 45%)',
        'gradient-from': '#4338ca',
        'gradient-via': '#7c3aed',
        'gradient-to': '#ec4899',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      spacing: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 25%, 20%, 0.1)',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #553c9a 50%, #7c3aed 75%, #a855f7 100%)',
      },
    },
  },
  plugins: [],
}
