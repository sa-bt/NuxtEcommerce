import {defineStore} from "pinia";
import {useToast} from "vue-toastification";

const toast = useToast();


export const cartStore = defineStore('cart', {

    state: () => {
        return {
            cart: []
        }
    },

    getters: {
        count(state) {
            return state.cart.length
        },
        allItems(state) {
            return state.cart
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
        },
        increment(id) {
            const item = this.cart.find(p => p.id === id);
            if (item) {
                item.qty++;
            }
        },
        decrement(id) {
            const item = this.cart.find(p => p.id === id);
            if (item && item.quantity > 1) {
                item.qty--;
            }
        },
        clear(){
            this.cart=[];
        }
    },

    persist: {
        storage: persistedState.localStorage,
        key: 'shopping-cart'
    }
})