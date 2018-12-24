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
  onLoad: function(option) {
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
  deliverResume: function() {
    wx.showToast({
      icon: 'loading',
      duration: 1000
    })
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/pages/manage/login/login"
      })
    }
    wxRequest.getRequest('api/job/offline/deliverResume.do', {
        token: app.globalData.token,
        jobOfflineId: this.data.item.id
      })
      .then(res => {
        wx.navigateTo({
          url: '../deliverSuccess/deliverSuccess?jobId=' + this.data.item.id,
          success: function(res) {
            wx.showToast({
                title: '投递成功',
                icon: '',
                duration: 1000,
                success() {
                  that.setData({
                    isdeliver: true
                  })
                }
                // wx.navigateTo({
                //   url: '../deliverSuccess/deliverSuccess?jobId=' + this.data.item.id,
                //   success: function(res) {
                //     that.setData({
                //       isdeliver: true
                //     })
                //   }
                // })
              })
              .catch(err => {
                console.log(err)
              })
          },
          contact: function(e) {
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
            // contact: function(e) {     //联系企业事件
            //   if (this.data.isdeliver) {
            //     wx.makePhoneCall({
            //       phoneNumber: e.currentTarget.dataset.mobile
            //     })
            //   } else {
            //     wx.showModal({
            //       title: '无法联系企业',
            //       content: '请先投递简历，才能联系企业',
            //       showCancel: false
            //     })
            //   }
            // },
            // share() {
            // },
          },
          onShareAppMessage: function(res) {
            if (res.from === 'button') {
              // 来自页面内转发按钮
              console.log(res.target)
            }
            return {
              title: '查看兼职详情',
              path: '/pages/job/detail/detail?jobData=' + JSON.stringify(item)
            }
          },

        })
      })
  }
})