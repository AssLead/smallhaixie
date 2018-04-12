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


    // getFollow
    var requestUrl = "getFollow";
    var userId = wx.getStorageSync('userDetail').id;
    var that = this;

    var jsonData = {
        userId:userId,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var followlist = res.list[0].fBean;
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
  deleteFollow: function(e) {
    var followId = e.target.dataset.id;
    var userId = wx.getStorageSync('userDetail').id;
    // deleteFollow
    var requestUrl = "deleteFollow";
    var that = this;

    var jsonData = {
        userId:userId,
        followId:followId
    };
    console.log(e.target);

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            wx.showLoading({ title: '加载中...' })
            /*wx.showModal({
              title: '提示',
              content: '取消关注成功',
              showCancel:false,
            })*/
            
            var pages = getCurrentPages()    //获取加载的页面

            var currentPage = pages[pages.length-1]    //获取当前页面的对象

            var url = currentPage.route

            wx.redirectTo({
              url: '/' + url
            })

            // wx.hideLoading();
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
  friend: function(e) {
    var followId = e.currentTarget.dataset.id;
    console.log(followId)
    wx.navigateTo({
      url: '../friend/friend?id=' + followId
    })
  },
})