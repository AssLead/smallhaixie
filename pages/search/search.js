var app = getApp();
var request = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mhide: 'hide',
    historyList:[],
    _num:'9999',
  },
  onLoad: function (options) {

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

    var historyList = wx.getStorageSync('historyList');
    console.log(historyList)
    if (historyList != "") {
      that.setData({ 
        historyList: historyList,
      })
    } 
    
  },
  onReady: function () {
  
  },
  wxSearchInput: function (e) {
    var that = this;
    console.log(e.detail.value)
    var requestUrl = "findAssociation";
    var associationName = e.detail.value;
    if (associationName != "") {
      setTimeout(function(){
        wx.showLoading({})
        that.findAssociation(associationName,'show')
      },1000)
    }
    
  },
  selectThis: function(e) {
    var that = this;
    var associationName = e.currentTarget.dataset.id;
    
    that.findAssociation(associationName,'hide');
    that.setData({ 
        wxSearchDatavalue: associationName,
    }) 
  },
  historyThis: function(e) {
    var that = this;
    var associationName = e.currentTarget.dataset.id;
    
    setTimeout(function(){
        wx.showLoading({})
        that.findAssociation(associationName,'show')
    },1000)
    that.setData({ 
        wxSearchDatavalue: associationName,
    })
  },
  hotsearch: function(e) {
    var that = this;
    console.log(e)
    var associationName = e.currentTarget.dataset.text;
    
    that.findAssociation(associationName,'hide');

  },
  delect: function(e) {
    /*var that = this
    console.log(e);
    var _num = e.currentTarget.dataset.num;
    console.log(_num)
    this.setData({ 
        _num: _num,
    })*/
    var that = this;
    var associationName = e.currentTarget.dataset.text
    removeByValue(that.data.historyList, associationName);
    console.log(that.data.historyList);

    wx.setStorageSync('historyList', that.data.historyList);
    var pages = getCurrentPages()    //获取加载的页面

    var currentPage = pages[pages.length-1]    //获取当前页面的对象

    var url = currentPage.route

    wx.redirectTo({
                  url: '/' + url
                })
  },
  findAssociation: function(associationName,hide) {
    var that = this;
    var requestUrl = "findAssociation";
    var associationName = associationName;
    var jsonData = {associationName:associationName};
        console.log(jsonData)
        request.httpsPostRequest(requestUrl,jsonData,function(res){
            console.log(res);
            console.log(associationName);
            removeByValue(that.data.historyList, associationName);
            that.data.historyList.unshift(associationName);

            //console.log(that.data.historyList);
            wx.setStorageSync('historyList', that.data.historyList);
            if (res.code == 'success') {
                var associationList  = res.list;
                var associationNameList = [];
                for(let i=0; i<associationList.length; i++) {
                  associationNameList.push(associationList[i].associationName)
                }
                if (hide != "hide") {
                  that.setData({ 
                      mhide:'',
                      associationNameList: associationNameList,
                  })

                } else {
                  that.setData({ 
                      mhide:'hide',
                      associationNameList: associationNameList,
                  })
                  var id = associationList[0].id;
                  console.log(id)
                  wx.navigateTo({
                    url: '../xhxq/xhxq?id=' + id
                  })
                }
                 

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
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}