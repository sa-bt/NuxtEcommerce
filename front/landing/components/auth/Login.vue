<template>
  <div class="card-body">
    <div class="form_container">
      <div v-if="errors.length > 0" class="alert alert-danger">
        <ul class="mb-0">
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="cellphone" class="form-label">شماره موبایل</label>
          <input
            type="text"
            class="form-control"
            id="cellphone"
            v-model="cellphone"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-auth">
          ورود
          <div
            v-if="loading"
            class="spinner-border spinner-border-sm ms-2"
          ></div>
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useToast } from "vue-toastification";

const cellphone = ref("");
const toast = useToast();
const errors = ref([]);
const loading = ref(false);

const emit=defineEmits([
    'showCheckOtpForm'
]) 

async function login() {
  if (cellphone.value == "") {
    toast.error("شماره موبایل الزامی است");
    return;
  }
  const pattern = /^(\+98|0)?9\d{9}$/;

  if (!pattern.test(cellphone.value)) {
    toast.error("فرمت شماره موبایل نامعتبر است");
    return;
  }
  try {
    loading.value = true;
    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        cellphone: cellphone.value,
      },
    });
    toast.success("کد اعتبارسنجی برای شما ارسال شد.");
    emit('showCheckOtpForm')
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
