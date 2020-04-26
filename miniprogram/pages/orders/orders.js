// pages/order/order.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldnumber: 0,
    ordernumber: 0,
    ordertitles: []
  },

  change: function () {
    console.log("change()")
    var item = [{
      time: "2020",
      money: 0
    }]
    console.log("item = " + item.toString())
    var self = this
    self.setData({
      ordertitles: self.data.ordertitles.concat(item)
    })
  },

  //从缓存中获取订单总数
  getOrderumber: function () {
    this.setData({
      ordernumber: wx.getStorageSync('ordernumber')
    })
    //console.log(this.data.ordernumber)
  },

  //获取日期时间
  getTime: function () {
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
  },

  //从缓存中读取订单信息
  getOrders: function () {
    var self = this
    //var tmpordertitle = []
    
    //console.log(item[0].money)
    console.log(self.data.ordernumber)
    var tmpi
    if (this.data.oldnumber == 0){
      tmpi = 1
    }else{
      tmpi = this.data.oldnumber+1
    }
    for (var i = tmpi; i <= self.data.ordernumber; i++){
      //var i = self.data.ordernumber
      var item = [{
        time: "",
        money: 200
      }]
      console.log("i = " + i.toString())
      var ordertime = 'orderstime[' + i.toString() + ']'
      item[0].time = wx.getStorageSync(ordertime)
      var ordermoney = 'ordersmoney[' + i.toString() + ']'
      item[0].money = wx.getStorageSync(ordermoney)
      console.log(item[0].time)
      console.log(item)
      //tmpordertitle = tmpordertitle.concat(item)
      this.setData({
        ordertitles: self.data.ordertitles.concat(item),
        //oldnumber: wx.getStorageSync('ordernumber')
      })
      this.setData({
        ordertitles: self.data.ordertitles,
      })
      console.log(self.data.ordertitles)
    }
    //console.log(tmpordertitle)
    this.setData({
      //ordertitles: self.data.ordertitles.concat(item),
      oldnumber: wx.getStorageSync('ordernumber')
    })
  },

  showInfo: function (event) {
    console.log(event)
    var pageurl = '../orderinfo/orderinfo?orderindex=' + event.currentTarget.id
    wx.navigateTo({
      url: pageurl,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getTime();
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
    this.getOrderumber();
    var newnum = this.data.ordernumber
    var oldnum = this.data.oldnumber
    if (newnum > oldnum){
      this.getOrders();
    }
    
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