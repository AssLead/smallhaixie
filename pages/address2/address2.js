// pages/address1/address1.js
var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      region: ['广东省', '深圳市', '宝安区'],
      customItem: '全部'
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
    // findCommodityOrder  
    var requestUrl = "findCommodityOrder";
    // var userId = wx.getStorageSync('userDetail').id;
    var that = this;
      that.setData({
        id:options.id,
      })

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
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  formSubmit: function(e) {
    var that = this;
    var id = that.data.id;
    var value = e.detail.value;
    value.id = id;
    // console.log()
    value.region = that.data.region.toString()

    // addAddress
    var requestUrl = "updataAddress";

    var jsonData = value;
    console.log(jsonData);

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            wx.showToast({
              title: '添加地址成功',
              icon: 'success',
              duration: 2000
            })
            
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'loading',
            duration: 2000
          })
        }
      }
    )
  },
})