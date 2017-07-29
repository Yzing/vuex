import * as types from './mutation-types'

// 顶层actions，暴露函数addToCart，commit即为store对象的函数，如果商品数量大于0，就提交事件并传入参数对象
export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}
