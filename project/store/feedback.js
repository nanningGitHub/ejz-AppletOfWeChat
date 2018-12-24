var Utils = require('../utils/utils.js');
var Feedback = {
    suggest: function (token, contactTel, content, callback) { //意见反馈接口
        wx.request({
            url: Utils.wxUrl + 'api/suggest/add.do',
            data: {
                token: token,
                contactTel: contactTel,
                content: content
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    }
}

module.exports = Feedback;