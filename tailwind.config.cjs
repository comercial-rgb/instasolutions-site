/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        azulTech: '#005BED',
        azulCorp: '#251C59',
        bgPill: '#F3F6FF',
        borderPill: '#D6E2FF',
      },
    }
  },
  plugins: []
};
