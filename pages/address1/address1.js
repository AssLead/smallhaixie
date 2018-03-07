// pages/address1/address1.js
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})