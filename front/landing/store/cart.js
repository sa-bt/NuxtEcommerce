import {defineStore} from "pinia";
import {useToast} from "vue-toastification";

const toast = useToast();


export const cartStore = defineStore('cart', {

    state: () => {
        return {
            cart: []
        }
    },

    getters:{
    count(state){
        return this.cart.length
    }
    },

    actions: {
        addToCart(product, count) {
            this.cart.push({
                ...product,
                qty: count
            })
            toast.success("محصول با موفقیت به سبد خرید اضافه شد.")
        },
        remove(id) {
            this.cart = this.cart.filter(p => p.id !== id)
        }
    },

    persist: {
        storage: persistedState.localStorage,
        key: 'shopping-cart'
    }
})