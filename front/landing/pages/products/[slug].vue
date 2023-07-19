<template>
<h1>salam</h1>

</template>
<script setup>
const route=useRoute();
const {public:{apiBase}}=useRuntimeConfig();
const{data:product}=useFetch(`${apiBase}/products/${route.params.slug}`);
console.log(product.value)

</script>