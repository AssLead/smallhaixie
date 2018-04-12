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

    // getCommunity
    var requestUrl = "getCommunity";
    var associationId = that.data.id;

    var jsonData = {
        associationId:associationId,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var communitylist = res.list;
            for(let i=0; i<communitylist.length; i++) {
               communitylist[i].imgs = communitylist[i].imgs.map(function(i){return  'http://www.qplant.vip/VisonShop/imageaction?name=' + i +'&type=3'})
            }
            for(let i=0; i<communitylist.length; i++) {
              if (communitylist[i].userBean.portrait != undefined) {
                communitylist[i].userBean.portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+communitylist[i].userBean.portrait + "&type=2"
              }
            }
            that.setData({  
                communitylist:communitylist
            }) 
            
            wx.hideLoading();
        } else {
          wx.hideLoading();
          /*that.setData({  
            activelist: ''
          })*/
          wx.showToast({
            title:  res.msg,
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
  showsend:function (e) {
    this.setData({
      _num: e.currentTarget.dataset.id
    })
  },
  addPraise: function (e) {
    var that =this;
    // console.log(e)
    var communityId = e.currentTarget.dataset.id;
    // addPraise
    var requestUrl = "addPraise";

    var jsonData = {
      communityId:communityId
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        if (res.code == 'success') {
            wx.showToast({
              title: "点赞成功",
              icon: 'success',
              duration: 2000
            })
            var pages = getCurrentPages()    //获取加载的页面

            var currentPage = pages[pages.length-1]    //获取当前页面的对象

            var url = currentPage.route

            wx.redirectTo({
              url: '/' + url + '?associationId=' + that.data.id
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
  },
  content: function(e){

    this.setData({
      'content': e.detail.value
    })
  },
  send: function(e) {
    var that = this;
    // console.log(e)
    var communityId = e.currentTarget.dataset.id;
    var userId = wx.getStorageSync('userDetail').id;
    var content = this.data.content;
    if (content == "") {
      wx.showToast({
        title: "不能为空",
        icon: 'success',
        duration: 2000
      })
      return
    }
    // addCommunitySpeech
    var requestUrl = "addCommunitySpeech";

    var jsonData = {
      communityId:communityId,
      userid:userId,
      content:content
    };
    console.log(jsonData)
    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        if (res.code == 'success') {
            wx.showToast({
              title: "留言成功",
              icon: 'success',
              duration: 2000
            })
            that.setData({
              _num: null,
            })
            var pages = getCurrentPages()    //获取加载的页面

            var currentPage = pages[pages.length-1]    //获取当前页面的对象

            var url = currentPage.route
            console.log(url)
            wx.redirectTo({
              url: '/' + url + '?associationId=' + that.data.id
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
  },
})