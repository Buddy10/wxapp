// pages/list/list.js
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    foods:[],
    money: 0,
    ordernumber: 0,
    orders: [],
    ordersmoney: [],
    willpay: 3
  },

  // foods = wx.getStorageSync('foods') || [],
  // this.setData({
  //   foods: foods
  // }),

  addFood: function (event) {
    console.log(event)
    for (var i = 0; i < this.data.foods.length; i++){
      if(this.data.foods[i].addTime == event.currentTarget.id){
        //this.data.foods[i].number++
        var index = "foods[" + i.toString() + "].number"
        var param = {}
        param[index] = this.data.foods[i].number + 1
        this.setData(param)
        wx.setStorageSync('foods', this.data.foods)
        this.setData({
          money: this.data.money + this.data.foods[i].price
        })

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
      }
    }
  },

  //弹窗确认付款函数
  popConfirm: function(){
    var self = this
    wx.showModal({
      title: '付款确认',
      content: '确定要付款吗？',
      success: function (res) {
        if (res.confirm) {  
          console.log('点击确认付款')
          self.setData({
            willpay: 1
          })
        } else {   
          console.log('点击取消付款')
          self.setData({
            willpay: 0
          })
        }
      }
    })
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
      this.popConfirm()
      if (this.data.willpay == 1) {
        //记录订单数据
        var index = 'orders[' + this.data.ordernumber.toString() + ']'
        wx.setStorageSync(index, this.data.foods)
        var index2 = 'ordersmoney[' + this.data.ordernumber.toString() + ']'
        wx.setStorageSync(index2, this.data.money)
        this.setData({
          ordernumber: this.data.ordernumber + 1
        })
        //显示付款成功提示
        wx.showToast({
          icon: '',
          title: `付款成功`,
          duration: 2000,
          mask: true
        });
        //页面恢复初始数据
        this.setData({
          money: 0
        })
        for (var i = 0; i < this.data.foods.length; i++){
          //this.data.foods[i].number++
          var index = "foods[" + i.toString() + "].number"
          var param = {}
          param[index] = 0
          this.setData(param)
          wx.setStorageSync('foods', this.data.foods)
        }
        wx.switchTab({
          url: '/pages/order/order',
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
        this.setData({
          willpay: 3
        })
      } else if (this.data.willpay == 0) {
        wx.showToast({
          icon: 'none',
          title: `已取消`,
          duration: 2000,
          mask: true
        });
        this.setData({
          willpay: 3
        })
      } else {
        this.setData({
          willpay: 3
        })
      }
      
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