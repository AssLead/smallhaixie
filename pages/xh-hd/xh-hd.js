// pages/xh-hd/xh-hd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaArray: ['美国', '中国', '巴西', '日本'],
    typeArray: ['文化', '艺术', '运动', '招聘'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
})