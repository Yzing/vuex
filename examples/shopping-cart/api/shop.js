/**
 * Mocking client-server processing
 * 提供api接口，暴露两个函数：
 * getProducts (cb) ,传入一个函数cb，设置延迟执行
 * buyProducts (products,cb,errorCb) ,传入商品集对象，函数cb，及异常函数errorCb
 */
const _products = [
  {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
  {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
  {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
]

export default {
  getProducts (cb) {
    setTimeout(() => cb(_products), 100)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      // (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
      //   ? cb()
      //   : errorCb()
      cb()
    }, 100)
  }
}
