<template>
  <ProfileAddressCreate :provinces="data.provinces" :cities="data.cities"/>
</template>
<script setup>
const { data } = await useFetch("/api/profile/addresses", {
  headers: useRequestHeaders(["cookie"]),
});
function edit(formData) {
  console.log(formData);
}
</script>
