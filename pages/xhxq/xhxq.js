var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isjoin:'申请加入',
    join:false,
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

    that.setData({
        id:options.id,
    })

    // findAssociation
    var requestUrl = "findAssociation";
    var associationId = that.data.id;

    var jsonData = {
        associationId:associationId,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var associationList = res.list[0];
            console.log(associationList);
            // var userId = 65;

            var userId = wx.getStorageSync('userDetail').id;
            associationList.associationImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+ associationList.associationImg  + '&type=1';
            associationList.banners = associationList.banners.map(function(i){return  'http://www.qplant.vip/VisonShop/imageaction?name=' + i +'&type=1'})
            //associationList.ulist.portrait = associationList..ulist.portrait.map(function(i){return  'http://www.qplant.vip/VisonShop/imageaction?name=' + i +'&type=2'})
            for(let i=0; i<associationList.ulist.length; i++) {
                if (associationList.ulist[i].portrait != undefined) {
                  associationList.ulist[i].portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+associationList.ulist[i].portrait+'&type=2'
                }

                if (associationList.ulist[i].userId == userId) {
                  that.setData({  
                      isjoin: '已加入',
                      join: true
                  })
                } 
            }
            that.setData({  
                associationList: associationList
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
  more: function() {
    var associationId = this.data.id;
    wx.navigateTo({
      url: '../associationuser/associationuser?associationId=' + associationId
    })
  },
  addAssociationUser: function() {
    var that = this;
    var join = this.data.join;
    if (join) {
      var id = that.data.id;
      wx.navigateTo({
        url: '../xh-note/xh-note?id=' + id
      })
    } else {
      // addAssociationUser 
      var requestUrl = "addAssociationUser";
      var userId = wx.getStorageSync('userDetail').id;

      var jsonData = {
          associationId:that.data.id,
          userId:userId,
      };
      console.log(jsonData)
      request.httpsPostRequest(requestUrl,jsonData,function(res){
          console.log(res);
          wx.showLoading({ title: '加载中...' })
          if (res.code == 'success') {
              that.setData({  
                isjoin: '已加入',
                join: true
              })
              wx.showToast({
                title: res.msg,
                icon: 'success',
                duration: 2000
              })
              wx.hideLoading();
              var id = that.data.id;
              wx.navigateTo({
                url: '../xh-note/xh-note?id=' + id
              })
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
  }
})
