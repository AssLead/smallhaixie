// pages/old/old.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownMinute: 0,  
    countDownSecond: 0, 
    showView: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var totalSecond = 1520249527 - Date.parse(new Date())/1000;  
  
    var interval = setInterval(function () {  
      // 秒数  
      var second = totalSecond;  
  
      // 天数位  
      var day = Math.floor(second / 3600 / 24);  
      var dayStr = day.toString();  
      if (dayStr.length == 1) dayStr = '0' + dayStr;  
  
      // 小时位  
      var hr = Math.floor((second - day * 3600 * 24) / 3600);  
      var hrStr = hr.toString();  
      if (hrStr.length == 1) hrStr = '0' + hrStr;  
  
      // 分钟位  
      var min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);  
      var minStr = min.toString();  
      if (minStr.length == 1) minStr = '0' + minStr;  
  
      // 秒位  
      var sec = second - day * 3600 * 24 - hr * 3600 - min*60;  
      var secStr = sec.toString();  
      if (secStr.length == 1) secStr = '0' + secStr;  
  
      this.setData({  
        /*countDownDay: dayStr,  
        countDownHour: hrStr, */ 
        countDownMinute: minStr,  
        countDownSecond: secStr,  
        
      });  
      totalSecond--;  
      if (totalSecond < 0) {  
        clearInterval(interval);  
        /*wx.showToast({  
          title: '活动已结束',  
        }); */ 
        this.setData({  
          /*countDownDay: '00',  
          countDownHour: '00',  */
          countDownMinute: '00',  
          countDownSecond: '00', 
          showView: false 
        });  
      } else {
        this.setData({  
          showView: true 
        });  
      }  
    }.bind(this), 1000);  
  },

  
})