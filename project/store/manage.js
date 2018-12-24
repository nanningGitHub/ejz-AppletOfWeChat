var Utils = require('../utils/utils.js');
var Manage = {
    loginForWinxin: function (openId, callback) { //微信用户登录接口
        wx.request({
            url: Utils.wxUrl + 'api/user/loginForWinxin.do',
            data: {
                openId: openId
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    phoneIsBangdForWinxin: function (phoneNumber, callback) { //微信用户验证手机号是否绑定微信接口
        wx.request({
            url: Utils.wxUrl + 'api/user/phoneIsBangdForWinxin.do',
            data: {
                phoneNumber: phoneNumber
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    sendCurrencySMS: function (phoneNumber, callback) { //发送绑定、注册验证码
        wx.request({
            url: Utils.wxUrl + 'api/user/sendCurrencySMS.do',
            data: {
                phoneNumber: phoneNumber
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    bangedForWinxin: function (openId, phoneNumber, validateCode, callback) { //已存在用户绑定微信接口
        wx.request({
            url: Utils.wxUrl + 'api/user/bangedForWinxin.do',
            data: {
                openId: openId,
                phoneNumber: phoneNumber,
                validateCode: validateCode
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    registerForWinxin: function (openId, phoneNumber, validateCode, password, callback) { //微信用户注册
        wx.request({
            url: Utils.wxUrl + 'api/user/registerForWinxin.do',
            data: {
                openId: openId,
                phoneNumber: phoneNumber,
                validateCode: validateCode,
                password: password
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    reGetToken: function (token, callback) { //重新获取token
        wx.request({
            url: Utils.wxUrl + 'api/user/reGetToken.do',
            data: {
                token: token
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    }
}

module.exports = Manage;