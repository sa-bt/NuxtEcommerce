import {defineStore} from "pinia";
import {useToast} from "vue-toastification";

const toast = useToast();


export const cartStore = defineStore('cart', {
    state: () => {
        return {
            cart: []
        }
    },
    actions: {
        addToCart(product, count) {
            this.cart.push({
                ...product,
                qty: count
            })
            console.log( this.cart)
            toast.success("محصول با موفقیت به سبد خرید اضافه شد.")
        }
    }
})