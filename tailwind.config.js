/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Все возможные пути
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',

    // Для Nuxt
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}