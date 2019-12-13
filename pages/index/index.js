// 导入封装好的方法   导入方法文件名补全
import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],  // 轮播图
    cateList:[],  // 分类导航
    floorList:[]  // 楼层
  },
  /**
   * 页面的初始数据
   */

  getSwiperList(){
    // let _this = this
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success(res) {
    //     console.log(res)        
    //     // let {message, meta} = res.data

    //     _this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // })

    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     console.log(result)
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });

    // 使用写好的封装方法来调用接口
    request({
      url:"/home/swiperdata"
    }).then(result=>{
      const {message, meta} = result.data
      if(meta.status === 200) {
        this.setData({
          swiperList: message
        })
      }
      
    })

  },
   getCateList(){


    // request({
    //   url:"/home/catitems"
    // }).then(result=>{
    //   const {message, meta} = result.data
    //   if(meta.status === 200) {
    //     this.setData({
    //       cateList: message
    //     })
    //   }
      
    // })
  },
  getFloorList(){
    request({
      url:"/home/floordata"
    }).then(result=>{
      console.log(result)
      const {message, meta} = result.data
      if(meta.status === 200) {
        this.setData({
          floorList: message
        })
      }
      
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },

})