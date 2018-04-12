var app = getApp();
var request = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    followtext:"关注",
    isfollow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      id: options.id
    })
    
    wx.request({
        url: 'http://www.qplant.vip/VisonShop/getUserInfo',
        data: {
          userId: options.id,
        },
        method: 'GET',
        header: { 'content-type': 'application/json'},
        success: function(res){
          wx.hideLoading();
          console.log(res);
          var userDetail = res.data.list[0];
          console.log(userDetail.hobby)
          if (userDetail.hobby != "") {
            userDetail.hobby = JSON.parse(userDetail.hobby)
          }
          if (userDetail.portrait != undefined) {
            that.setData({
              portrait:'http://www.qplant.vip/VisonShop/imageaction?name='+ userDetail.portrait + '&type=2',
            })
          }
          that.setData({
            userDetail: userDetail
          })
          wx.hideLoading();
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  addFollow: function () {
    var that = this;
    var isfollow = this.data.isfollow;
    if (!isfollow) {
      // addFollow
      var requestUrl = "addFollow";
      var followId = that.data.id;
      var userId = wx.getStorageSync('userDetail').id;

      var jsonData = {
          followId:followId,
          userId:userId
      };
      console.log(jsonData)
      request.httpsPostRequest(requestUrl,jsonData,function(res){
          console.log(res);
          wx.showLoading({ title: '加载中...' })
          if (res.code == 'success') {
              wx.showLoading({ title: '加载中...' })
              that.setData({  
                followtext: '取消关注',
                isfollow: true
              })
              wx.showModal({
                title: '提示',
                content: '关注成功',
                showCancel:false,
              }) 
              wx.hideLoading();
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      )
    } else {
      var requestUrl = "deleteFollow";
      var followId = that.data.id;
      var userId = wx.getStorageSync('userDetail').id;

      var jsonData = {
          followId:followId,
          userId:userId
      };
      console.log(jsonData)
      request.httpsPostRequest(requestUrl,jsonData,function(res){
          console.log(res);
          wx.showLoading({ title: '加载中...' })
          if (res.code == 'success') {
              wx.showLoading({ title: '加载中...' })
              that.setData({  
                followtext: '关注',
                isfollow: false
              })
              wx.showModal({
                title: '提示',
                content: '取消关注成功',
                showCancel:false,
              }) 
              wx.hideLoading();
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      )
    }
    
  },
})