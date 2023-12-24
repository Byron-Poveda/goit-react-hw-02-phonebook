/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          sans: ['Roboto', ...defaultTheme.fontFamily.sans],
          'rubik': 'rubik',
      },
      colors: {
          'phonebook-indigo': "#4f46e5",
          'phonebook-indigo-dark': "#3730a3",
      },
    },
    screens: {
        sm: "380px",
        // => @media (min-width: 380px) { ... }

        md: "764px",
        // => @media (min-width: 764px) { ... }

        lg: "1200px",
        // => @media (min-width: 1200px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
    },
    fontSize: {
        // 'label': "0.75rem",
    },
  },
  plugins: [],
}