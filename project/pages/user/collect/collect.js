// pages/user/collect/collect.js
var app = getApp();
const Utils = require('../../../utils/utils.js');
const wxRequest = require('../../../config/promise.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      token: app.globalData.token
    })
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
    this.userFavoriteJob()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  userFavoriteJob() {
    wxRequest.getRequest('api/user/userFavoriteJob.do', {
        token: this.data.token
      })
      .then(res => {
        if (res.dataMap.userFavoriteJob) {
          let userFavoriteJob = res.dataMap.userFavoriteJob;
          userFavoriteJob.map(item => {
            item.jobofflinInfo.startTime = Utils.getLocalTime(item.jobofflinInfo.startDate)
            item.jobofflinInfo.endTime = Utils.getLocalTime(item.jobofflinInfo.endDate)
            item.jobofflinInfo.lastFreshTime = Utils.getLocalTime(item.jobofflinInfo.lastFreshDate)
            item.jobofflinInfo.startWorkTime = Utils.getTime(item.jobofflinInfo.startDate)
            item.jobofflinInfo.endWorkTime = Utils.getTime(item.jobofflinInfo.endDate)
          })
          this.setData({
            userFavoriteJob: res.dataMap.userFavoriteJob
          })
        } else {
          this.setData({
            userFavoriteJob: []
          })
        }

      })
  },
  // 点击岗位进入详情页 开始
  toJobDetail: function(event) {
    console.log(event)
    let JobOfflineId = event.currentTarget.dataset.jobofflineid;
    wx.navigateTo({
      url: '/pages/job/detail/detail?JobOfflineId=' + JobOfflineId + '&cityId=' + app.globalData.cityId
    })
  },
  // 点击岗位进入详情页 结束
})