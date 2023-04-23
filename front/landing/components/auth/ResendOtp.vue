<template>
  <ClientOnly>
    <div class="d-flex align-items-center">
      <div v-if="!showResendButton" class="mt-3 me-3" style="direction: ltr">
        <vue-countdown
          :transform="transformSlotProps"
          :time="2 * 1000"
          @end="endCounter"
          v-slot="{ minutes, seconds }"
        >
          {{ minutes }} : {{ seconds }}
        </vue-countdown>
      </div>
      <button v-else class="btn btn-dark" @click="resend">
        ارسال مجدد کد
        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
      </button>
    </div>
  </ClientOnly>
</template>
<script setup>
import { useToast } from "vue-toastification";

import VueCountdown from "@chenfengyuan/vue-countdown";

const showResendButton = ref(false);
const loading = ref(false);
const emit = defineEmits(["resendOtpErrors"]);
const toast = useToast();

function transformSlotProps(props) {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
}

function endCounter() {
  showResendButton.value = true;
}

async function resend() {
  try {
    loading.value = true;

    const data = await $fetch("/api/auth/resendOtp", {
      method: "POST",
    });
    toast.success("کد ورود مجدد برای شما ارسال شد.")
    showResendButton.value = false;
  } catch (error) {
    emit("resendOtpErrors", Object.values(error.data.data.message).flat());
  } finally {
    loading.value = false;
  }
}
</script>
