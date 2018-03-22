var app = getApp();
var request = require("../../utils/request.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:null,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 22.5595700000,
      longitude: 114.0920100000,
      width: 50,
      height: 50,
      callout: {
        content:'深圳市体育中心123',
        color:'#000',
        fontSize: '14',
        borderRadius: '10',
        bgColor:'white',
        padding: '10',
        display: 'ALWAYS',
        textAlign:'center'

      },
      label: {
        content:'深圳市体育中心',
        color:'#000',
        fontSize: '14',
        x: '22.5595700000',
        y: '114.0920100000',
        bgColor:'#white',
        textAlign:'center'
      }

    }],
    controls: [{
      id: 1,
      iconPath: '/images/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({})
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    that.setData({
        id:options.id,
    })

    // findActiviti
    var requestUrl = "findActiviti";

    var jsonData = {
        id:that.data.id,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({})
        if (res.code == 'success') {
            var activelist = res.list;
            
            for(let i=0; i<activelist.length; i++) {
                activelist[i].activitiImg = activelist[i].activitiImg.split(',');
                activelist[i].startDate = util.formatTime(activelist[i]["startDate"],'Y/M/D h:m:s')
                activelist[i].endDate = util.formatTime(activelist[i]["endDate"],'Y/M/D h:m:s')
            }
            that.setData({  
                activelist: activelist[0],

            }) 
            console.log(activelist);
            var imgUrls=activelist[0].activitiImg;
            
            for(let i=0; i<imgUrls.length; i++) {
              imgUrls[i] = 'http://www.qplant.vip/VisonShop/imageaction?name='+ imgUrls[i];
            }
            that.setData({  
                imgUrls:imgUrls
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  moreMessage: function() {
    wx.navigateTo({
      url: '../message/message'
    })
  }
})