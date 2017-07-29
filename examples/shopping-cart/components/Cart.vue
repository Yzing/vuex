<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li v-for="p in products">
        {{ p.title }} - {{ p.price | currency }} x {{ p.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts', // products被混合为计算属性，cartProducs为引用的函数，即store里的getters下的函数
      checkoutStatus: 'checkoutStatus' // 引用cart.getters.checkoutStatus
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0) // 详见ES6 reduce 函数,动态计算总价
    }
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('checkout', products)
    }
  }
}
</script>
