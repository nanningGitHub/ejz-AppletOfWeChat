var Utils = require('../utils/utils.js');
var Intent = {
    getJobType: function (callback) { //获取意向
        wx.request({
          url: Utils.wxUrl + 'api/job/offline/mainJobType.do',
            method: 'GET',
            success: function (res) {
                wx.setStorage({
                    key: 'intent',
                    data: res.data.dataMap.jobtypeList,
                })
                callback(res.data)
            }
        })
    }
}

module.exports = Intent;