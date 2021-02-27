import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  data: {
    classic: null,
    // 因为getLatest方法获得的数据是最新一期，所以可以默认first为false，而latest为true
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  onLoad: function(options) {
    // getLatest是异步函数所以不可以直接return
    classicModel.getLatest((res) => {
      // console.log(res)
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onLike: function(event) {
    // console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext: function(event) {
    this._updateClassic('next')
  },

  onPrevious: function(event) {
    this._updateClassic('previous')
  },

  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus: function(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }
})