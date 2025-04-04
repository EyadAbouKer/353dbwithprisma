module.exports = {
    content: [
      "./pages/**/*.{js,jsx}",
      "./components/**/*.{js,jsx}",
      "./app/**/*.{js,jsx}",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          fadeInOut: {
            '0%': { opacity: '0', transform: 'translateY(-20px)' },
            '10%': { opacity: '1', transform: 'translateY(0)' },
            '90%': { opacity: '1', transform: 'translateY(0)' },
            '100%': { opacity: '0', transform: 'translateY(-20px)' }
          }
        },
        animation: {
          'fade-in-out': 'fadeInOut 3s ease-in-out'
        }
      }
    },
    plugins: [],
  };
