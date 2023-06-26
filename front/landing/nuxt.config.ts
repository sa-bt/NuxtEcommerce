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
      apiBase: "http://172.17.0.1:8082/api",
      crmApiBase: "http://172.17.0.1:8081/api",
    },
  },
  css: ["~/assets/css/main.css"],

  modules: ['@formkit/nuxt'],

  build:{
    transpile:['vue-toastification']
  }
});
