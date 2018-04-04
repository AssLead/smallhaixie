// pages/setting/setting.js
var app = getApp();
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:[],
    marriage: ['是', '否'],
    index: 0,
    items: [
      { name: '0', value: '游泳', checked: true,},
      { name: '1', value: '羽毛球', checked: false,},
      { name: '2', value: '足球', checked: false,},
      { name: '3', value: '跆拳道', checked: false,},
      { name: '4', value: '骑马', checked: false,},
      { name: '5', value: '拳击', checked: false,},
      { name: '6', value: '郊游', checked: false,},
      { name: '7', value: '射击', checked: false,}
    ],
    items2: [
      { name: '0', value: '听歌', checked: true,},
      { name: '1', value: '唱歌', checked: false,},
      { name: '2', value: '流星', checked: false,},
      { name: '3', value: '古典', checked: false,},
      { name: '4', value: '现场', checked: false,},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({ title: '加载中...' })
    var that=this;
    /*var tag1 = wx.getStorageSync('tag1');
    var tag2 = wx.getStorageSync('tag2');
    console.log(tag2)
    if(tag1 != "") {
      that.setData({
        tag2:JSON.parse(tag2),
      })
    }
    if(tag2 != "") {
      that.setData({
        tag2:JSON.parse(tag2),
      })
    }*/


    app.isLogin(function (userDetail) {
      console.log(userDetail)
      // 更新数据
      that.setData({
        userDetail: userDetail
      })
    });

    var user_key = wx.getStorageSync('user_key');
    // wx.setStorageSync('user_key', res.data.list[0].openid);
    wx.request({
        url: 'http://www.qplant.vip/VisonShop/getUserInfo',
        data: {
          openid: user_key,
        },
        method: 'GET',
        header: { 'content-type': 'application/json'},
        success: function(res){
          wx.hideLoading();
          console.log(res);
          wx.setStorageSync('userDetail', res.data.list[0]);
          var userDetail = wx.getStorageSync('userDetail');
          if(userDetail.marriage == "true") {
            that.setData({
              index: 0
            })
          } else {
            that.setData({
              index: 1
            })
          }
          if (userDetail.portrait != undefined) {
            that.setData({
              tempFilePaths:'http://www.qplant.vip/VisonShop/imageaction?name='+ userDetail.portrait + '&type=2',
            
            })
          }
          if (userDetail.hobby != "") {
            var hobby = JSON.parse(userDetail.hobby);
            
            var tiyu = hobby[0].体育;
            tiyu = tiyu.split(',');
            var yinyue = hobby[1].音乐;
            yinyue = yinyue.split(',');

            var newitems = that.data.items;
            var newitems2 = that.data.items2;

            for(var i = 0; i < tiyu.length; i++) {
              var text = tiyu[i];
              newitems.forEach(function(item){
                if(item['value'] == text){
                  item['checked'] = true;
                  console.log(item)
                }
              })
            }

            for(var i = 0; i < yinyue.length; i++) {
              var text = yinyue[i];
              newitems2.forEach(function(item){
                if(item['value'] == text){
                  item['checked'] = true;
                  console.log(item)
                }
              })
            }
            
            that.setData({
              items:newitems,
              items2:newitems2,

            })
            //console.log("游泳" in that.data.items)
          }
          that.setData({
            userDetail: userDetail
          })
          wx.hideLoading();
        }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  chooseimg: function () {
    var userId = wx.getStorageSync('userDetail').id;
    var that = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          that.setData({
            tempFilePaths:tempFilePaths,

          })
        }
      })
  },
  /*chooseTag: function() {
    var tag1 = JSON.stringify(this.data.tag1)
    wx.navigateTo({
      url: '../tag/tag?tag=' + tag1
    })
  },
  chooseTag2: function() {
    var tag2 = JSON.stringify(this.data.tag2)
    wx.navigateTo({
      url: '../tag2/tag2?tag=' + tag2
    })
  },*/
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function(e) {
    var that = this;
    var userId = wx.getStorageSync('userDetail').id;
    var value = e.detail.value;
    value.userId = userId;
    console.log(that.data.index)
    if (that.data.index=="0") {
      value.marriage = "true"
    } else {
      value.marriage = "false"
    }
    console.log(that.data.tempFilePaths);
    console.log(that.data.tag);
    var hobby1 = {};
    var hobby2 = {};
    var array1 = [];
    var array2 = [];
    console.log(that.data.tag2)
    if (that.data.items != undefined) {
      for(var i=0; i<that.data.items.length; i++) {
        if (that.data.items[i].checked == true ) {
          array1.push(that.data.items[i].value)
        }
      }
    }
    if (that.data.items2 != undefined) {
      for(var i=0; i<that.data.items2.length; i++) {
        if (that.data.items2[i].checked == true ) {
          array2.push(that.data.items2[i].value)
        }
      }
    }
    
    
    var key1 = "体育";  
    var hobbyvalue1 = array1.toString(); 
    var key2 = "音乐";  
    var hobbyvalue2 = array2.toString();   
    hobby1[key1] = hobbyvalue1;
    hobby2[key2] = hobbyvalue2;

    var hobby = [];
    hobby.push(hobby1,hobby2) 
    console.log(hobby);
    value.hobby = JSON.stringify(hobby);
    if (that.data.tempFilePaths.indexOf("type=2") != -1 ) {
      
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // console.log(that.data.tag);
    console.log('form发生了submit事件，携带数据为：', value);


    wx.uploadFile({
      url: 'http://www.qplant.vip/VisonShop/updataUserinfo', 
      filePath: that.data.tempFilePaths[0],
      name: 'portraitImg',
      formData:value,
      success: function(res){
        console.log(res);

        console.log(JSON.parse(res.data).code);
        
        if (JSON.parse(res.data).code == 'success') {
            wx.hideLoading();
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: JSON.parse(res.data).msg,
              icon: 'none',
              duration: 2000
          })
        }
      }
    })
  },

  checkChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    that.setData({
      value: e.detail.value
    })
    console.log(this.data.value)
    var items = this.data.items;
    console.log(this.data.items)
    var checkArr = e.detail.value;
    console.log(e.detail.value)
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      items: items
    })  
  },
  checkChange2: function (e) {
    var that = this
    that.setData({
      value2: e.detail.value
    })
    var items = this.data.items2;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      items2: items
    })  
  },
})