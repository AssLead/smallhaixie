// pages/old/old.js
var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userDetail: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' })
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    // findCommodityOrderUser  
    var requestUrl = "findCommodityOrderUser";
    var userId = wx.getStorageSync('userDetail').id;
    var that = this;

    var jsonData = {
        userId:userId,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var oldlist = res.list;
            console.log(oldlist);
            that.setData({  
                oldlist: oldlist
            })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  olddetail: function (e) {
    var orderState = e.currentTarget.dataset.orderstate;
    var id = e.currentTarget.dataset.id;
    var orderNum = e.currentTarget.dataset.ordernum;

    console.log(orderState)
    if (orderState == 0) {
      wx.navigateTo({
        url: '../old-3/old-3?id=' + id + '&' + 'orderNum=' + orderNum
      })
    } else if (orderState == 1) {
      wx.navigateTo({
        url: '../old-1/old-1?id=' + id + '&' + 'orderNum=' + orderNum
      })
    } else if (orderState == 2) {
      wx.navigateTo({
        url: '../old-1/old-1?id=' + id + '&' + 'orderNum=' + orderNum
      })
    } else if (orderState == 3) {
      wx.navigateTo({
        url: '../old-2/old-2?id=' + id + '&' + 'orderNum=' + orderNum
      })
    }
      /*wx.navigateTo({
        url: '../goods/goods?id=' + id
      })*/
  },
})