<template>
  <div class="input-group mb-3">
    <input v-model="coupon" type="text" class="form-control" placeholder="کد تخفیف">
    <button @click="checkCoupon" :disabled="loading" class="input-group-text" id="basic-addon2">اعمال کد
      تخفیف
      <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    </button>
  </div>
</template>
<script setup>
import {useToast} from "vue-toastification";

const coupon = ref('');
const toast = useToast();
const loading = ref(false);
const props = defineProps(['coupon'])

async function checkCoupon() {
  console.log(coupon.value)
  if (coupon.value === null || coupon.value === '') {
    toast.error('مقداری برای کد تخفیف وارد نشده است.')
    return
  }
  loading.value = true;
  try {
    const data = await $fetch("/api/cart/checkCoupon", {
      method: "POST",
      body: {code: coupon.value},
    });
    props.coupon.code = coupon.value;
    props.coupon.percent = data.percentage;
    toast.success("کد تخفیف با موفقیت اعمال شد.");
  } catch (error) {
    toast.error(Object.values(error.data.data.message).flat().toString());

    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>