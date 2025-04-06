// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: "JobNest",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "description",
          content: "JobNest helps you organize your job search journey. Keep track of application details all in one place. Never miss an opportunity again.",
        },
      ],
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
});
