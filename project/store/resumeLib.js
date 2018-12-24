var Utils = require('../utils/utils.js');
var ResumeLib = {
    getList: function (token, cityId, mainJobTypeId, subJobTypeId, pageNo, pageSize, callback) { //查询简历
        wx.request({
            url: Utils.wxUrl + 'api/resume/getList.do',
            data: {
                token: token,
                cityId: cityId,
                mainJobTypeId: mainJobTypeId,
                subJobTypeId: subJobTypeId,
                pageNo: pageNo,
                pageSize: pageSize
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    getSingle: function (token, userId, callback) { //查看单份简历详情
        wx.request({
            url: Utils.wxUrl + 'api/resume/getSingle.do',
            data: {
                token: token,
                userId: userId,
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    ifBuyResume: function (token, resumeId, callback) { //判断是否购买过某人的简历
        wx.request({
            url: Utils.wxUrl + 'api/resume/ifBuyResume.do',
            data: {
                token: token,
                resumeId: resumeId,
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    getSurplus: function (token, callback) { //简历剩余数量
        wx.request({
            url: Utils.wxUrl + 'api/resume/getSurplus.do',
            data: {
                token: token,
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    buyResume: function (token, resumeId, callback) { //购买单份简历
        wx.request({
            url: Utils.wxUrl + 'api/resume/buyResume.do',
            data: {
                token: token,
                resumeId: resumeId,
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    getPayList: function (token, pageNo, pageSize, callback) { //简历购买记录列表
        wx.request({
            url: Utils.wxUrl + 'api/resume/getPayList.do',
            data: {
                token: token,
                pageNo: pageNo,
                pageSize: pageSize
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    }
}

module.exports = ResumeLib;