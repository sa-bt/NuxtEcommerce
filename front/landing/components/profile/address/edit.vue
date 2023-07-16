<template>

  <FormKit
      type="form"
      @submit="edit"
      #default="{value}"
      :incomplete-message="false"
      :actions="false"
  >
    <div class="card card-body">
      <div v-if="errors.length > 0" class="alert alert-danger">
        <ul class="mb-0">
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="row g-4">
        <div class="col col-md-6">
          <FormKit
              type="text"
              name="title"
              id="title"
              label="عنوان"
              :value="props.address.title"
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
              :value="props.address.cellphone"
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
              :value="props.address.postal_code"
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
        <ClientOnly fallback-tag="span" fallback="در حال بارگذاری ...">
          <div class="col col-md-6">
            <FormKit
                type="select"
                name="province_id"
                id="province_id"
                label="استان"
                label-class="form-label"
                input-class="form-control"
                validation="required"
                :value="props.address.province_id"
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
                :value="props.address.city_id"
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
        </ClientOnly>
        <div class="col col-md-12">
          <FormKit
              type="textarea"
              name="address"
              id="address"
              label="آدرس"
              :value="props.address.address"
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
      </div>
      <div class="d-flex justify-content-between mt-4">

        <FormKit
            type="submit"
            input-class="btn btn-primary">ویرایش
          <div
              v-if="loading"
              class="spinner-border spinner-border-sm ms-2">
          </div>
        </FormKit>
        <ProfileAddressDelete :addressId="props.address.id"/>


      </div>
    </div>

  </FormKit>
  <hr>

</template>
<script setup>
import {useToast} from "vue-toastification";
import {reset} from "@formkit/core"

const props = defineProps(['provinces', 'cities', 'address'])
const cityEl = ref(null);
const loading = ref(false);
const errors = ref([]);
const toast = useToast();

async function edit(formData) {
  try {
    loading.value = true;
    errors.value = [];
    await $fetch("/api/profile/addresses/edit", {
      method: "POST",
      body: {...formData, address_id: props.address.id}
    });

    toast.success("آدرس با موفقیت ویرایش شد.");
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