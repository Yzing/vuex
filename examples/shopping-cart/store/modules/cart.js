import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  added: [], // 储存添加的内容
  checkoutStatus: null // 储存checkout状态
}

// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus
} // 暴露checkout状态

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.added]
    commit(types.CHECKOUT_REQUEST)
    shop.buyProducts(
      products,
      () => commit(types.CHECKOUT_SUCCESS),
      () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
    )
  }
} // 用savedCartItems 保存已购商品，进行事件commit，调用api接口，传入成功时和失败时的事件调用

// mutations
const mutations = {
  // 在products里触发ADD_TO_CART事件后，cart里也会被触发
  [types.ADD_TO_CART] (state, { id }) {
    state.lastCheckout = null
    const record = state.added.find(p => p.id === id) // 查询此商品是否在购物车中已有记录，record指向added里的具体商品
    if (!record) {
      state.added.push({
        id,
        quantity: 1
      })// 若没有，就加一条记录
    } else {
      record.quantity++ // 若有记录，数量自增
    }
  },

  // 做事件请求，现将状态清空
  [types.CHECKOUT_REQUEST] (state) {
    // clear cart
    state.added = []
    state.checkoutStatus = null
  },

  // 成功时返回状态
  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },

  // 失败时，返回状态并且恢复已购商品列表
  [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
    // rollback to the cart saved before sending the request
    state.added = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
