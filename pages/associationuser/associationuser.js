// pages/coupon/coupon.js
var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followlist: null,
    userDetail: null,
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

    showView: (options.showView == "true" ? true : false) 


    // findAssociationUser
    var requestUrl = "findAssociationUser";
    var associationId = options.associationId;
    var that = this;

    var jsonData = {
        associationId:associationId,
    };
    console.log(options)
    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var followlist = res.list;
            console.log(followlist);
            for(let i=0; i<followlist.length; i++) {
              if (followlist[i].portrait != undefined) {
                followlist[i].portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+followlist[i].portrait + "&type=2"
              }
            }
             
            that.setData({  
                followlist: followlist
            }); 
            
            wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  friend: function(e) {
    var followId = e.currentTarget.dataset.id;
    console.log(followId)
    wx.navigateTo({
      url: '../friend/friend?id=' + followId
    })
  },
})