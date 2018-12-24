var app = getApp()
var Intent = require('../../../store/intent.js')
Page({
    data: {
        jobTypeList: []
    },
    getJobType: function () {
        var self = this
        Intent.getJobType(function (data) {
            self.setData({
                jobTypeList: data.dataMap.jobtypeList
            })
            wx.hideToast();
        })
    },
    onLoad: function () {
        wx.showToast({
            icon: 'loading',
            duration: 10000
        })
        try {
            var intent = wx.getStorageSync('intent')
            if (intent) {
                this.setData({
                    jobTypeList: intent
                })
                wx.hideToast();
            } else {
                this.getJobType()
            }
        } catch (e) {
            this.getJobType()
        }
    }
})
