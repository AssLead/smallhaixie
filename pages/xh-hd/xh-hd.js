var app = getApp();
var request = require("../../utils/request.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArray: ['康乐','文化','艺术','运动','培训','招聘','企业走访','资源对接','政府资源','国外走访','慈善','创业'],
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
    that.findAssActiviti("findAssActiviti","","");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  findAssActiviti: function(requestUrl,activitiType,value) {
    wx.showLoading({ title: '加载中...' })
    var that = this;
    // console.log(type)
    var requestUrl = requestUrl;
    var associationId = that.data.id;

    var jsonData = {
        activitiType: value,
        serachDate: value,
        associationId:associationId,
    };
    console.log(requestUrl)
    console.log(jsonData)

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
                console.log()
                //activelist[i].startDate = util.formatTime(activelist[i]["startDate"],'Y/M/D h:m:s')
                //activelist[i].endDate = util.formatTime(activelist[i]["endDate"],'Y/M/D h:m:s')

            }
            that.setData({  
                activelist: activelist
            })  
            wx.hideLoading();
        } else {
          wx.hideLoading();
          that.setData({  
            activelist: ''
          })
          wx.showToast({
            title: '暂无活动',
            icon: 'none',
            duration: 2000
          })
        }
      }
    )
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2:'',
      date: e.detail.value
    })
    this.findAssActiviti("findActivitiDate","serachDate",e.detail.value);

  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,
      date:""
    })
    this.findAssActiviti("findActivitiType","activitiType",this.data.typeArray[e.detail.value]);
  },
  activeDetail: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../note/note?id=' + id
    })
  },
  joinActiviti: function(e) {
    console.log(1111)
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