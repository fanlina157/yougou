
import {showToast} from '../../utils/asyncWx.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[], // 购物车数据
    allchecked:false,  // 全选功能
    totalPrice:0, // 总价格
    totalNum:0 // 总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function() {
    const address = wx.getStorageSync('address')
    console.log(address)

    const cart = wx.getStorageSync('cart') || []
    // 全选功能 
    // every 方法 长度为0 的时候返回值为false ,所以 要对长度进行判断 
    // 数组长度不为0  执行every,  为0 直接返回false

    // const allchecked = cart.length?cart.every(v=>v.checked):false
    // var totalPrice=0;
    // var totalNum = 0;
    // cart.forEach(item => {
    //   if(item.checked) {


    //     totalPrice += item.num * item.goods_price
    //     totalNum += item.num
    //   }
    // });

    // 这样有every  forEach 两次循环
    // 简化


    // let allchecked = true
    // var totalPrice=0;
    // var totalNum = 0;
    // cart.forEach(item => {
    //   // 这里的也是遍历每一项是否被选中
    //   if(item.checked) {
    //     totalPrice += item.num * item.goods_price
    //     totalNum += item.num
    //   }else {
    //     allchecked= false
    //   }
    // });

    // // 但是还要考虑cart  为 [] 的 时候  allchecked 就没办法为false 
    // // 所以加一个判断
    // allchecked = cart.length!=0?allchecked:false;




    // this.setData({
    //   cart,
    //   allchecked,
    //   totalNum,
    //   totalPrice
    // })

    this.getTotal(cart)
  },

  // 获取用户的收货地址
  getAdress(){
    // 这里代码冗余，其实是可以优化的


    // 获取权限状态
    wx.getSetting({
      success: (result) => {
        console.log(result)
        // 当属性名是scope.address,需要使用[] 获取属性值
        const scopeAddress = result.authSetting["scope.address"]
        // treu 或者undefined  直接调用地址接口 
        // false 说明用户曾经拒绝过  则需要 手动打开 地址授权
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
              success: (result1)=>{
                wx.setStorageSync('address', result1)
              }
          });

        }else {
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3)=>{
                  wx.setStorageSync('address', result3)
                }
              });
            }
          });
        }
      }
    });


    



  
  },


  // 商品复选框点击
  changeCheckedItem(e){
    const goods_id = e.currentTarget.dataset.id
    const { cart }= this.data
    const index = cart.findIndex(v=>v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    
    this.getTotal(cart)
  },

  // 全选和反选
  changeChecked(e){
    // console.log(e)
    let { cart, allchecked } = this.data
    // 点击一下就要更改 allchecked 的值
    allchecked = !allchecked
    // allchecked?cart.forEach(v=>v.checked):false

    // 自己的写法

    // if(allchecked) {
    //   cart.forEach(function (v) {
    //     v.checked = true
    //   })
    // }else {
    //   cart.forEach(function(v) {
    //     v.checked=false
    //   })
    // }


    // 老师的写法
    cart.forEach(v=>v.checked = allchecked)



    this.setData({
      cart,
      allchecked
    })

    wx.setStorageSync('cart', cart)

  },

  // 商品减
  // desc(e){
  //   console.log(e)
  //   const goods_id = e.currentTarget.dataset.id
  //   const {cart} = this.data
  //   const index = cart.findIndex(v => v.goods_id === goods_id)
  //   if (cart[index].num>1){
  //     cart[index].num--;
  //   }else {
  //     wx.showToast({
  //       title: '已经最小值了~~',
  //       icon:'none',
  //       mask: false
  //     });      
  //   }
  //   this.getTotal(cart)
  // },
  //  // 商品加
  // add(e) { 
  //   console.log(e)
  //   const goods_id = e.currentTarget.dataset.id
  //   const { cart } = this.data
  //   const index = cart.findIndex(v => v.goods_id === goods_id)
  //   if (cart[index].num < 5) {
  //     cart[index].num++;
  //   } else {
  //     wx.showToast({
  //       title: '已经最大值了~~',
  //       icon: 'none',
  //       mask: false
  //     });
  //   }
  //   this.getTotal(cart)
  // },


  // 我自己的写法  重复代码太多
  // 老师的写法是 加，减 绑定一个方法，只是 给个自定义属性进行区分
  // 加:data-op="{{+1}}"  
  // 减:data-op="{{-1}}"
  // 根据op  来判断
  operateNum(e){    
    const {id, op} = e.currentTarget.dataset
    const { cart } = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if(cart[index].num <= 1 && op === -1) {
      wx.showToast({
        title: '不能再点我啦~~',
        icon: 'none',
        mask: false
      });

      // 如果为1的时候，再点击想删除可以写,弹窗的时候用箭头函数，注意this 指向
      // cart.splice(index,1)
      // this.getTotal(cart) 


     
    }else {    
      cart[index].num += op;
    }
   
    this.getTotal(cart)
  },


  // 结算按钮支付
  pay(){

    const {cart} = this.data
    if(!cart.length) {
      showToast({title:"购物车还是空的~~"})
      return
    }else {
      // console.log(22)
      wx.navigateTo({
        url: '/pages/pay/pay'
      })
    }

  },





  // 因为购物车里的总额和件数需要重复使用，所以封装
  getTotal(cart){
    let allchecked = true
    var totalPrice = 0;
    var totalNum = 0;
    cart.forEach(item => {
      // 这里的也是遍历每一项是否被选中
      if (item.checked) {
        totalPrice += item.num * item.goods_price
        totalNum += item.num
      } else {
        allchecked = false
      }
    });

    // 但是还要考虑cart  为 [] 的 时候  allchecked 就没办法为false 
    // 所以加一个判断
    allchecked = cart.length != 0 ? allchecked : false;

    this.setData({
      cart,
      totalPrice,
      totalNum,
      allchecked
    })

    wx.setStorageSync('cart', cart)

  }

})