<template>
  <ClientOnly>
    <div class="d-flex align-items-center">
      <div v-if="!showResendButton" class="mt-3 me-3" style="direction: ltr">
        <vue-countdown
          :transform="transformSlotProps"
          :time="6 * 1000"
          @end="endCounter"
          v-slot="{ minutes, seconds }"
        >
          {{ minutes }} : {{ seconds }}
        </vue-countdown>
      </div>
      <button v-else class="btn btn-dark">ارسال مجدد کد</button>
    </div>
  </ClientOnly>
</template>
<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";

const showResendButton=ref(false);
function transformSlotProps(props) {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
}

function endCounter(){
showResendButton.value=true;
}
</script>
