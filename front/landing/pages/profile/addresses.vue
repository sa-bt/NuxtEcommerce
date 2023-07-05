<template>
  <ProfileAddressCreate/>
</template>
<script setup>
const { data: user } = await useFetch("/api/profile/info", {
  headers: useRequestHeaders(["cookie"]),
});
console.log(user.value);
function edit(formData) {
  console.log(formData);
}
</script>
