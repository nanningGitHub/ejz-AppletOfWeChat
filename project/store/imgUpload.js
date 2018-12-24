var Utils = require('../utils/utils.js')
var ImgUpload = {
  osstoken: function(fileName, callback) { //aliOSS接口
    var self = this
    wx.request({
      url: Utils.wxUrl + 'ali/osstoken.do',
      data: {
        fileName: fileName
      },
      method: 'GET',
      success: function(res) {
        var oss = res.data.dataMap;
        console.log(fileName)
        self.upload(fileName, oss.host, oss.fileName, oss.accessid, oss.policy, oss.signature, function() {
          callback(oss)
        })
      },
    })
  },
  upload: function(file, host, fileName, accessid, policy, signature, callback) { //上传图片
    wx.uploadFile({
      url: host,
      filePath: file,
      name: 'file',
      formData: {
        "key": fileName,
        "OSSAccessKeyId": accessid,
        "policy": policy,
        "Signature": signature,
        'success_action_status': '200',
      },
      success: function(res) {
        if (res.statusCode == 200) {
          // wx.showModal({
          //   title: '提示',
          //   content: '这是一个模态弹窗',
          // })
        }
      },
      complete: function() {
        callback()
      }
    })
  }
}

module.exports = ImgUpload