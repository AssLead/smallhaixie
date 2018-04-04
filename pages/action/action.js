var app = getApp();
var request = require("../../utils/request.js");

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
    });
    that.findUserActivitiInfo();
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
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var activelist = res.list;
            console.log(activelist);
            for(let i=0; i<activelist.length; i++) {
                if (activelist[i].activitiImg != undefined) {
                activelist[i].activitiImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+activelist[i].activitiImg.split(',')[0]

                }
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
        wx.showLoading({ title: '加载中...' })
    
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
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var activelist = res.list;
            console.log(activelist);
            for(let i=0; i<activelist.length; i++) {
                if (activelist[i].activitiImg != undefined) {
                  activelist[i].activitiImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+activelist[i].activitiImg.split(',')[0]

                }
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
    console.log(e)
    wx.navigateTo({
      url: '../note/note?id=' + id
    })
  },
  findUserActivitiInfo: function() {
    // findUserActivitiInfo 
    var requestUrl = "findUserActivitiInfo";
    var userId = wx.getStorageSync('userDetail').id;
    var that = this;

    var jsonData = {
        userId:userId,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var activitiInfo = res.list[0];
            console.log(activitiInfo);
            // for(let i=0; i<activitiInfo.length; i++) {
              if (activitiInfo.userBean.portrait != undefined) {
                activitiInfo.userBean.portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+activitiInfo.userBean.portrait+'&type=2'
              }

            // }
            that.setData({  
                activitiInfo: activitiInfo
            })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
        }
      }
    )
  },
  joinActiviti: function(e) {
    wx.showLoading({ title: '加载中...' })
    // joinActiviti 
    var requestUrl = "joinActiviti";
    var userId = wx.getStorageSync('userDetail').id;
    var openid = wx.getStorageSync('user_key');
    var id = e.currentTarget.dataset.id;
    var appid = 'wx91b1f0de12e0295e';
    var that = this;

    var jsonData = {
        userId:userId,
        id:id,
        openid:openid,
        appid:appid,
    };
    console.log(jsonData)
    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            res.list[0].prepay_id = "prepay_id=" + res.list[0].prepay_id;
            console.log(res.list[0].prepay_id)
            var orderNum = res.list[0].orderNum;
            console.log(orderNum)
            wx.showLoading({ title: '加载中...' })
            wx.requestPayment({
               'timeStamp': res.list[0].timeStamp,
               'nonceStr': res.list[0].nonceStr,
               'package':  res.list[0].prepay_id,
               'signType': 'MD5',
               'paySign': res.list[0].appSign,
               'success':function(res){
                  console.log(res);
                  
                  wx.navigateTo({
                    url: '../cartend/cartend?orderNum=' + orderNum
                  })
               },
               'fail':function(res){
                console.log(res);
               }
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
  }
})