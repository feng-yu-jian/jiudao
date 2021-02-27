import {
  HTTP
} from '../util/http-p.js'

class KeyworldModel extends HTTP {
  key = 'q'
  maxLength = 10

  //获取搜索历史
  getHistory() {
    let words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }

  //获取热门推荐
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  //加入缓存
  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export {
  KeyworldModel
}