// 获取应用实例
var app = getApp();
// 注册页面
Page({
  data: {
    userInfo: {},
    menuList: [
      {
        list: [
          {
            name: '我的优惠券',
            page: '',
            arrow: '../../images/icon_my_coupon.png'
          },
          {
            name: '积分商城',
            page: '',
            icon: '../../images/myorder_icon.png',
            arrow: '../../images/icon_my_shop.png'
          },
          {
            name: '我的关注',
            page: '',
            arrow: '../../images/icon_my_like.png'
          },
          {
            name: '我的订单',
            page: '',
            arrow: '../../images/icon_my_orderform.png'
          },
          {
            name: '金融投资',
            page: '',
            arrow: '../../images/icon_my_invest.png'
          },
          {
            name: '设置',
            page: '',
            arrow: '../../images/icon_my_setting.png'
          },
          {
            name: '关于我们',
            page: '',
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
  }
})