<template>
  <div class="vh-70">
    <h1>salam</h1>
    <FormKit
      type="form"
      @submit="edit"
      :incomplete-message="false"
      :actions="false"
    >
      <div class="row g-4">
        <div class="col col-md-6">
          <FormKit
            type="text"
            name="name"
            id="name"
            label="نام و نام خانوادگی"
            label-class="form-label"
            input-class="form-control"
            validation="required"
            :validation-messages="{
              required: 'فیلد نام و نام خانوادگی الزامی است',
            }"
            message-class="form-text text-danger"
          ></FormKit>
        </div>

        <div class="col col-md-6">
          <FormKit
            type="email"
            name="email"
            id="email"
            label="ایمیل"
            label-class="form-label"
            input-class="form-control"
            validation="required|email"
            :validation-messages="{
              required: 'فیلد ایمیل الزامی است',
              email: 'مقدار وارد شده معتبر نیست',
            }"
            message-class="form-text text-danger"
          ></FormKit>
        </div>

        <div class="col col-md-6">
          <label class="form-label">شماره تلفن</label>
          <input
            type="text"
            disabled
            class="form-control"
            value="09100000000"
          />
        </div>
      </div>
      <FormKit type="submit" input-class="btn btn-primary mt-4">ویرایش</FormKit>
    </FormKit>
  </div>
</template>
<script setup>
function edit(formData) {
  console.log(formData);
}
</script>
