// pages/setting/setting.js
var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:[],
    // userDetail: null,
    tempFilePaths: '../../images/set_02.jpg',
    marriage: ['是', '否'],
    index: 0,
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


    app.isLogin(function (userDetail) {
      console.log(userDetail)
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });

    var userDetail = wx.getStorageSync('userDetail');
    that.setData({
      userDetail: userDetail
    })
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
            tempFilePaths:tempFilePaths
          })
          wx.uploadFile({
              url: 'http://www.qplant.vip/VisonShop/updataUserinfo', //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'file',
              formData:{
                'userId': userId
              },
              success: function(res){
                console.log(res);
                if (res.statusCode == "200") {

                }
                // var data = res.data
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
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function(e) {
    var that = this;
    var userId = wx.getStorageSync('userDetail').id;
    var value = e.detail.value;
    value.userId = userId;
    console.log(that.data.index)
    if (that.data.index=="0") {
      value.marriage = "true"
    } else {
      value.marriage = "false"
    }
    console.log('form发生了submit事件，携带数据为：', value);

    // updataUserinfo
    var requestUrl = "updataUserinfo";

    var jsonData = value;
    console.log(jsonData);

    /*request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({})
        if (res.code == 'success') {
            wx.hideLoading();
            
        } else {
          wx.hideLoading();
        }
      }
    )*/
    /*wx.uploadFile({
      url: 'http://www.qplant.vip/VisonShop/updataUserinfo', //仅为示例，非真实的接口地址
      filePath: that.data.tempFilePaths,
      name: 'file',
      formData:userId,
      success: function(res){
        console.log(res);
        // var data = res.data
        //do something
      }
    })*/
  },
})