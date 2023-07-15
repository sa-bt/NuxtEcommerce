<template>
  <ProfileAddressCreate :provinces="data.provinces" :cities="data.cities"/>
  <hr/>
  <template v-for="address in data.addresses">
    <ProfileAddressEdit :provinces="data.provinces" :cities="data.cities" :address="address"></ProfileAddressEdit>
  </template>
</template>
<script setup>
const {data , refresh} = await useFetch("/api/profile/addresses", {
  headers: useRequestHeaders(["cookie"]),
});
provide('refreshGetAddresses', refresh);
function edit(formData) {
  console.log(formData);
}
</script>
