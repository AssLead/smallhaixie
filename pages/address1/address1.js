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
    app.isLogin(function (userDetail) {
      console.log(userDetail)
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
  formSubmit: function(e) {
    var that = this;
    var userId = wx.getStorageSync('userDetail').id;
    var value = e.detail.value;
    value.userId = userId;
    // console.log()
    value.region = that.data.region.toString()

    // addAddress
    var requestUrl = "addAddress";

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
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})