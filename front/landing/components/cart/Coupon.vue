<template>
  <div class="input-group mb-3">
    <input v-model="coupon" type="text" class="form-control" placeholder="کد تخفیف">
    <button @click="checkCoupon" class="input-group-text" id="basic-addon2">اعمال کد
      تخفیف
    </button>
  </div>
</template>
<script setup>
import {useToast} from "vue-toastification";

const coupon = ref('');
const toast = useToast();
const loading = ref(false);

async function checkCoupon() {
  console.log(coupon.value)
  if (coupon.value === null || coupon.value === '') {
    toast.error('مقداری برای کد تخفیف وارد نشده است.')
    return
  }
  try {
    loading.value = true;
    const data = await $fetch("/api/cart/checkCoupon", {
      method: "POST",
      body: {code: coupon.value},
    });
    toast.success("کد تخفیف با موفقیت اعمال شد.");
  } catch (error) {
    toast.error(Object.values(error.data.data.message).flat().toString());

    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>