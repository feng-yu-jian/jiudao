Component({
  options:{
    multipleSlots:true
  },
  
  properties: {
    openType:{
      type:String
    }
  },

  methods: {
    onGetUserInfo(event){
      this.triggerEvent('getuserinfo',event.detail,{});
    }
  }
})