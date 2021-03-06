module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      keyframes: {
        "wiggle-small": {
          '0%, 100%': {
            transform: 'rotate(-1deg)'
        },
        '50%': {
            transform: 'rotate(1deg)'
        },
        },
        wiggle: {
            '0%, 100%': {
                transform: 'rotate(-3deg)'
            },
            '50%': {
                transform: 'rotate(3deg)'
            },
        }
      },
      animation: {
          wiggle: 'wiggle 0.2s ease-in-out',
          "wiggle-small": 'wiggle-small 0.2s ease-in-out',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
