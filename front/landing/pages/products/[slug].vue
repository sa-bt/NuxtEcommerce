<template>
  <!-- food section -->
  <section class="single_page_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <div class="row gy-5">
            <div class="col-sm-12 col-lg-6">
              <h3 class="fw-bold mb-4">{{ product.data.name }}</h3>
              <h5 class="mb-3" v-if="product.data.is_sale">
                <del>{{ numberFormat(product.data.price) }}</del>
                {{ numberFormat(product.data.sale_price) }} تومان
                <div class="text-danger fs-6">
                  {{ salePercent(product.data.price, product.data.sale_price) }}% تخفیف
                </div>
              </h5>
              <h5 class="mb-3" v-else>
                {{ numberFormat(product.data.price) }} تومان
              </h5>
              <p>{{ product.data.description }}</p>

              <div class="mt-5 d-flex">
                <button class="btn-add" @click="addToCart(product.data)">افزودن به سبد خرید</button>
                <div class="input-counter ms-4" >
                                    <span class="plus-btn" @click="()=>quantity<product.data.quantity && quantity++">
                                        +
                                    </span>
                  <div class="input-number">{{ quantity }}</div>
                  <span class="minus-btn" @click="()=>quantity>1  && quantity--">
                                        -
                                    </span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-lg-6">
              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="0" class="active" aria-current="true"
                          aria-label="Slide 1"></button>
                  <button type="button" v-for="(image,index) in product.data.images"
                          data-bs-target="#carouselExampleIndicators"
                          :data-bs-slide-to="`${index+1}`"></button>

                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="/images/preloader.png" class="d-block w-100" v-img="product.data.primary_image"
                         width="465" height="310">
                  </div>
                  <div class="carousel-item" v-for="(image,index) in product.data.images" :key="index">
                    <img src="/images/preloader.png" class="d-block w-100" alt="..." v-img="image.image" width="465"
                         height="310">
                  </div>
                </div>
                <button class="carousel-control-prev" type="button"
                        data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button"
                        data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end food section -->

  <hr>

  <section class="food_section my-5">
    <div class="container">
      <div class="row gx-3">
        <div v-for="(product,index) in randomProduct.data" :key="index" class="col-sm-6 col-lg-3">
          <ProductCard :product="product"/>
        </div>
      </div>
    </div>
  </section>

</template>
<script setup>
import {salePercent} from "~/utils/helper";
import {cartStore} from "~/store/cart";

const cart = cartStore();
const quantity = ref(1)


const route = useRoute();
const {public: {apiBase}} = useRuntimeConfig();
const {data: product} = useFetch(`${apiBase}/products/${route.params.slug}`);
const {data: randomProduct} = useFetch(`${apiBase}/random-products?count=4`);

function addToCart(product){
  cart.remove(product.id);
  cart.addToCart(product,quantity);
}
</script>