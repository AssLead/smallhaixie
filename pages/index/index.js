var WxParse = require('../../wxParse/wxParse.js');
var config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    });
    wx.request({
      url: config.carouselImage,
      data: {
        
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        var data = res.data;
        console.log(res.data);
        // if (data.msg == "成功") {
  
          that.setData({
            imgUrls:  + res.data.list.bannerName,
            // profile: profile && (profile.slice(0, 40) + "..."),
            // logo: logo,
                
            // data: {
            //   list: [
            //     config.imageUrl + data.bannerName
            //   ]
            // },
          });
        // }

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
