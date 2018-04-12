
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
    
    wx.showLoading({ title: '加载中...' })
    var that=this;
    
    that.setData({
      id:options.id,
    })

    // findCommodity
    var requestUrl = "findCommodity";
    var that = this;

    var jsonData = {
        id:that.data.id,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var shopdetail = res.list[0];
            console.log(shopdetail);
             
            that.setData({  
                shopdetail: shopdetail
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