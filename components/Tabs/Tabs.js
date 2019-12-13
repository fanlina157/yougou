// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父组件传过来的值,与data 一样，直接使用
    tabs:{
      type:Array,
      value:[]
    }
  },



  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 组件里的点击事件  要触发父组件的自定义事件并携带index
    clickSonCom(e) {
      console.log(e)
      const { index } = e.currentTarget.dataset
      this.triggerEvent('changeParent',{index})
    },

  }
})
