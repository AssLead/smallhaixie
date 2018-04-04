// 获取应用实例
var app = getApp();
var request = require("../../utils/request.js");
// 注册页面
Page({
  data: {
    userInfo: {},
    menuList: [
      {
        list: [
          {
            name: '我的优惠券',
            page: '../coupon/coupon',
            arrow: '../../images/icon_my_coupon.png'
          },
          {
            name: '积分商城',
            page: '../shop/shop',
            icon: '../../images/myorder_icon.png',
            arrow: '../../images/icon_my_shop.png'
          },
          {
            name: '我的关注',
            page: '../follow/follow',
            arrow: '../../images/icon_my_like.png'
          },
          {
            name: '我的订单',
            page: '../goods/goods',
            page: '../old/old',
            arrow: '../../images/icon_my_orderform.png'
          },
          {
            name: '金融投资',
            page: '',
            arrow: '../../images/icon_my_invest.png'
          },
          {
            name: '设置',
            page: '../goods/goods',
            page: '../setting/setting',
            arrow: '../../images/icon_my_setting.png'
          },
          {
            name: '关于我们',
            page: '../about/about',
            arrow: '../../images/icon_my_we.png'
          }
        ]
      }
    ]

  },
  onLoad: function () {
    var that = this;
    // 调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      // 更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    app.isLogin(function (userDetail) {
      console.log(userDetail)
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    var user_key = wx.getStorageSync('user_key');

    wx.request({
        url: 'http://www.qplant.vip/VisonShop/getUserInfo',
        data: {
          openid: user_key,
        },
        method: 'GET',
        header: { 'content-type': 'application/json'},
        success: function(res){
          wx.hideLoading();
          console.log(res);
          wx.setStorageSync('userDetail', res.data.list[0]);
          var userDetail = wx.getStorageSync('userDetail');
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
    
    
    
  }
})