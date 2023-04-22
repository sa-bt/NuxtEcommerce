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
      crmApiBase: "http://172.17.0.1:8081/api",
    },
  },
  css: ["~/assets/css/main.css"],

  build:{
    transpile:['vue-toastification']
  }
});
