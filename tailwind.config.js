module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
