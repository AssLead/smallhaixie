// pages/tag/tag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates:[
        { "name": "十三", "state": 1 },
        { "name": "十四", "state": 0 },
        { "name": "十五", "state": 0 },
        { "name": "十六", "state": 0 },
        { "name": "十七", "state": 0 },
        { "name": "十8", "state": 0 },
        { "name": "十9", "state": 0 },
        { "name": "十0", "state": 0 },
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
    wx.navigateTo({
      url: '../setting/setting?tag=' + tag
    })
  }

})