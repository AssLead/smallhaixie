// pages/shoplist/shoplist.js
var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
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
        wx.showLoading({})
        /*if (res.code == 'success') {
            var followlist = res.list[0].fBean;
            console.log(followlist);
             
            that.setData({  
                followlist: followlist
            }); 
            
            wx.hideLoading();
        } else {
          wx.hideLoading();
        }*/
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

})