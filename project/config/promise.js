const Promise = require("../plugins/es6-promise.js")
// const openUrl = "https://openapi.ejzhi.com/"      //线上地址
const openUrl = "http://localtestapi.ejzhi.com/" //测试地址
// const openUrl = "http://192.168.0.107:8081/" //后台地址
// const app = getApp()

function wxPromisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        //成功
        if (res.data.code !== 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          reject(res)
          return
        }
        resolve(res.data)
      }
      obj.fail = function(res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
  console.log()
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: openUrl + url,
    method: 'GET',
    data: {
      ...data,
      ...{
        'weChatTag': 1
      }
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    }
  })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: openUrl + url,
    method: 'POST',
    data: {
      ...data,
      ...{
        'weChatTag': 1
      }
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest,
  openUrl: openUrl
}