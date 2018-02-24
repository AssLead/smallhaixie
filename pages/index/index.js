//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

    banner:
     ['http://i.dxlfile.com/adm/material/2016_12_12/20161212135600242250.jpg',
      'http://i.dxlfile.com/adm/material/2017_01_04/2017010411165785666.jpg',
      'http://i.dxlfile.com/adm/material/2017_01_04/20170104140739205869.jpg',
      'http://i.dxlfile.com/adm/material/2017_01_16/20170116171332214897.jpg'],
    functions: [
     
    ],
  },
  onLoad: function () {

  },
  fucClick(event) {
    const id = event.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      // url: '../storelist/storelist',
    })

  },
  goodDetail(event) {
    wx.navigateTo({
      // url: '../goods/goods',
    })
  }

})
