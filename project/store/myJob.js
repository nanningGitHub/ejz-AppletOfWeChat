var Utils = require('../utils/utils.js');
var MyJob = {
    getJobOfflineList: function (token, page, callback) { // 我的-我的投递-全部
        wx.request({
            url: Utils.wxUrl + 'api/jobRequest/getJobOfflineList.do',
            data: {
                token: token,
                page: page
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
    getDaiLuYongList: function (token, page, callback) { // 我的-我的投递-待录用
        wx.request({
            url: Utils.wxUrl + 'api/jobRequest/getDaiLuYongList.do',
            data: {
                token: token,
                page: page
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
    getDaiShangGangList: function (token, page, callback) { // 我的-我的投递-待上岗
        wx.request({
            url: Utils.wxUrl + 'api/jobRequest/getDaiShangGangList.do',
            data: {
                token: token,
                page: page
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
    getDaiJieSuanList: function (token, page, callback) { // 我的-我的投递-待结算
        wx.request({
            url: Utils.wxUrl + 'api/jobRequest/getDaiJieSuanList.do',
            data: {
                token: token,
                page: page
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
    getYiJieSuanList: function (token, page, callback) { // 我的-我的投递-已结算
        wx.request({
            url: Utils.wxUrl + 'api/jobRequest/getYiJieSuanList.do',
            data: {
                token: token,
                page: page
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
    getShangGangJiLu: function (token, jobId, callback) { // 我的-我的投递-上岗记录
        wx.request({
            url: Utils.wxUrl + 'api/jobRequest/getShangGangJiLu.do',
            data: {
                token: token,
                jobId: jobId
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
}

module.exports = MyJob;