// pages/shoplist/shoplist.js
var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    typeName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' })
    var that=this;
    // 0=电子产品 1=生活用平 2=零食 3=家具用平 4=优惠券
    if (options.type == 0) {
      that.setData({
        typeName:'电子产品',
      })
    } else if (options.type == 1) {
      that.setData({
        typeName:'生活用品',
      })
    } else if (options.type == 2) {
      that.setData({
        typeName:'零食',
      })
    } else if (options.type == 3) {
      that.setData({
        typeName:'家具用品',
      })
    } else if (options.type == 4) {
      that.setData({
        typeName:'优惠券',
      })
    }
    that.setData({
      type:options.type,
    })

    // findCommodity
    var requestUrl = "findCommodity";
    var that = this;

    var jsonData = {
        type:that.data.type,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var shoplist = res.list;
            console.log(shoplist);
             
            that.setData({  
                shoplist: shoplist
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
  shopdetail: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
      wx.navigateTo({
        url: '../goods/goods?id=' + id
      })
  },
})