var Utils = require('../utils/utils.js');
var Map = {
    getLocation: function (latitude,longitude,callback) { //GPS定位
        wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/',
            data: {
                location: latitude + "," + longitude,
                key: "NXHBZ-RISHX-XG24X-7J4Y2-OYCHJ-OAFHT"
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            },
            fail: function () {
                console.log('定位失败！')
            }
        })
    },
    getCity: function (cityName, callback) { //获取城市Id
        wx.request({
            url: Utils.wxUrl + 'api/city/getCity.do',
            data: {
                cityName: cityName
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    getProvince: function (callback) { //获取省
        wx.request({
            url: Utils.wxUrl + 'api/city/getProvince.do',
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    getChildrenCity: function (parentId, callback) { //获取市
        wx.request({
            url: Utils.wxUrl + 'api/city/getChildrenCity.do',
            data: {
                parentId: parentId
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    getArea: function (parentId, callback) { //获取地区
        wx.request({
            url: Utils.wxUrl + 'api/city/getArea.do',
            data: {
                parentId: parentId
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    }
}

module.exports = Map;