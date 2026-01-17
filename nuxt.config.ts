// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      title: "Nuxt test app", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  routeRules: {
    // "/posts": { ssr: false }, // выключен ssr, рендер и кэширование только на клиенте
  },
  // nitro: {
  //   routeRules: {
  //     "/about": { static: true }, // генерация страницы один раз
  //     "/posts/**": { swr: 60 }, // кэш на 60 сек
  //   },
  // },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
});
