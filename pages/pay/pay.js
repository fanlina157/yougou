
import { showToast } from '../../utils/asyncWx.js'
import { request } from "../../request/index.js"
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

  // 企业账号才有支付功能
  // 企业账号的小程序后台中，必须给开发者添加白名单
      // 1. 一个appid 可以绑定多个开发者，
      // 2.流程： 
      // ====>创建订单(订单编号)
      // ====> 获取用户登录成功返回的token(没有token需要登录)
      // ====> 获取用户登录信息拿到参数，传参，才能拿到token(button open-type) ----授权 页面
      // ====>准备预支付（获取支付参数pay）
      // ====>发起微信支付（提交参数pay）
      // ====>查询订单
  orderPay(){
    const {token} =wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
      return;
    }
    console.log('已经存在tokenl ')


    // 1.创建订单


    // // 请求头：
    // const header = {Authorization:token}
    // // 请求体：
    // const order_price= this.data.totalPrice,
    // const consignee_addr= '',
    // const cart = this.data.cart
    // let goods = []
    // cart.forEach(v=>goods.push({
    //   goods_id: v.goods_id,
    //   goods_number: v.goods_number,
    //   goods_price: v.goods_price
    // }))
    // const params = {
    //   order_price, consignee_addr,goods
    // }
    // // 带请求头的请求

    // request({
    //   url:'/orders/create',
    //   method:'post',
    //   data: params,
    //   header:header
    // }).then(res=>{
    //   // 拿到订单编号
    //   const { order_number} = res


    //   // 2. 预支付接口

    //   request({
    //     url: '/my/orders/req_unifiedorder',
    //     method: 'post',
    //     data: {order_number},
    //     header: header
    //   }).then(res => {
    //     // 拿到支付参数
    //     console.log(res)
    //     // 这里的参数，用作微信支付 

    //     // 3. 支付
    //     wx.requestPayment({
    //       timeStamp: '',
    //       nonceStr: '',
    //       package: '',
    //       signType: 'MD5',
    //       paySign: '',
    //       success(res) { },
    //       fail(res) { }
    //     })

    //     // 4. 查询订单状态
    //     request({
    //       url: '/my/orders/chkOrder',
    //       method: 'post',
    //       data: { order_number },
    //       header: header
    //     }).then(res => {
    //       // 成功之后，弹窗，跳转order页面 ，这里参考 async  await  使用try ...catch
    //     })






      // })



    // })


  }

})