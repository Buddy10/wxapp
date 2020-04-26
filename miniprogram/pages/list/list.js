// pages/list/list.js
var util = require('../../utils/util.js');
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    foods:[],
    money: 0,
    ordernumber: 0,
    orders: {},
    ordersmoney: [],
    tmporder: {}

  },

  // foods = wx.getStorageSync('foods') || [],
  // this.setData({
  //   foods: foods
  // }),

  addFood: function (event) {
    console.log(event)
    for (var i = 0; i < this.data.foods.length; i++){
      if(this.data.foods[i].addTime == event.currentTarget.id){
        //this.data.foods[i].number++,
        var index = "foods[" + i.toString() + "].number"
        var param = {}
        param[index] = this.data.foods[i].number + 1
        this.setData(param)
        wx.setStorageSync('foods', this.data.foods)
        this.setData({
          money: this.data.money + this.data.foods[i].price
        })
        break
      }
    }
  },

  removeFood: function (event) {
    console.log(event)
    for (var i = 0; i < this.data.foods.length; i++) {
      if (this.data.foods[i].addTime == event.currentTarget.id && this.data.foods[i].number>0) {
        //this.data.foods[i].number--
        var index = "foods[" + i.toString() + "].number"
        var param = {}
        param[index] = this.data.foods[i].number - 1
        this.setData(param)
        wx.setStorageSync('foods', this.data.foods)
        this.setData({
          money: this.data.money - this.data.foods[i].price
        })
        break
      }
    }
  },

  //获取日期时间
  getTime: function () {
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
  },

  //记录订单数据
  getOrder: function () {
    var self = this
    //改变缓存中的总订单数
    self.setData({
      ordernumber: self.data.ordernumber + 1 
    })
    //获取缓存中的foods
    //此步多余
    // self.setData({
    //   foods: wx.getStorageSync('foods')
    // })
    //记录订单产生时间
    self.getTime()
    //把当前订单情况存入orders[i]中
    var ordername = 'orders[' + self.data.ordernumber.toString() + ']'
    // var param = {}
    // param[index] = self.data.money
    // self.setData(param)
    wx.setStorageSync(ordername, self.data.foods)
    var ordermoney = 'ordersmoney[' + self.data.ordernumber.toString() + ']'
    wx.setStorageSync(ordermoney, self.data.money)
    var ordertime = 'orderstime[' + self.data.ordernumber.toString() + ']'
    wx.setStorageSync(ordertime, self.data.time)
    wx.setStorageSync('ordernumber', self.data.ordernumber)
  },
  //页面和缓存恢复初始数据
  initData: function () {
    var self = this
    self.setData({
      money: 0
    })
    for (var i = 0; i < self.data.foods.length; i++){
      //this.data.foods[i].number++
      var index = "foods[" + i.toString() + "].number";
      var param = {};
      param[index] = 0;
      self.setData(param);
      wx.setStorageSync('foods', self.data.foods);
    }
  },
 

  paynow: function () {
    //判断是否已点菜，未点菜则提示
    if (this.data.money == 0){
      wx.showToast({
        icon: 'none',
        title: `您还未点餐`,
        duration: 2000,
        mask: true
      });
    } else {
      //询问是否确认付款
      //this.popConfirm()
       //弹窗确认付款函数
      
      var self = this
      wx.showModal({
        title: '付款确认',
        content: '确定要付款吗？',
        success: function (res) {
          if (res.confirm) {  
            console.log('点击确认付款')
            //记录订单数据
            self.getOrder()
            //显示付款成功提示
            wx.showToast({
              icon: '',
              title: `付款成功`,
              duration: 2000,
              mask: true
            });
            //页面和缓存恢复初始数据
            self.initData()
            //切换到订单信息页面
            wx.switchTab({
              url: '/pages/orders/orders',
              success: (result) => {
                
              },
              fail: () => {},
              complete: () => {}
            });
          } else {   
            console.log('点击取消付款')
            wx.showToast({
              icon: 'none',
              title: `已取消`,
              duration: 2000,
              mask: true
            });
          }
        }
      })
      
      
      
    }
    
  },

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

    //从本地缓存中获取数据
  getFoods: function () {
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getFoods()
    this.setData({
      ordernumber:wx.getStorageSync('ordernumber')
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
