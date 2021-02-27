import {
  KeyworldModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behaviors/pagination.js'

const keyworldModel = new KeyworldModel()
const bookModel = new BookModel()

Component({
  // options: {
  //   multipleSlots: true
  // },
  behaviors: [paginationBev],
  properties: {
    more:{
      type: String,
      observer: 'loadMore'
    }
  },

  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    q:'',
    loadingCenter:false
  },
  
  attached: function() {
    this.setData({
      historyWords: keyworldModel.getHistory()
    })

    keyworldModel.getHot().then(res=>{
      this.setData({
        hotWords:res.hot
      })
    })
  }, 

  methods: {
    // 搜索
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      // this.initialize()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0,q).then(res=>{
        bookModel.search(0,q).then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
        })
        // console.log(this.data.dataArray)
        keyworldModel.addToHistory(q)
        this._hideLoadingCenter();
      })
    },

    // 关闭搜索
    onCancel() {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    // 清空搜索
    onDelete(){
      this.initialize()
      this._closeResult()
      // console.log(this.data.dataArray,this.data.q)   
    },
    // 解决两个问题：
    // 1. 下拉加载更多的时候，所有数据请求完了之后，发起了没有必要的请求 解决方法是当请求到的所有数据大于或等于总数据条数就不要发送请求了
    // 2. 初始话后，快速的下拉加载更多会加载重复的请求 解决方法是通过 loading: false / true 来控制请求数据，
     //   当数据正在请求的时候，不能发送下一次请求
    loadMore() {
      // console.log(loadMore)
      //第一次加载不执行
      if(!this.data.q){
        return
      }
      if (this.isLocked()){
        return
      }
      //const length = this.data.dataArray.length;
      if(this.hasMore()){
        //this.data.loading = true;
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          //console.log(res);
          //let tempArray = this.data.dataArray.concat(res.books);
          this.setMoreData(res.books);
          //this.data.loading = false;
          this.unLocked();
          // 第二个函数是请求失败回调的
        },() => {
          this.unLocked();
        })
      }
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },

    _showResult(){
      this.setData({
        searching: true
      })
    },

    _closeResult(){
      this.setData({
        searching: false,
        q:''
      })
    }
  }
})