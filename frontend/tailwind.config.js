/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17202a',
        mist: '#f4f7f8',
        aqua: '#2fb7a4',
        coral: '#f9735b'
      }
    }
  },
  plugins: []
};

