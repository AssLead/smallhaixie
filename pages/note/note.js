// pages/cartend/cartend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 22.5595700000,
      longitude: 114.0920100000,
      width: 50,
      height: 50,
      callout: {
        content:'深圳市体育中心123',
        color:'#000',
        fontSize: '14',
        borderRadius: '10',
        bgColor:'white',
        padding: '10',
        display: 'ALWAYS',
        textAlign:'center'

      },
      label: {
        content:'深圳市体育中心',
        color:'#000',
        fontSize: '14',
        x: '22.5595700000',
        y: '114.0920100000',
        bgColor:'#white',
        textAlign:'center'
      }

    }],
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  moreMessage: function() {
    wx.navigateTo({
      url: '../message/message'
    })
  }
})