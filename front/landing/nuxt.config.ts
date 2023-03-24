// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        dir: "rtl",
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api",
    },
  },
  css: ["~/assets/css/main.css"],
});
