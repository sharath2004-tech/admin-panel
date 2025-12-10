/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundColor: {
        "main-bg": "#fef2f2",
        // "main-dark-bg": "#161c24",
        "main-dark-bg": "#1a1414",
        // "secondary-dark-bg": "#2b343b",
        "secondary-dark-bg": "#2d1f1f",

        "light-gray": "#F7F7F7",
        "half-transparent": "#fef2f2",
        "blue-bg": "#DC2626",
      },
      colors: {
        "main-color": "#DC2626",
        "secondary-color": "#ef4444",
        "dark-gray": "#2d1f1f",
        "light-gray": "#1c1c1c",
        "dark-color": "#7f1d1d",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
