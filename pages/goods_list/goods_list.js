import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 子组件 Tabs  需要的数据
    tabs: [
      {
        name: "综合",
        id: 1,
        isActive: true
      },
      {
        name: "销量",
        id: 2,
        isActive: false
      },
      {
        name: "价格",
        id: 3,
        isActive: false
      }
    ],
    currentIndex:0 , // 当前被点击的索引

    // 商品列表
    goods_list:[]
  },
  // 接口要用的参数
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages :1,


  // 父组件的自定义事件
  clickParent(e){
    console.log(e)
    const {index} = e.detail

    //  拿到子组件中被电极的索引后，更改数据中的isActive 的值
    const {tabs} = this.data
    tabs.forEach((v,i)=>{
      i===index?v.isActive=true:v.isActive=false;
    })
    this.setData({
      tabs
    })

  },


  // 商品列表
  getGoodsList(){
    request({
      url:"/goods/search",
      data:this.QueryParams
    }).then(result=>{
      console.log(result)
      const {message, meta} = result.data




      if(meta.status === 200) {
        
       const total = message.total
       this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
        console.log(this.totalPages)
        this.setData({
          // 请求成功，拼接数组，而不是替换了
          goods_list: [...this.data.goods_list,...message.goods]
          // goods_list:message.goods
        })


        // 手动关闭下拉刷新
        wx.stopPullDownRefresh()
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 这里options 有传过来的参数
    // console.log(options)
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置数组
    this.setData({
      goods_list:[]
    })
    // 重置页码
    this.QueryParams.pagenum=1
     // 重新发送请求
     this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    
    // 判断还有没有总页数
    if(this.QueryParams.pagenum >= this.totalPages){
      console.log(1111111111)
      wx.showTabBar({
        title:"没有下一页了。。。"
      })
    }else {
      this.QueryParams.pagenum++;
      this.getGoodsList()
      

    }
  }

})