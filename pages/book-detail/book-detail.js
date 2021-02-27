import { 
  BookModel 
} from '../../models/book.js'
import { 
  LikeModel 
} from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
      icon:'none'
    })
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComment(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    
    // 优化代码 
    Promise.all([detail,comments,likeStatus]).then(res=>{
      // console.log(res)
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })

    // const detail = bookModel.getDetail(bid).then(res=>{
    //   this.setData({
    //       book:res
    //   })
    //   console.log(res)
    // })

    // const comments = bookModel.getComment(bid).then(res=>{
    //   this.setData({
    //       comments:res.comments
    //   })
    //   console.log(res)
    // })

    // const likeStatus = bookModel.getLikeStatus(bid).then(res=>{
    //   this.setData({
    //       likeStatus:res.like_status,
    //       likeCount:res.fav_nums
    //   })
    //   console.log(res)
    // })
  },

  // 点赞书籍
  onLike:function (event){
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.book.id,400)
  },

  //输入短评页面
  onFakePost:function(event){
     this.setData({
       posting:true
     })
     console.log(this.data.posting)
  },

  //关闭短评页面
  onCancel:function(event){
    this.setData({
      posting:false
    })
  },

  //点击提交短评方法
  onPost(event){
    // console.log(event)
    const comment = event.detail.text || event.detail.value

    if(!comment){
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短片最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      //更新短评
      this.setData({
        comments: this.data.comments,
        posting:false
      })
    })
  }
})