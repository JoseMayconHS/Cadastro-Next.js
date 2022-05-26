module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    {
      pattern: /from-(red|green|blue|gray)-400/,
    },
    {
      pattern: /to-(red|green|blue|gray)-700/,
    },
  ],
  theme: {
    extend: {
      keyframes: {
        zoom: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        showing: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        zoom: 'zoom 1s ease-in-out forward',
        showing: 'showing 1s ease-in-out forward',
      }
    },
  },
  plugins: [],
}
