// pages/about/about.js
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
    var that = this;  
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)

    var userId = wx.getStorageSync('userDetail').id;
    // addFeedback
    var requestUrl = "addFeedback";
    var that = this;

    var jsonData = {
        userId:userId,
        content:e.detail.value.textarea
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '反馈成功',
              showCancel:false,
            })
            
            

            
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
  }
})