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
      <form @submit.prevent="checkOtp">
        <div class="mb-3">
          <label for="otp" class="form-label">کد اعتبارسنجی</label>
          <input type="text" class="form-control" id="otp" v-model="otp" />
        </div>
        <button type="submit" class="btn btn-primary btn-auth">
          تایید
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

const otp = ref("");
const toast = useToast();
const errors = ref([]);
const loading = ref(false);
const { authUser } = useAuth();

async function checkOtp() {
  console.log(otp.value);
  if (otp.value == "") {
    toast.error("کد اعتبارسنجی الزامی است");
    return;
  }
  const pattern = /^[0-9]{6}$/;

  if (!pattern.test(otp.value)) {
    toast.error("فرمت کد اعتبارسنجی نامعتبر است");
    return;
  }
  try {
    loading.value = true;
    const data = await $fetch("/api/auth/checkOtp", {
      method: "POST",
      body: { otp: otp.value },
    });
    toast.success("با موفقیت وارد شدید.");
    authUser.value = data;
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();

    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
