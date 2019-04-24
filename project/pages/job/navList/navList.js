// pages/job/navList/navList.js
var app = getApp()
const Utils = require('../../../utils/utils.js')
const wxRequest = require('../../../config/promise.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prefectureId: '',
    mainJobType: '',
    searchkey: '',
    dataList: [],
    pageNo: 1,
    goType: ''
  },
  // 获取专区的joblist开始
  getprejobList() {
    wxRequest.getRequest("api/home/getprejobList.do", {
        cityId: app.globalData.cityId,
        prefecture_id: this.data.prefectureId,
        pageSize: 20,
        pageNo: this.data.pageNo
      })
      .then(res => {
        let oldDataList = this.data.dataList;
        let dataList = res.dataMap.page.dataList;
        dataList.map(item => {
          item.jobOffline.startTime = Utils.getLocalTime(item.jobOffline.startDate)
          item.jobOffline.endTime = Utils.getLocalTime(item.jobOffline.endDate)
          item.jobOffline.lastFreshTime = Utils.getLocalTime(item.jobOffline.lastFreshDate)
          item.jobOffline.startWorkTime = Utils.getTime(item.jobOffline.startDate)
          item.jobOffline.endWorkTime = Utils.getTime(item.jobOffline.endDate)
        })
        this.setData({
          dataList: [...oldDataList, ...dataList]
        })
      })
  },
  // 获取专区的joblist结束


  // 获取兼职主类型joblist开始
  getList() {
    wxRequest.getRequest("api/job/offline/getList.do", {
        cityId: app.globalData.cityId,
        mainJobType: this.data.mainJobType,
        searchkey: this.data.searchkey,
        pageSize: 20,
        pageNo: this.data.pageNo
      })
      .then(res => {
        let oldDataList = this.data.dataList;
        let dataList = res.dataMap.jobOfflinePage.dataList;
        dataList.map(item => {
          item.startTime = Utils.getLocalTime(item.startDate)
          item.endTime = Utils.getLocalTime(item.endDate)
          item.lastFreshTime = Utils.getLocalTime(item.lastFreshDate)
          item.startWorkTime = Utils.getTime(item.startDate)
          item.endWorkTime = Utils.getTime(item.endDate)
        })
        this.setData({
          dataList: [...oldDataList, ...dataList]
        })
      })
  },

  // 点击岗位进入详情页 开始
  toJobDetail: function (event) {
    let JobOfflineId = event.currentTarget.dataset.jobofflineid;
    wx.navigateTo({
      url: '/pages/job/detail/detail?JobOfflineId=' + JobOfflineId + '&cityId=' + app.globalData.cityId
    })
  },
  // 点击岗位进入详情页 结束

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.goType == 4) {
      this.setData({
        goType: options.goType,
        prefectureId: options.prefectureId,
      })
    } else if (options.goType == 5) {
      this.setData({
        goType: options.goType,
        mainJobType: options.mainJobType,
      })
    }
    if (options.searchkey) {
      this.setData({
        searchkey: options.searchkey
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (this.data.goType == 4) {
      this.getprejobList()
    } else if (this.data.goType == 5) {
      this.getList()
    }
    if (this.data.searchkey) {
      this.getList()
    }
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
  onReachBottom() {
    let pageNo = this.data.pageNo;
    pageNo++;
    this.setData({
      pageNo: pageNo
    })
    if (this.data.goType == 4) {
      this.getprejobList()
    } else if (this.data.goType == 5) {
      this.getList()
    }

    if (this.data.searchkey) {
      this.getList()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})