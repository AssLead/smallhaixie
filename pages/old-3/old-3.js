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
    console.log(options)
    wx.showLoading({ title: '加载中...' })
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    // findCommodityOrder  
    var requestUrl = "findCommodityOrder";
    // var userId = wx.getStorageSync('userDetail').id;
    var that = this;

    var jsonData = {
        id:options.id,
        OrderNum:options.OrderNum
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var oldlist = res.list[0];
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

  changeAddress:  function (e) {
    var id = e.currentTarget.dataset.id;
    var orderNum = e.currentTarget.dataset.ordernum;
    wx.navigateTo({
        url: '../address2/address2?id=' + id + '&' + 'orderNum=' + orderNum
      })
  },
})