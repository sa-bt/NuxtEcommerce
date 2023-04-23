<template>
    
    <section class="card-area layout_padding">
        <div class="container">
            <div class="row gy-5">
                <div v-for="product in products" :key="product.id" class="col-md-4 col-sm-6 col-xs-6">
                    <div class="card text-center">
                        <div class="card-body">
                            <div class="card-icon-wrapper">
                                <i class="bi bi-telephone-fill fs-2 text-white card-icon"></i>
                            </div>
                            <p class="card-text fw-bold">لورم ایپسوم متن ساختگی</p>
                            <p class="card-text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
                                از طراحان گرافیک است. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import {Tabs, Tab} from 'vue3-tabs-component';

const {
  public: { crmApiBase },
} = useRuntimeConfig();
const { data:products, error } = await useFetch(`${crmApiBase}/subjects`);
// console.log(products);
</script>
