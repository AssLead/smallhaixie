// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (JSON.stringify(options)=='{}'?true:false) {} else {
      that.setData({
        tag:JSON.parse(options.tag),
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  chooseimg: function () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
              url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'file',
              formData:{
                'user': 'test'
              },
              success: function(res){
                var data = res.data
                //do something
              }
          })

        }
      })
  },
  chooseTag: function() {
    var tag = JSON.stringify(this.data.tag)
    wx.navigateTo({
      url: '../tag/tag?tag=' + tag
    })
  }
})