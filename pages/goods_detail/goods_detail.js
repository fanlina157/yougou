import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detail_obj:{}  // 商品详情
  },
  addCartInfo:{},  // 全局存储到Storage  里的商品信息



  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options

    // 把参数传递给函数
    this.getGoodsDetail(goods_id)
  },



  // 获取详情页数据
  getGoodsDetail(goods_id){

    request({
      url:"/goods/detail",
      data:{goods_id}
    }).then(res=>{
      console.log(res)
      const { message, meta } = res.data
      if (meta.status === 200) {
        this.addCartInfo = message
        this.setData({
          goods_detail_obj: message
        })

      }

    })

  },
  // 加入购物车
  // 1. 判断购物车里是否有，有数量num++ 没有num=1   最后数据都要 存储信息到storage
  cartAdd(){
    const cart = wx.getStorageSync('cart') || [];

    // 判断strage 里有没有全局商品信息中的goods_id
    let index = cart.findIndex(v=>v.goods_id===this.addCartInfo.goods_id)


    // let index1 = cartInfo.findIndex(function(v) {
    //   return v.goods_id===this.addCartInfo.goods_id
    // })

    // console.log(index, index1)

    if(index === -1) {
      // 没有
      this.addCartInfo.num =1
      cart.push(this.addCartInfo)
    }else {
      // 有
      cart[index].num++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true
    });
      
  }

})