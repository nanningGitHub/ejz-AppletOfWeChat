var Utils = require('../utils/utils.js');
var JobOffline = {
    getList: function (cityId, mainJobType, subJobType, latitude, longitude, pageNo, pageSize, callback) { //获取职位列表
        wx.request({
            url: Utils.wxUrl + 'api/job/offline/getList.do',
            data: {
                cityId: cityId,
                mainJobType: mainJobType,
                subJobType: subJobType,
                latitude: latitude,
                longitude: longitude,
                pageNo: pageNo,
                pageSize: pageSize
            },
            method: 'GET',
            success: function (res) { 
                callback(res.data)
            }
        })
    },
    getisdeliver: function (token, jobOfflineId, callback) { //查询用户是否投递了简历接口
        wx.request({
            url: Utils.wxUrl + 'api/job/offline/getisdeliver.do',
            data: {
                token: token,
                jobOfflineId: jobOfflineId
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    },
    deliverResume: function (token, jobOfflineId, callback) { //线下兼职投递接口
        wx.request({
            url: Utils.wxUrl + 'api/job/offline/deliverResume.do',
            data: {
                token: token,
                jobOfflineId: jobOfflineId
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
    deldeliverResume: function (token, jobOfflineId, callback) { //取消兼职投递接口
        wx.request({
            url: Utils.wxUrl + 'api/job/offline/deldeliverResume.do',
            data: {
                token: token,
                jobOfflineId: jobOfflineId
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
        })
    }
}

module.exports = JobOffline;