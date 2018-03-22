var app = getApp();
var request = require("../../utils/request.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,  
  },

  /**
   * 生命周期函数--监听页面加载
   */
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

    // findActivitiState 
    var requestUrl = "findActivitiState";
    // var userId = wx.getStorageSync('userDetail').id;
    var that = this;

    // console.log(that.data.userDetail);
    var jsonData = {
        activitiState:0,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({})
        if (res.code == 'success') {
            var activelist = res.list;
            console.log(activelist);
            for(let i=0; i<activelist.length; i++) {
                activelist[i].activitiImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+activelist[i].activitiImg.split(',')[0]
                // console.log(util.formatTime(activelist[i]["createDate"],'Y/M/D h:m:s'));
                console.log()
                activelist[i].startDate = util.formatTime(activelist[i]["startDate"],'Y/M/D h:m:s')
                activelist[i].endDate = util.formatTime(activelist[i]["endDate"],'Y/M/D h:m:s')

            }
            that.setData({  
                activelist: activelist
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
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
        wx.showLoading({})
    
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  

    // findActivitiState 
    var requestUrl = "findActivitiState";

    // console.log(that.data.userDetail);
    var jsonData = {
        activitiState:e.target.dataset.current,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({})
        if (res.code == 'success') {
            var activelist = res.list;
            console.log(activelist);
            for(let i=0; i<activelist.length; i++) {
                activelist[i].activitiImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+activelist[i].activitiImg.split(',')[0]
                console.log()
                activelist[i].startDate = util.formatTime(activelist[i]["startDate"],'Y/M/D h:m:s')
                activelist[i].endDate = util.formatTime(activelist[i]["endDate"],'Y/M/D h:m:s')

            }
            that.setData({  
                activelist: activelist
            })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
          that.setData({  
            activelist: null
          }) 
          wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            }) 
        }
      }
    )

  },
  actdetail: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../note/note?id=' + id
    })
  }
})