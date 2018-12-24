var Utils = require('../utils/utils.js');
var Enterprise = {
    showEntInfo: function (token, callback) { //展示企业信息(企业端)
        wx.request({
            url: Utils.wxUrl + 'api/qy/enterprise/showEntInfo.do',
            method: 'GET',
            data: {
                token: token
            },
            success: function (res) {
                callback(res.data)
            },
        })
    },
    getIndustry: function (callback) { //获取企业行业列表(企业端)
        wx.request({
            url: Utils.wxUrl + 'api/qy/enterprise/getIndustry.do',
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
    getScale: function (callback) { //获取企业规模列表(企业端)
        wx.request({
            url: Utils.wxUrl + 'api/qy/enterprise/getScale.do',
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
    getNature: function (callback) { //获取企业性质列表(企业端)
        wx.request({
            url: Utils.wxUrl + 'api/qy/enterprise/getNature.do',
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
    addOrEditInfo: function (token, name, address, linkName, mobile, intro, logoName, email, industryId, scaleId, natureId, longitude, latitude, callback) { //添加或编辑企业信息接口
        wx.request({
            url: Utils.wxUrl + 'api/qy/enterprise/addOrEditInfo.do',
            data: {
                token: token,
                name: name,
                address: address,
                linkName: linkName,
                mobile: mobile,
                intro: intro,
                logoName: logoName,
                email: email,
                industryId: industryId,
                scaleId: scaleId,
                natureId: natureId,
                longitude: longitude,
                latitude: latitude
            },
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                callback(res.data)
            },
        })
    },
    showAuth: function (token, callback) { //认证展示:个人和企业认证都用此接口(企业端)
        wx.request({
            url: Utils.wxUrl + 'api/qy/enterprise/showAuth.do',
            data: {
                token: token
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    }
}

module.exports = Enterprise;