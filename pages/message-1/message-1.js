var app = getApp();
var request = require("../../utils/request.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' })

    var that = this;

    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    
    console.log(options)
    that.setData({
      id:options.associationId,
    })


    var requestUrl = "getMessages";
    var associationId = that.data.id;

    var jsonData = {
        associationId:associationId,
    };


    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var messagelist = res.list;
            for(let i=0; i<messagelist.length; i++) {
                messagelist[i].userBean.portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+messagelist[i].userBean.portrait + "&type=2"
                
                console.log()
                //messagelist[i].createDate = util.formatTime(messagelist[i]["createDate"],'Y/M/D h:m:s')

            }
            that.setData({  
                messagelist: messagelist
            })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '暂无留言',
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

  addmessage: function() {
    var id = this.data.id;
    wx.navigateTo({
      url: '../addmessage/addmessage?id=' + id
    })
  }
})