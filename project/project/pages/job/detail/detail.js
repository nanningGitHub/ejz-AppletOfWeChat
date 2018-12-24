var app = getApp()
var Utils = require('../../../utils/utils.js')
var wxRequest = require('../../../config/promise.js')
Page({
  data: {
    isShow: false,
    item: {},
    isdeliver: false
  },
  dictionary: {
    gender: {
      0: '男',
      1: '女',
      2: '不限'
    }
  },
  deliverResume: function () {
    wx.showToast({
      icon: 'loading',
      duration: 10000
    })
    wxRequest.getRequest('api/job/offline/deliverResume.do', {
      token: app.globalData.token,
      jobOfflineId: this.data.item.id
    })
      .then(res => {
        wx.navigateTo({
          url: '../deliverSuccess/deliverSuccess?jobId=' + this.data.item.id,
          success: function (res) {
            this.setData({
              isdeliver: true
            })
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  contact: function (e) {
    if (this.data.isdeliver) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.mobile
      })
    } else {
      wx.showModal({
        title: '无法联系企业',
        content: '请先投递简历，才能联系企业',
        showCancel: false
      })
    }

  },
  onLoad: function (option) {
    let item = JSON.parse(option.jobData)
    item.gender = this.dictionary.gender[item.genderLimit]
    this.setData({
      item: item
    })
    wxRequest.getRequest('api/job/offline/getisdeliver.do', {
      token: app.globalData.token,
      jobOfflineId: item.id
    })
      .then(res => {
        this.setData({
          isdeliver: res.dataMap.isdeliver
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
})
