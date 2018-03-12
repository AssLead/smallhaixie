// pages/coupon/coupon.js
var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab切换  
    currentTab: 0,  
    winWidth: 0,  
    winHeight: 0,  
    couponlist: null,
    userDetail: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;  
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo( {  
  
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
    }); 
    // getCoupon
    var requestUrl = "getCoupon";
    var userId = wx.getStorageSync('userDetail').id;
    var that = this;

    // console.log(that.data.userDetail);
    var jsonData = {
        userId:userId,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        if (res.code == 'success') {
            var couponlist = res.list[0].cplist;
            console.log(couponlist);
            that.setData({  
                couponlist: couponlist
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

  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  },
})