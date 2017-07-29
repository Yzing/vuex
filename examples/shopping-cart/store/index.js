import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import products from './modules/products'
import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex) // 将store注入所有vue组件

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters, // 添加actions 和 getters
  modules: {
    cart,
    products
  }, // 引入模组，引入了里面的state、actions、getters、mutations
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
