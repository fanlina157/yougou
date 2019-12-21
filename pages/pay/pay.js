
import { showToast } from '../../utils/asyncWx.js'
/***
 * 1. 支付页面是购物车checked  为true 的数据
 * 
 * 
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [], // 购物车数据
    totalPrice: 0, // 总价格
    totalNum: 0 // 总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {

    let cart = wx.getStorageSync('cart') || []

    // 过滤购物车数据
    cart = cart.filter(v=>v.checked)   

    var totalPrice = 0;
    var totalNum = 0;
    cart.forEach(item => {
        totalPrice += item.num * item.goods_price
        totalNum += item.num
    });

    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  } , 


  // 支付
  orderPay(){
    const {token} =wx.getStorageSync('token')
    if(!token)


  }

})