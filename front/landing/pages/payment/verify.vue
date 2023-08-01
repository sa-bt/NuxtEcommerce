<template>
  <client-only>
    <section class="auth_section ">
      <div class="container">
        <div class="row mt-5">
          <div class="col-md-5 offset-md-4">
            <div class="card">
              <div class="card-body">
                <div class="text-center mb-5">
                  <template v-if="payment.status">
                    <i class="bi bi-check-circle-fill text-success fs-1"></i>
                    <h5 class="mt-3 text-success">پرداخت شما با موفقیت انجام شد</h5>
                    <h6 class="mt-3">شماره پیگیری : <span>{{ payment.transId }}</span></h6>
                  </template>
                  <template v-else>
                    <i class="bi bi-x-circle-fill text-danger fs-1"></i>
                    <h5 class="text-danger mt-3">{{ payment.error }}</h5>
                  </template>
                </div>
                <div class="d-flex justify-content-between">
                  <NuxtLink v-if="payment.status" to="/profile/orders" class="btn btn-primary">مشاهده سفارش</NuxtLink>
                  <NuxtLink v-else to="/cart" class="btn btn-primary">مشاهده سفارش</NuxtLink>
                  <NuxtLink to="/" class="btn btn-dark">بازگشت به سایت</NuxtLink>
                </div>

                <!-- <i class="bi bi-x-circle-fill text-danger fs-1"></i> -->

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <template #fallback>
      <div class="cart-loading">
        <div class="spinner-border spinner-border-sm ms-2 cart-spiner"></div>
      </div>
    </template>
  </client-only>
</template>
<script setup>
import {cartStore} from "~/store/cart";

definePageMeta({middleware: 'auth'})
const {public: {apiBase}} = useRuntimeConfig();
const route = useRoute();
const errors = ref([]);
const payment = ref(null);
const cart = cartStore();
if (process.client) {
  try {
    const data = await $fetch(`${apiBase}/payment/verify`, {
      method: 'POST',
      body: route.query
    })
    payment.value = data.data;
    if (payment.value.status){
      cart.clear();
    }
  } catch (error) {
    errors.value = Object.values(error.data.message).flat();
  }
}
</script>