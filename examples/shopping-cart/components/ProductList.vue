<template>
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price | currency }}
      <br>
      <button
        :disabled="!p.inventory"
        @click="addToCart(p)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: mapActions([
    'addToCart' // 顶层action的函数
  ]),
  created () { // 组件创建时执行，触发 products 里的获取商品列表的方法
    this.$store.dispatch('getAllProducts')
  }
}
</script>
