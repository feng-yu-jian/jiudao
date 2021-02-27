Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number
    },
    readOnly:{
      type:Boolean
    }
  },

  data: {
    yesSrc: "images/like.png",
    noSrc: "images/like@dis.png"
  },
  
  methods: {
    onLike: function() {
      if (this.properties.readOnly){
        return
      }
      var like = this.properties.like;
      var count = this.properties.count;
      count = like ? count-1 : count+1;
      this.setData({
        count: count,
        like: !like
      })
      let behavior = this.properties.like ? 'like' : 'cancel';
      // 自定义事件
      this.triggerEvent('like',{
        behavior:behavior
      },{})
    }
  }
})