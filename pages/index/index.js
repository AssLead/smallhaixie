var app = getApp();
var request = require("../../utils/request.js");


Page({

  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorcolor:'#fff',
    indicatoractivecolor:'#00a69a',
  },

  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' })

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
      that.getAssociationList();
    });

    // banner 
    var requestUrl = "banner";

    var jsonData = {};

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var activelist = res.list;
            var imgUrls = [];
            for(let i=0; i<activelist.length; i++) {
                imgUrls.push(activelist[i].bannerName)
                // activelist[i].bannerName = activelist[i].bannerName.split(',');
            }
            console.log(imgUrls)
            // var imgUrls=activelist[0].bannerName;
            
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

    that.getAssociationList();
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
  getAssociationList: function() {
    var that = this;

    wx.showLoading({ title: '加载中...' })
     // getAssociationList 
    var requestUrl2 = "getAssociationList";
    var userId = wx.getStorageSync('userDetail').id;

    var jsonData = {userId:userId};
    console.log(jsonData)
    request.httpsPostRequest(requestUrl2,jsonData,function(res){
        console.log(res);
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
  onPullDownRefresh: function(){
    var that = this;
    that.getAssociationList();
    
    setTimeout(function () {  
      wx.stopPullDownRefresh();
    }, 100)
  },
  search:function() {
    wx.navigateTo({
      url: '../search/search'
    })
  }
})
