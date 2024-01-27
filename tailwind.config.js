/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = [
  "red-600",
  "yellow-600",
  "green-600",
  "blue-600",
  "orange-600",
  "amber-600",
  "lime-600",
  "emerald-600",
  "sky-600",
  "indigo-600",
  "purple-600",
  "fuchsia-600",
  "rose-600",
];

export default {
  content: ["./src/**/*.{html,jsx}"],
  safelist: [
    ...colors.map((color) => `bg-${color}`),
    ...colors.map((color) => `text-${color}`),
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['"Raleway"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
