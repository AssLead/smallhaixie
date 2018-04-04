// pages/tag/tag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates:[
        { "name": "唱歌", "state": 1 },
        { "name": "听歌", "state": 0 },
        { "name": "写歌", "state": 0 },
        { "name": "古典", "state": 0 },
        { "name": "流行", "state": 0 },
    ],  
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

  clickChoose: function (e) {
    var index = e.currentTarget.dataset.key;
    if (this.data.dates[index].state == 1) {
       this.data.dates[index].state = 0;
    } else if (this.data.dates[index].state == 0) {
       this.data.dates[index].state = 1;
    }
    this.setData({
       dates: this.data.dates,
    });
  },

  saveTag: function() {
    var tag = JSON.stringify(this.data.dates)
    console.log(tag)
    wx.setStorageSync('tag2', tag);
    wx.navigateTo({
      url: '../setting/setting'
    })
  }

})