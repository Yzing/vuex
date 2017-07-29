// 顶层getters，用于获取cart里的商品信息，传入一个state对象，遍历state里已购商品列表的所有信息，并返回名称价格和数量，返回一个数组
export const cartProducts = state => {
  return state.cart.added.map(({ id, quantity }) => {
    const product = state.products.all.find(p => p.id === id)
    // 注意，最终的商品信息是在所有商品列表里取的，只有返回的数量是已购商品列表里的数量，保证信息的规范性
    return {
      title: product.title,
      price: product.price,
      quantity
    }
  })
}
