// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取用户的收货地址
  getAdress(){
    // 获取权限状态
    wx.getSetting({
      success: (result) => {
        console.log(result)
        // 当属性名比较怪异的时候，需要使用p[] 获取属性值
        const scopeAddress = result.authSetting["scope.address"]
        // treu 或者undefined  直接调用地址接口 
        // false 说明用户曾经拒绝过  则需要 手动打开 地址授权
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
              success: (result1)=>{
                console.log(result1)
              }
          });

        }else {
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3)=>{
                  console.log(result3)
                }
              });
            }
          });
        }
      }
    });


    



  
  }


  // getCartInfo(){
  //   const cart = wx.getStorageSync('cart');
  //   if(cart) {
  //     this.cartInfo = cart
  //   }else {
      
  //   }
    
  // }
})