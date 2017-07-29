import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [] // product list
}

// getters
const getters = {
  allProducts: state => state.all // 返回商品列表
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => { // 调用shop的取商品列表函数，传入参数为一个commit，触发mutations
      commit(types.RECEIVE_PRODUCTS, { products }) // commit 在shop里发生，products即为shop里的_products
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  }, // 提交后，state里的all即为获取的商品列表

  // 将商品加入购物车，商品列表数量自减即可
  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
