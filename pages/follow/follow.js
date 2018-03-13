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
    var that = this;  
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });


    // getFollow
    var requestUrl = "getFollow";
    var userId = wx.getStorageSync('userDetail').id;
    var that = this;

    var jsonData = {
        userId:userId,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({})
        if (res.code == 'success') {
            var followlist = res.list[0].fBean;
            console.log(followlist);
            that.setData({  
                followlist: followlist
            })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  deleteFollow: function(e) {
    var followId = e.target.dataset.id;
    var userId = wx.getStorageSync('userDetail').id;
    // deleteFollow
    var requestUrl = "deleteFollow";
    var that = this;

    var jsonData = {
        userId:userId,
        followId:followId
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({})
        if (res.code == 'success') {
            // var followlist = res.list[0].fBean;
            // console.log(followlist);
            // that.setData({  
            //     followlist: followlist
            // })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
        }
      }
    )
  }
})