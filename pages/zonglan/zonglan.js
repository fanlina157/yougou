const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,   // 是否展示弹窗
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   *  点击确认
   */
  modalConfirm: function () {
    this.setData({
      isShow: false
    })
  }
})
