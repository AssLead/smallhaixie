var app = getApp();
var request = require("../../utils/request.js");
var util = require("../../utils/util.js");

Page({

  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorcolor:'#00a69a',
    indicatoractivecolor:'#00a69a',
  },

  onLoad: function (options) {
    wx.showLoading({})

    var that = this;
    // 调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      // 更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });

    // banner 
    var requestUrl = "banner";

    var jsonData = {};

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({})
        if (res.code == 'success') {
            var activelist = res.list;
            
            for(let i=0; i<activelist.length; i++) {
                activelist[i].bannerName = activelist[i].bannerName.split(',');
            }
            var imgUrls=activelist[0].bannerName;
            
            for(let i=0; i<imgUrls.length; i++) {
              imgUrls[i] = 'http://www.qplant.vip/VisonShop/imageaction?name='+ imgUrls[i] + '&type=5';
            }
            that.setData({  
                imgUrls:imgUrls
            }) 
            
            
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

     // getAssociationList 
    var requestUrl2 = "getAssociationList";

    var jsonData = {};

    request.httpsPostRequest(requestUrl2,jsonData,function(res){
        console.log(res);
        wx.showLoading({})
        if (res.code == 'success') {
            var associationList  = res.list;
            for(let i=0; i<associationList.length; i++) {
                associationList[i].associationImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+ associationList[i].associationImg  + '&type=1';
              //imgUrls[i] = 'http://www.qplant.vip/VisonShop/imageaction?name='+ imgUrls[i] + '&type=5';
            }
            that.setData({  
                associationList: associationList,
            }) 

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
  associationdetail: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../xh-note/xh-note?id=' + id
    })
  },
  addAssociation:function(e) {
    wx.navigateTo({
      url: '../add-xh/add-xh'
    })
  },
})
