<template>
  <NuxtLayout name="profile">
    <NuxtPage/>
  </NuxtLayout>
</template>
<script >

definePageMeta({
  middleware: "auth",
});
</script>
