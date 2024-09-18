/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./dist/**/*.css"],
  theme: {
    extend: {
      colors: {
        freshlime: "rgba(179, 255, 82, 1)", // Fresh Lime
        mystic: "rgba(239, 101, 255, 1)", // Mystic Orchid
        // black: "rgba(3, 4, 3, 1)", // Black
      },
    },
  },
  plugins: [],
};
