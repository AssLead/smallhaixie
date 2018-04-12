// pages/coupon/coupon.js
var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followlist: null,
    userDetail: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' })
    
    var that = this;  
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    var followlist = JSON.parse(options.list)
    for(let i=0; i<followlist.length; i++) {
      followlist[i].portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+ followlist[i].portrait+ '&type=2';
    }
    that.setData({
        followlist: followlist
    })
    wx.hideLoading();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  friend: function(e) {
    var followId = e.currentTarget.dataset.id;
    console.log(followId)
    wx.navigateTo({
      url: '../friend/friend?id=' + followId
    })
  },
})