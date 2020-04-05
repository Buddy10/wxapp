// pages/list/list.js
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    foods:[],
    money: 0
  },

  // foods = wx.getStorageSync('foods') || [],
  // this.setData({
  //   foods: foods
  // }),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      foods: wx.getStorageSync('foods')
    })
    var sum = 0
    for (var i = 0; i < this.data.foods.length; i++){
      if(this.data.foods[i].number!=0){
        sum += this.data.foods[i].number * this.data.foods[i].price
      }
    }
    this.setData({
      money:sum
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})