var app = getApp()
var Utils = require('../../../utils/utils.js')
var JobOffline = require('../../../store/jobOffline.js')
var Map = require('../../../store/map.js')
Page({
    data: {
        portrait: "../../../images/portrait.png",
        item: {},
        finded: false,
        isListShow: false,
        mainJobType: "",
        subJobType: "",
        latitude: "",
        longitude: "",
    },
    cityId: '',
    pageNo: 1,
    pageSize: 1,
    last_update: 0,
    last_x: 0,
    last_y: 0,
    last_z: 0,
    isShow: false,//判断是否为当前页，销毁重力感应
    toggleList: function () {
        this.setData({
            isListShow: !this.data.isListShow
        })
    },
    checkResume: function () {
        wx.getStorage({
            key: 'userName',
            success: function (res) {
                wx.navigateTo({
                    url: '../../userCenter/resume/resume',
                })
            },
            fail: function () {
                wx.navigateTo({
                    url: '../../userCenter/editResume/editResume',
                })
            },
        })
    },
    toJobDetail: function () {
        wx.navigateTo({
            url: '../jobDetail/jobDetail?jobData=' + JSON.stringify(this.data.item)
        })
    },
    getList: function (cityId, mainJobType, subJobType, latitude, longitude, pageNo, pageSize) {
        var self = this
        JobOffline.getList(cityId, mainJobType, subJobType, latitude, longitude, pageNo, pageSize, function (data) {
            var dataList = data.dataMap.jobOfflinePage.dataList
            if (dataList.length) {
                var jobData = dataList[0]
                jobData.image = Utils.imgLogo(jobData.jobSubtypeId)
                jobData.startTime = Utils.getLocalTime(jobData.startDate)
                jobData.endTime = Utils.getLocalTime(jobData.endDate)
                jobData.lastFreshTime = Utils.getLocalTime(jobData.lastFreshDate)
                jobData.startWorkTime = Utils.getTime(jobData.startDate)
                jobData.endWorkTime = Utils.getTime(jobData.endDate)
                self.setData({
                    finded: true,
                    item: jobData
                })
                self.pageNo = self.pageNo + 1
                setTimeout(function () {
                    self.isShow = true
                }, 2000)
            } else {
                wx.showModal({
                    title: '全部看完啦',
                    content: '该类型兼职已全部浏览完成，继续摇一摇将从第一条开始哦~',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                            self.pageNo = 0
                            self.isShow = true
                        }
                    }
                })
            }
        })
    },
    onLoad: function (option) {
        var self = this;
        this.setData({
            mainJobType: option.mainJobType,
            subJobType: option.subJobType
        })
        wx.getLocation({//获取当前坐标
            type: 'wgs84',
            success: function (res) {
                self.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                })
                Map.getLocation(res.latitude, res.longitude, function (data) {
                    Map.getCity(data.result.ad_info.city, function (data) {
                        self.cityId = data.dataMap.cityId
                    })
                })
            },
            fail: function () {
                self.cityId = 3924
                console.log('定位失败')
            }
        })
    },
    onShow: function () {
        var self = this;
        self.isShow = true;
        wx.onAccelerometerChange(function (e) {
            if (!self.isShow) {
                return false
            }
            var curTime = new Date().getTime()
            if ((curTime - self.last_update) > 100) {
                var diffTime = curTime - self.last_update
                self.last_update = curTime
                var x = e.x
                var y = e.y
                var z = e.z
                var speed = Math.abs(x + y + z - self.last_x - self.last_y - self.last_z) / diffTime * 10000
                if (speed > 100) {
                    self.isShow = false;
                    self.getList(self.cityId, self.data.mainJobType, self.data.subJobType, self.data.latitude, self.data.longitude, self.pageNo, self.pageSize)
                }
                self.last_x = x;
                self.last_y = y;
                self.last_z = z;
            }
        })
    },
    onHide: function () {
        this.isShow = false
        this.setData({
            isListShow: false
        })
    },
    onUnload: function () {
        this.isShow = false
        this.setData({
            isListShow: false
        })
    }
})
