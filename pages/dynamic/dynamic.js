var app = getApp();
var request = require("../../utils/request.js");

Page({
  data: {
    dynamicList: null,
  },
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' })
    
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

    var jsonData = {userId:userId};

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        if (res.code == 'success') {
            var dynamicList = res.list;
            console.log(dynamicList);
            
            for(let i=0; i<dynamicList.length; i++) {
                if (dynamicList[i].activitiBean != undefined) {
                  if (dynamicList[i].activitiBean.activitiImg != undefined) {
                    dynamicList[i].activitiBean.activitiImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+dynamicList[i].activitiBean.activitiImg.split(',')[0]
                  }
                }
                dynamicList[i].userbean.portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+dynamicList[i].userbean.portrait + "&type=2"
                
            }
            that.setData({  
                dynamicList: dynamicList
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
  onReady: function () {
    // 页面渲染完成
  },
  note: function(e) {
    var id = e.currentTarget.dataset.activitiid;
    console.log(id)
    if (id == undefined) {return}
    wx.navigateTo({
      url: '../note/note?id=' + id
    })
  },
  xhnote: function(e) {
    var id = e.currentTarget.dataset.associationid;
    console.log(id)
    wx.navigateTo({
      url: '../xh-note/xh-note?id=' + id
    })
  },
  
})