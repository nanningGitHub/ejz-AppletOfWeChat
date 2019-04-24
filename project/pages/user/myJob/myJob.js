var app = getApp()
var Utils = require('../../../utils/utils.js')
const wxRequest = require('../../../config/promise.js')
var MyJob = require('../../../store/myJob.js')
var JobOffline = require('../../../store/jobOffline.js')
Page({
  data: {
    slider: 0,
    navLeft: '',
    jobOfflineList: [],
    dailuyongList: [],
    daiShangGangList: [],
    daiJieSuanList: [],
    yiJieSuanList: [],
  },
  page1: 1,
  page2: 1,
  page3: 1,
  page4: 1,
  page5: 1,
  scrollTo: function(e) {
    this.setData({
      slider: e.target.dataset.index,
      navLeft: e.target.offsetLeft
    })
  },
  onReachBottom: function() {
    var self = this
    switch (this.data.slider) {
      case 0:
        this.page1 += 1
        MyJob.getJobOfflineList(app.globalData.token, this.page1, function(data) {
          let jobData = data.dataMap.jobOfflinePage;
          if (jobData) {
            jobData.map(item => {
              item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
            })
            self.setData({
              jobOfflineList: self.data.jobOfflineList.concat(jobData)
            })
          }
        })
        break
      case 1:
        this.page2 += 1
        MyJob.getDaiLuYongList(app.globalData.token, this.page2, function(data) {
          let jobData = data.dataMap.jobOfflinePage
          if (jobData) {
            jobData.map(item => {
              item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
            })
            self.setData({
              dailuyongList: self.data.dailuyongList.concat(jobData)
            })
          }
        })
        break
      case 2:
        this.page3 += 1
        MyJob.getDaiShangGangList(app.globalData.token, this.page3, function(data) {
          let jobData = data.dataMap.jobOfflinePage
          if (jobData) {
            jobData.map(item => {
              item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
            })
            self.setData({
              daiShangGangList: self.data.daiShangGangList.concat(jobData)
            })
          }
        })
        break
      case 3:
        this.page4 += 1
        MyJob.getDaiJieSuanList(app.globalData.token, this.page4, function(data) {
          let jobData = data.dataMap.jobOfflinePage
          if (jobData) {
            jobData.map(item => {
              item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
            })
            self.setData({
              daiJieSuanList: self.data.daiJieSuanList.concat(jobData)
            })
          }
        })
        break
      case 4:
        this.page5 += 1
        MyJob.getYiJieSuanList(app.globalData.token, this.page5, function(data) {
          let jobData = data.dataMap.jobOfflinePage
          if (jobData) {
            jobData.map(item => {
              item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
            })
            self.setData({
              yiJieSuanList: self.data.yiJieSuanList.concat(jobData)
            })
          }
        })
        break
    }
  },
  getJobOfflineList: function(page) { //全部
    wxRequest.getRequest('api/jobRequest/getJobOfflineList.do', {
        token: app.globalData.token,
        page: page
      })
      .then(res => {
        let job = res.dataMap.jobOfflinePage;
        if (job) {
          job.map(item => {
            item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
          })
        }
        this.setData({
          jobOfflineList: job || []
        })
      })
  },
  getDaiLuYongList: function(page) { // 待录用
    wxRequest.getRequest('api/jobRequest/getDaiLuYongList.do', {
        token: app.globalData.token,
        page: page
      })
      .then(res => {
        let job = res.dataMap.jobOfflinePage;
        if (job) {
          job.map(item => {
            item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
          })
        }
        this.setData({
          dailuyongList: job || []
        })
      })
  },
  getDaiShangGangList: function(page) { // 待上岗
    wxRequest.getRequest('api/jobRequest/getDaiShangGangList.do', {
        token: app.globalData.token,
        page: page
      })
      .then(res => {
        let job = res.dataMap.jobOfflinePage;
        if (job) {
          job.map(item => {
            item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
          })
        }
        this.setData({
          daiShangGangList: job || []
        })
      })
  },
  getDaiJieSuanList: function(page) { // 待结算
    wxRequest.getRequest('api/jobRequest/getDaiJieSuanList.do', {
        token: app.globalData.token,
        page: page
      })
      .then(res => {
        let job = res.dataMap.jobOfflinePage;
        if (job) {
          job.map(item => {
            item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
          })
        }
        this.setData({
          daiJieSuanList: job || []
        })
      })
  },
  getYiJieSuanList: function(page) { // 已结算
    wxRequest.getRequest('api/jobRequest/getYiJieSuanList.do', {
        token: app.globalData.token,
        page: page
      })
      .then(res => {
        let job = res.dataMap.jobOfflinePage;
        if (job) {
          job.map(item => {
            item.solrJobOffline.startDate = Utils.getLocalTime(item.solrJobOffline.startDate)
          })
        }
        this.setData({
          yiJieSuanList: job || []
        })
      })
  },
  // 取消投递提示框判断开始
  isDeldeliverResume(event) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: "您是否要取消投递",
      success(res) {
        if (res.confirm) {
          that.deldeliverResume(event)
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 取消投递提示框判断结束

  deldeliverResume: function(event) { // 取消投递
    let id = event.currentTarget.dataset.id
    wxRequest.getRequest('api/job/offline/deldeliverResume.do', {
        token: app.globalData.token,
        jobOfflineId: id
      })
      .then(res => {
        wx.showLoading({
          icon: 'loading',
        })
        setTimeout(() => {
          this.getDaiLuYongList(1)
          this.getJobOfflineList(1)
          wx.hideLoading()
        }, 500)
      })
  },
  contactEnterprise: function(e) { //联系企业
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile
    })
  },

  onLoad: function(options) {
    this.getJobOfflineList(this.page1)
    this.getDaiLuYongList(this.page2)
    this.getDaiShangGangList(this.page3)
    this.getDaiJieSuanList(this.page4)
    this.getYiJieSuanList(this.page5)
  },
})