/**
 * 小程序配置文件
 */






/**
 * prod
 */
var host = 'https://www.qplant.vip/VisonShop';



var config = {
  //主机
  host: `${host}`,

  //banner
  carouselImage: `${host}/banner`,

  imageUrl:'${host}/imageaction?type=5&name=',


  //数据接口调用
  apiBase: `${host}`,

  // 登录地址，用于建立会话
  loginUrl: `${host}/login`,

  // 测试的请求地址，用于测试会话
  requestUrl: `${host}/testRequest`,

  // 用code换取openId
  openIdUrl: `${host}/openid`,

  // 测试的信道服务接口
  tunnelUrl: `${host}/tunnel`,

  // 生成支付订单的接口
  paymentUrl: `${host}/payment`,

  // 发送模板消息接口
  templateMessageUrl: `${host}/templateMessage`,

  // 上传文件接口
  uploadFileUrl: `${host}/upload`,

  // 下载示例图片接口
  downloadExampleUrl: `${host}/static/weapp.jpg`
};

module.exports = config
