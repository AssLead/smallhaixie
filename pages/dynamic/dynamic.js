// Page({
//   data: {
//     list: []
//   },
//   onLoad: function () {
//     var that = this
//     wx.request({
//       url: 'http://news-at.zhihu.com/api/4/themes',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       success: function (res) {
//         that.setData({
//           list: res.data.others
//         })
//       }
//     })
//   }
// })
var app = getApp()
Page({
  data: {
    imgUrls: [
      {
        link: '/pages/index/index',
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        link: '/pages/logs/logs',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      }, {
        link: '/pages/test/test',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad test');
  }
})  