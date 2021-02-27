import {
  ClassicModel
} from '../../models/classic.js'
import{
  BookModel
} from '../../models/book.js'
let classicModel = new ClassicModel()
let bookModel = new BookModel()
Page({
  data: {
    authorized:false,
    userInfo:null,
    bookCount:0,
    classics:[]
  },

  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  getMyFavor(){
    classicModel.getMyFavor(res=>{
      console.log(res)
      this.setData({
        classics:res
      })
    })
  },

  getMyBookCount(){
    bookModel.getMyBookCount().then((res) =>{
      this.setData({
        bookCount:res.count
      })
    })
  },

  // 每次进入我的界面都会调用该函数，点击v-button主要是给getSetting获取用户信息，然后获得授权，才能调用wx.getUserInfo
  userAuthorized(){
    wx.getSetting({
      success:data => {
        console.log(data)
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:data => {
              //console.log(data)
              this.setData({
                authorized:true,
                userInfo:data.userInfo
              })
            }
          })
        }
      }
    })
  },

  // 点击v-button，获取用户信息
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo;
    if (userInfo){
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(){
    wx.navigateTo({
      url: '/pages/course/course',
    })
  }
})