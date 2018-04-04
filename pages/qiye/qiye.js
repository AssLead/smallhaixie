var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['互联网','金融'],
    index: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' })

    var that = this;

    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    
    console.log(options)
    that.setData({
      id:options.associationId,
    })
    that.findAssDirector("");

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  findAssDirector: function(value) {
    wx.showLoading({ title: '加载中...' })
    var that = this;
    // console.log(type)
    var requestUrl = "findAssDirector";
    var associationId = that.data.id;

    var jsonData = {
        type: value,
        associationId:associationId,
    };


    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var directorlist = res.list;
            console.log(directorlist);
            for(let i=0; i<directorlist.length; i++) {
                directorlist[i].logo = 'http://www.qplant.vip/VisonShop/imageaction?name='+directorlist[i].logo + '&type=6' 
                directorlist[i].img = 'http://www.qplant.vip/VisonShop/imageaction?name='+directorlist[i].img + '&type=6' 
            }
            that.setData({  
                directorlist: directorlist
            })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
          that.setData({  
            directorlist: ''
          })
          wx.showToast({
            title: '暂无企业',
            icon: 'none',
            duration: 2000
          })
        }
      }
    )
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.findAssDirector(this.data.array[e.detail.value]);

  },
})