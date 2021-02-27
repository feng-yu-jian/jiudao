Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    LeftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    RightSrc: 'images/triangle@right.png'
  },

  methods: {
    onLeft: function(event) {
      if (!this.properties.laster) {
        this.triggerEvent('left', {}, {})
      }
    },
    onRight: function(event) {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})