var app = getApp();
var request = require("../../utils/request.js");
var util = require("../../utils/util.js");
Page({
  data: {
    dynamicList: null,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });

    // getDynamicList
    var requestUrl = "getDynamicList";
    var userId = wx.getStorageSync('userDetail').id;
    var that = this;

    // console.log(that.data.userDetail);
    var jsonData = {
        // userId:userId,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({
          // title: '登录中...',
        })
        if (res.code == 'success') {
            var dynamicList = res.list;
            console.log(dynamicList);
            
            for(let i=0; i<dynamicList.length; i++) {
                dynamicList[i].activitiBean.activitiImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+dynamicList[i].activitiBean.activitiImg.split(',')[0]
                // console.log(util.formatTime(dynamicList[i]["createDate"],'Y/M/D h:m:s'));
                console.log()
                dynamicList[i].createDate = util.formatTime(dynamicList[i]["createDate"],'Y/M/D h:m:s')
            }
            that.setData({  
                dynamicList: dynamicList
            })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
        }
      }
    )
  },
  onReady: function () {
    // 页面渲染完成
  },
  note: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../note/note?id=' + id
    })
  },
  xhnote: function() {
    wx.navigateTo({
      url: '../xh-note/xh-note'
    })
  },
  
})