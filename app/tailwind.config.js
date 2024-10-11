/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
  ["./src/**/*.{html,js}",
  "./app/**/*.{html,js}",
  ],
  theme: {
    colors: {
      'black': '#000000',
      'white': '#ffff',
      'light-green': '#287b3d',
      'dark-green': '#17615b',
      'yellow': '#fdc401',
      'light-gray': '#e6e3d2',
      'red': '#cc0000'
    },
    extend: {
      width: {
        'form': '183px',
        'leaderboard': '139px'
      },
      height: {
        'form': '26px'
      }
    },
  },
  plugins: [],
}

