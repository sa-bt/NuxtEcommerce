<template>
  <button :disabled="loading" @click="payment" class="user_option btn-auth mt-4">
    پرداخت
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
  </button>

</template>
<script setup>
import {useToast} from "vue-toastification";

const toast = useToast();
const loading = ref(false);
const props = defineProps(['coupon', 'addressId', 'cart'])

async function payment() {
  if (props.addressId === null || props.addressId === '') {
    toast.error('مقداری برای آدرس وارد نشده است.')
    return
  }
  loading.value = true;
  try {
    const data = await $fetch("/api/cart/payment", {
      method: "POST",
      body: {
        cart: props.cart,
        address_id: props.addressId,
        coupon: props.coupon.code
      },
    });
    await navigateTo(data.url, {external: true})
  } catch (error) {
    toast.error(Object.values(error.data.data.message).flat().toString());

    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>