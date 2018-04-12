var app = getApp();
var request = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:null,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorcolor:'#fff',
    indicatoractivecolor:'#00a69a',
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
    }],
    activitiState:true
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
    wx.showLoading({ title: '加载中...' })

    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });
    console.log(options)
    that.setData({
        id:options.id,
        activitiState:options.activitiState
    })

    // findActiviti
    var requestUrl = "findActiviti";

    var jsonData = {
        id:that.data.id,
    };

    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        wx.showLoading({ title: '加载中...' })
        if (res.code == 'success') {
            var activelist = res.list;
            
            for(let i=0; i<activelist.length; i++) {
                if (activelist[i].activitiImg != undefined) {
                  activelist[i].activitiImg = activelist[i].activitiImg.split(',');
                }
                if (activelist[i].userBean != undefined) {
                  activelist[i].userBean.portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+activelist[i].userBean.portrait + '&type=2';
                }
                
            }
            var markers = new Array();
            if (activelist[0].longitude != undefined) {
              var writer = {
                iconPath: "/images/location.png",
                id: 0,
                latitude: activelist[0].longitude.split(",")[0],
                longitude: activelist[0].longitude.split(",")[1],
                width: 50,
                height: 50,
                callout: {
                  content: activelist[0].address,
                  color:'#000',
                  fontSize: '14',
                  borderRadius: '10',
                  bgColor:'white',
                  padding: '10',
                  display: 'ALWAYS',
                  textAlign:'center'
                },
                /*label: {
                  content:activelist[0].address,
                  color:'#000',
                  fontSize: '14',
                  x: activelist[0].longitude.split(",")[0],
                  y: activelist[0].longitude.split(",")[1],
                  bgColor:'#white',
                  textAlign:'center'
                }*/

              }
              that.setData({  
                latitude: activelist[0].longitude.split(",")[0],
                longitude: activelist[0].longitude.split(",")[1],
              }) 
            }
            
            markers.push(writer);
            var slist = activelist[0].slist;
            if (slist == "") {
              that.setData({  
                hide:'hide'
              }) 
            }
            var mlist = activelist[0].mlist;
            that.setData({  
              mlist: mlist
            }) 
            if (mlist == "") {
              that.setData({  
                mhide:'hide'
              }) 
            }
            if (mlist.length < 3) {
              that.setData({  
                mmhide:'hide'
              }) 
            }
            for(let i=0; i<mlist.length; i++) {
              if (mlist[i].userBean != undefined) {
                mlist[i].userBean.portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+ mlist[i].userBean.portrait + '&type=2';
              }
            }
            for(let i=0; i<slist.length; i++) {
              if (slist[i].activitiImg != undefined) {
                slist[i].activitiImg = 'http://www.qplant.vip/VisonShop/imageaction?name='+ slist[i].activitiImg.split(',')[0];
              }
            }
            that.setData({  
              activelist: activelist[0],
              markers:markers,
              joinlist:activelist[0].joinlist,
              

            }) 
            console.log(activelist);
            var imgUrls=activelist[0].activitiImg;

            if (imgUrls != undefined) {
              for(let i=0; i<imgUrls.length; i++) {
                imgUrls[i] = 'http://www.qplant.vip/VisonShop/imageaction?name='+ imgUrls[i];
              }
            }
            
            var joinimgUrls=activelist[0].joinlist;
            if (joinimgUrls != undefined) {
              for(let i=0; i<joinimgUrls.length; i++) {
                joinimgUrls[i].portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+ joinimgUrls[i].portrait+ '&type=2';
              }
            }
            
            

            that.setData({  
              imgUrls:imgUrls,
              joinimgUrls:joinimgUrls,
              
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
    var list = JSON.stringify(this.data.mlist);
    wx.navigateTo({
      url: '../message/message?list=' + list 
    })
  },
  morejoin: function() {
    //console.log(this.data.joinlist)
    var list = JSON.stringify(this.data.joinlist);
    console.log(list)
    wx.navigateTo({
      url: '../joinuser/joinuser?list=' + list 
    })
  },
  actdetail: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../note/note?id=' + id
    })
  },
  content: function(e){

    this.setData({
      'content': e.detail.value
    })
  },
  send: function(e) {
    var that = this;
    // console.log(e)
    var id = e.currentTarget.dataset.id;
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
    // addActivitiMessage
    var requestUrl = "addActivitiMessage";

    var jsonData = {
      id:id,
      userId:userId,
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
            var pages = getCurrentPages()    //获取加载的页面

            var currentPage = pages[pages.length-1]    //获取当前页面的对象

            var url = currentPage.route
            console.log(url)
            wx.redirectTo({
              url: '/' + url + '?id=' + that.data.id
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
                  wx.showLoading({ title: '加载中...' })
                  setTimeout(function () {  
                    wx.navigateTo({
                      url: '../cartend/cartend?orderNum=' + orderNum
                    })
                  }, 2000)
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