export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("img", function (el, url) {
    // console.log(el,url.value);
    let img = new Image();
    img.src = url.value;
    img.onload = function () {
      el.src = url.value;
      el.classList.add('fade-in-image');
    };
  });
});
