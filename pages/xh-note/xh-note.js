var app = getApp();
var request = require("../../utils/request.js");
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
        wx.showLoading({})

    var that = this;

    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    
    console.log(options)
    that.setData({
        id:options.id,
    })

    // findAssociation
    var requestUrl = "findAssociation";
    var associationId = that.data.id;

    var jsonData = {
        associationId:associationId,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({})
        if (res.code == 'success') {
            var associationList = res.list[0];
            console.log(associationList);
            // for(let i=0; i<associationList.length; i++) {
                associationList.associationImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+ associationList.associationImg  + '&type=1';
              //imgUrls[i] = 'http://www.qplant.vip/VisonShop/imageaction?name='+ imgUrls[i] + '&type=5';
            // }
            that.setData({  
                associationList: associationList
            })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  returnIndex: function() {
    
    wx.redirectTo({
      url: '../index/index',
    })

  },
  huodong: function() {
    wx.navigateTo({
      url: '../xh-hd/xh-hd'
    })
  },
  dongtai: function() {
    wx.navigateTo({
      url: '../xh-dongtai/xh-dongtai'
    })
  },
  liuyanban: function() {
    wx.navigateTo({
      url: '../message-1/message-1'
    })
  },
  shequ: function() {
    wx.navigateTo({
      url: '../xh-sq/xh-sq'
    })
  },
  qiye: function() {
    wx.navigateTo({
      url: '../qiye/qiye'
    })
  },
  shangcheng: function() {
    wx.navigateTo({
      url: '../shop/shop'
    })
  },
})