<template>
  <div @click="deleteAddress" class="btn btn-dark">حذف</div>
  <div
      v-if="loading"
      class="spinner-border spinner-border-sm ms-2">
  </div>

</template>
<script setup>
import {useToast} from "vue-toastification";
import {reset} from "@formkit/core"

const props = defineProps(['addressId']);
const loading = ref(false);
const errors = ref([]);
const toast = useToast();

async function deleteAddress() {
  try {
    loading.value = true;
    errors.value = [];
    await $fetch("/api/profile/addresses/delete", {
      method: "POST",
      body: {address_id: props.addressId}
    });

    toast.success("آدرس با موفقیت حذف شد.");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }


}

</script>
<style scoped>

</style>