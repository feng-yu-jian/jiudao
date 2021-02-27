import {
  BookModel
} from '../../models/book.js'
import {
  random
} from '../../util/random.js'

const bookModel = new BookModel()

Page({
  data: {
    books: [],
    searching: false,
    more: ''
  },

  onLoad: function(options) {
    bookModel.getHotList().then(res => {
      this.setData({
        books: res
      })
    })
    // promise 处理回调函数
    // const promise = new Promise((resolve, reject) => {
    //   //使用一个异步操作
    //   wx.getSystemInfo({
    //     success: (res) => {
    //       resolve(res)
    //     },
    //     fail: (error) => {
    //       reject(error)
    //     }
    //   })
    // })
    // promise.then((res) => {
    //   console.log(res)
    // }, (error) => {
    //   console.log(error)
    // })
  },

  onSearching(event) {
    this.setData({
      searching: true
    })
  },
  
  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  onReachBottom() {
    this.setData({
      more: random(16)
    })
  }
})