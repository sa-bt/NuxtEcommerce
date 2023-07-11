<template>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    ایجاد آدرس جدید
  </button>
  <div class="collapse mt-3" id="collapseExample">
    <div class="card card-body">
      <div v-if="errors.length > 0" class="alert alert-danger">
        <ul class="mb-0">
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <FormKit
          type="form"
          @submit="create"
          #default="{value}"
          :incomplete-message="false"
          :actions="false"
      >
        <div class="row g-4">
          <div class="col col-md-6">
            <FormKit
                type="text"
                name="title"
                id="title"
                label="عنوان"
                label-class="form-label"
                input-class="form-control"
                validation="required"
                :validation-messages="{
              required: 'فیلد عنوان الزامی است',
            }"
                message-class="form-text text-danger"
            ></FormKit>

          </div>
          <div class="col col-md-6">
            <FormKit
                type="text"
                name="cellphone"
                id="cellphone"
                label="شماره تماس"
                label-class="form-label"
                input-class="form-control"
                :validation="[['required'],['matches',/^(\+98|0)?9\d{9}$/]]"
                :validation-messages="{
              required: 'فیلد شماره تماس الزامی است',
              matches: 'فیلد شماره تماس معتبر نمی باشد',
            }"
                message-class="form-text text-danger"
            ></FormKit>
          </div>
          <div class="col col-md-6">

            <FormKit
                type="text"
                name="postal_code"
                id="postal_code"
                label="کدپستی"
                label-class="form-label"
                input-class="form-control"
                :validation="[['required'],['matches',/^\d{5}[ -]?\d{5}$/i]]"
                :validation-messages="{
              required: 'فیلد کدپستی الزامی است',
              matches: 'فیلد کدپستی معتبر نمی باشد',
            }"
                message-class="form-text text-danger"
            ></FormKit>
          </div>
          <div class="col col-md-6">
            <FormKit
                type="select"
                name="province_id"
                id="province_id"
                label="استان"
                label-class="form-label"
                input-class="form-control"
                validation="required"
                @change="changeProvince"
                :validation-messages="{
              required: 'فیلد استان الزامی است',
            }"
                message-class="form-text text-danger"
            >
              <option v-for="province in props.provinces" :key="province.id" :value="province.id">
                {{ province.name }}
              </option>

            </FormKit>
          </div>
          <div class="col col-md-6">

            <FormKit
                type="select"
                name="city_id"
                id="city_id"
                label="شهر"
                ref="cityEl"
                label-class="form-label"
                input-class="form-control"
                validation="required"
                :validation-messages="{
              required: 'فیلد شهر الزامی است',
            }"
                message-class="form-text text-danger"
            >
              <option v-for="city in props.cities.filter((item)=>item.province_id==value.province_id)" :key="city.id"
                      :value="city.id">
                {{ city.name }}
              </option>
            </FormKit>
          </div>
          <div class="col col-md-12">
            <FormKit
                type="textarea"
                name="address"
                id="address"
                label="آدرس"
                rows="5"
                label-class="form-label"
                input-class="form-control"
                validation="required"
                :validation-messages="{
              required: 'فیلد آدرس الزامی است',
            }"
                message-class="form-text text-danger"
            ></FormKit>

          </div>
          <div>
            <FormKit
                type="submit"
                input-class="btn btn-primary mt-4">ایجاد
            </FormKit>
          </div>
        </div>
      </FormKit>

    </div>
  </div>
  <hr>
</template>
<script setup>
import {useToast} from "vue-toastification";

const props = defineProps(['provinces', 'cities'])
const cityEl = ref(null);
const loading = ref(false);
const errors = ref([]);

async function create(formData) {
  try {
    loading.value = true;
    errors.value = [];
    await $fetch("/api/profile/addresses/create", {
      method: "POST",
      body: formData
    });

    toast.success("آدرس با موفقیت ایجاد شد.");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }


}

function changeProvince(el) {
  cityEl.value.node.input(props.cities.find((item) => item.province_id == el.target.value).id);
}
</script>
<style scoped>

</style>