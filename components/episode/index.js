Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    // 期刊号 
    index: {
      type: String,
      observer: function(newVal, oldVal) {
        // 注意使用_index时，你组件的{{}}中调用的也必须是{{_index}}而不是{{index}}
        let val = newVal < 10 ? '0'+newVal : newVal
        this.setData({
          _index: val  // 不要改变 properties 里面的值，比如index本身(index: val)，如果是别的值，可能造成无限递归调用，造成内存泄漏
        })
      }
    }
  },

  data: {
    months:[
    '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
    ],
    year: 0,
    month: '',
    _index:''
  },
  // 这里不使用 created 生命周期的原因是因为  在组件实例刚刚被创建时执行  还不能setData
  attached: function () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year: year,
      month: this.data.months[month]
    })
  }
})