var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide: '', 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    showView: (options.showView == "true" ? true : false) 
    app.isLogin(function (userDetail) {
      console.log(userDetail)
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  chooseimg: function () {
    var userId = wx.getStorageSync('userDetail').id;
    var that = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;

          that.setData({
            tempFilePaths:tempFilePaths,
            hide: 'hide'
          })
          

        }
      })
  },
  formSubmit: function(e) {
    wx.showLoading({ title: '加载中...' })
    var that = this;
    var userId = wx.getStorageSync('userDetail').id;
    var value = e.detail.value;
    value.createId = userId;
    console.log('form发生了submit事件，携带数据为：', value);
    console.log(that.data.tempFilePaths);
    if (that.data.tempFilePaths == undefined) {
      
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.uploadFile({
      url: 'http://www.qplant.vip/VisonShop/addAssociation', 
      filePath: that.data.tempFilePaths[0],
      name: 'associationLogo',
      formData:value,
      success: function(res){
        console.log(res);

        console.log(JSON.parse(res.data).code);
        
        if (JSON.parse(res.data).code == 'success') {
            wx.hideLoading();
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack()
        } else {
          wx.hideLoading();
          wx.showToast({
            title: JSON.parse(res.data).msg,
              icon: 'none',
              duration: 2000
          })
          wx.navigateBack()
        }
      }
    })
  },
})