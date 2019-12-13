import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenu:[] , // 商品分类
    rightCont:[], // 右侧商品
    currentIndex:0 ,// 被点击的左侧菜单
    scrollTop:0  // 点击左侧菜单时右侧滚动到顶部
  },
  cate:[],  // 先放入所有数据


   /**
   * 获取页面数据
   */
  getCateGoods() {
    request({
      url:"/categories"
    }).then(result=>{
      const {message, meta}=result.data
      if(meta.status === 200) {

          // 存数据到本地{time：Date.now(), data:[...]}
          wx.setStorageSync('cates', {time:Date.now(),data:message})


        this.cate = message
        // 构造左侧菜单数据
        let leftMenu = this.cate.map((item,i)=>{

          var obj = {
            cat_deleted: item.cat_deleted,
            cat_id: item.cat_id,
            cat_name: item.cat_name
          }
          return obj
        })

        // 构造右侧数据
        let rightCont = this.cate[0].children


        this.setData({
          leftMenu,
          rightCont
        })


      }
    })

  },
  /**
   * 点击事件
   */
  tapNam(e) {
    // console.log(e)
    const {index} = e.target.dataset
    // 点击的时候也要更新一下右侧内容显示，即更新rightCont
    let rightCont = this.cate[index].children
    this.setData({
      currentIndex: index,
      rightCont,
      scrollTop: 0 ////右侧重新滚动到顶部
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    if(!Cates) {
      this.getCateGoods()
    }else {
      // 定义过期时间
      if(Date.now() - Cates.time >1000*100){
        this.getCateGoods()
      }else {
        this.cate = Cates.data
        let leftMenu = this.cate.map((item, i) => {
          var obj = {
            cat_deleted: item.cat_deleted,
            cat_id: item.cat_id,
            cat_name: item.cat_name
          }
          return obj
        })

        let rightCont = this.cate[0].children
        this.setData({
          leftMenu,
          rightCont
        })
      }
    }

    
  }
})