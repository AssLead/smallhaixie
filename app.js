//app.js
var request = require("utils/request.js");
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  isLogin: function(cb) {
    var userkey = wx.getStorageSync('user_key');
    var that = this;
    console.log(userkey)

    if (!userkey) {
      wx.login({
        success:function(res_login){
          console.log(res_login.code)
          if(res_login.code){
            wx.showLoading({
              title: '登录中...',
            })
            var pages = getCurrentPages()    //获取加载的页面

            var currentPage = pages[pages.length-1]    //获取当前页面的对象

            var url = currentPage.route

            console.log(url);
            wx.request({
                url: 'http://www.qplant.vip/VisonShop/wxcode',
                data: {
                  code: res_login.code,
                },
                method: 'GET',
                header: { 'content-type': 'application/json'},
                success: function(res){
                  wx.setStorageSync('user_key', res.data.list[0].openid);
                  wx.request({
                      url: 'http://www.qplant.vip/VisonShop/getUserInfo',
                      data: {
                        openid: res.data.list[0].openid,
                      },
                      method: 'GET',
                      header: { 'content-type': 'application/json'},
                      success: function(res){
                        console.log(res);
                        wx.setStorageSync('userDetail', res.data.list[0]);
                        that.globalData.userDetail = res.data.list[0];
                        console.log(that.globalData.userDetail)
                        typeof cb == "function" && cb(that.globalData.userDetail);
                        wx.redirectTo({
                          url: '/' + url
                        })
                        wx.hideLoading();
                      }
                  })
                }
            })
            
          }
        },
      });
    } 
  },
  globalData: {
    userInfo: null,
    userDetail: null,
    curCity: '',
    url: '',
    host: 'http://www.qplant.vip/VisonShop/',
  }
})