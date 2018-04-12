var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    console.log(options)
    that.setData({
        id:options.id,
    })
  },

  value: function(e) {
    this.setData ({
      content: e.detail.value
    })
  },
  addMessage: function() {
    var that = this;
    var requestUrl = "addMessage";
    var userId = wx.getStorageSync('userDetail').id;
    var content = this.data.content;
    if (content == "") {
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 2000
      }) 
      return
    }
    var jsonData = {
        associationId:that.data.id,
        userId:userId,
        content:content
    };
    console.log(jsonData)
    request.httpsPostRequest(requestUrl,jsonData,function(res){
      console.log(res);
      if (res.code == 'success') {
          wx.hideLoading();
          wx.showToast({
            title: '发表成功',
            icon: 'success',
            duration: 2000
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