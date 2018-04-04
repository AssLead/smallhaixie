var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {


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
    wx.showLoading({ title: '加载中...' })
    
    // 页面初始化 options为页面跳转所带来的参数
    app.isLogin(function (userDetail) {
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });

    // findWXresult
    var requestUrl = "findWXresult";
    var orderNum = options.orderNum;
    var that = this;

    var jsonData = {orderNum:orderNum};
    console.log(jsonData);
    request.httpsPostRequest(requestUrl,jsonData,function(res){
        console.log(res);
        if (res.code == 'success') {

            var activelist = res.list;
            
           /* for(let i=0; i<activelist.length; i++) {
                if (activelist[i].activitiImg != undefined) {
                  activelist[i].activitiImg = activelist[i].activitiImg.split(',');
                }
                if (activelist[i].userBean != undefined) {
                  activelist[i].userBean.portrait = 'http://www.qplant.vip/VisonShop/imageaction?name='+activelist[i].userBean.portrait + '&type=2';
                }
                
            }*/
            var markers = new Array();
            if (activelist[0].detailsBean.longitude != undefined) {
              var writer = {
                iconPath: "/images/location.png",
                id: 0,
                latitude: activelist[0].detailsBean.longitude.split(",")[0],
                longitude: activelist[0].detailsBean.longitude.split(",")[1],
                width: 50,
                height: 50,
                callout: {
                  content: activelist[0].detailsBean.address,
                  color:'#000',
                  fontSize: '14',
                  borderRadius: '10',
                  bgColor:'white',
                  padding: '10',
                  display: 'ALWAYS',
                  textAlign:'center'
                },
              }
              that.setData({  
                latitude: activelist[0].detailsBean.longitude.split(",")[0],
                longitude: activelist[0].detailsBean.longitude.split(",")[1],
              }) 
            }
            
            markers.push(writer);
            that.setData({  
              activelist: activelist[0],
              markers:markers
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

})