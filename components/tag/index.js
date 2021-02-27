Component({
  options: {
    multipleSlots: true
  },

  properties: {
    text:String
  },

  externalClasses: ['tag-class'],

  methods: {
    //监听并修改tag的text属性值
    onTap:function(event){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})