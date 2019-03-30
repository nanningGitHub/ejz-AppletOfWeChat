// pages/job/navList/navList.js
var app = getApp()
const Utils = require('../../../utils/utils.js')
const wxRequest = require('../../../config/promise.js')
Page({
  /**
   * 页面的初始数据
   */
  init: {
    isGet: true,
    page: 1,
    option: {}
  },
  data: {
    jobList: []
  },
  getBaseList: function(options) {
    if (!this.init.isGet) return
    wxRequest.getRequest('api/job/offline/getList.do', {
        cityId: app.globalData.cityId,
        latitude: options.type === 'near' && app.globalData.location.latitude || '',
        longitude: options.type === 'near' && app.globalData.location.longitude || '',
        settlementType: options.type === 'date' && 1 || '',
        subJobType: options.type === 'practice' && options.job || '',
        searchkey: options.searchkey && options.searchkey || '',
        pageNo: this.init.page
      })
      .then(res => {
        let jobList = this.data.jobList
        jobList = jobList.concat(res.dataMap.jobOfflinePage.dataList)
        jobList.map(item => {
          item.startTime = Utils.getLocalTime(item.startDate)
          item.endTime = Utils.getLocalTime(item.endDate)
          item.lastFreshTime = Utils.getLocalTime(item.lastFreshDate)
          item.startWorkTime = Utils.getTime(item.startDate)
          item.endWorkTime = Utils.getTime(item.endDate)
          item.image = Utils.imgLogo(item.jobSubtypeId)
        })
        this.setData({
          jobList: jobList
        }, () => {
          if (this.init.page < res.dataMap.jobOfflinePage.totalPage) this.init.page++
            else this.init.isGet = false
        })
      })
  },
  getList: function() {
    if (!this.init.isGet) return
    wxRequest.getRequest('api/job/offline/getHighSalaryList.do', {
        cityId: app.globalData.cityId,
        pageNo: this.init.page
      })
      .then(res => {
        let jobList = this.data.jobList
        jobList = jobList.concat(res.dataMap.jobOfflinePage.dataList)
        jobList.map(item => {
          item.startTime = Utils.getLocalTime(item.startDate)
          item.endTime = Utils.getLocalTime(item.endDate)
          item.lastFreshTime = Utils.getLocalTime(item.lastFreshDate)
          item.startWorkTime = Utils.getTime(item.startDate)
          item.endWorkTime = Utils.getTime(item.endDate)
          item.image = Utils.imgLogo(item.jobSubtypeId)
        })
        this.setData({
          jobList: jobList
        }, () => {
          if (this.init.page < res.dataMap.jobOfflinePage.totalPage) this.init.page++
            else this.init.isGet = false
        })
      })
  },
  toJobDetail: function(event) {
    let item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/job/detail/detail?jobData=' + JSON.stringify(item)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init.option = options
    if (options.type !== 'high')
      this.getBaseList(options)
    else this.getList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.init.option.type !== 'high') this.getBaseList(this.init.option)
    else this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})