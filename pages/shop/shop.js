// 获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetail: null,
    integral: '',
    shopArray: [
      {
        name: '电子产品',
        type: '0',
        arrow: '../../images/shop1.jpg'
      }, 
      {
        name: '生活用品',
        type: '1',
        arrow: '../../images/shop2.jpg'
      }, 
      {
        name: '零食',
        type: '2',
        arrow: '../../images/shop3.jpg'
      }, 
      {
        name: '家居用品',
        type: '3',
        arrow: '../../images/shop4.jpg'
      }, 
      {
        name: '优惠券',
        type: '4',
        arrow: '../../images/shop5.jpg'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      // 更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });

    var integral = wx.getStorageSync('userDetail').integral;
    that.setData({
        integral: integral
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  shoplist: function (e) {
      var type = e.currentTarget.dataset.type;
      console.log(type)
      wx.navigateTo({
        url: '../shoplist/shoplist?type=' + type
      })
  },
})