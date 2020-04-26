// pages/menu/menu.js
Page({



  selectTabs: function (event) {
    /*
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
    */
    //console.log(event.detail)

    
    for(var i=0; i<this.data.foods.length; i++){
      var index = "foods[" + i.toString() + "].isHidden"
      //console.log(index)
      var param = {}
      if (this.data.foods[i].tag != event.detail.index){
        param[index] = true
        this.setData(param)
      }else{
        param[index] = false
        this.setData(param)
      }
    }
    

    
    // this.setData({
    //   "foods[0].isHidden": true
    // })

  },

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
      }
    }

  },

  /**
   * 页面的初始数据
   */
  data: {

    
    //orders: {},
    num:8,
    active:0,
    foods: [
      {
        addTime: "20200101",
        name: "芹菜炒肉",
        imageurl: "../../images/foods/qccr.jpg",
        tag: 0,
        price: 10,
        number: 0,
        isHidden: false
      },
      {
        addTime: "20200102",
        name: "西红柿炒鸡蛋",
        imageurl: "../../images/foods/xhscd.jpg",
        tag: 0,
        price: 8,
        number: 0,
        isHidden: false
      },
      {
        addTime: "20200103",
        name: "木须肉",
        imageurl: "../../images/foods/mxr.jpg",
        tag: 0,
        price: 11,
        number: 0,
        isHidden: false
      },
      {
        addTime: "20200104",
        name: "炒花菜",
        imageurl: "../../images/foods/chc.jpg",
        tag: 0,
        price: 7,
        number: 0,
        isHidden: false
      },
      {
        addTime: "20200105",
        name: "馒头",
        imageurl: "../../images/foods/mt.jpg",
        tag: 1,
        price: 1,
        number: 0,
        isHidden: true
      },
      {
        addTime: "20200106",
        name: "米饭",
        imageurl: "../../images/foods/mf.jpg",
        tag: 1,
        price: 1,
        number: 0,
        isHidden: true
      },
      {
        addTime: "20200107",
        name: "煎饼",
        imageurl: "../../images/foods/jb.jpg",
        tag: 1,
        price: 2,
        number: 0,
        isHidden: true
      },
      {
        addTime: "20200108",
        name: "白酒",
        imageurl: "../../images/foods/bj.jpg",
        tag: 2,
        price: 10,
        number: 0,
        isHidden: true
      },
      {
        addTime: "20200109",
        name: "果汁",
        imageurl: "../../images/foods/gz.jpg",
        tag: 2,
        price: 6,
        number: 0,
        isHidden: true
      }
    ]

  },

  //wx:setStorageSync('foods', this.data.foods),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('foods', this.data.foods)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!wx.getStorageSync('ordernumber')){
      wx.setStorageSync('ordernumber', 0)
    }
    
    //wx.setStorageSync('orders', this.data.orders)
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

  },

  // exports:module = {
  //   foods: this.data.foods
  // }
})