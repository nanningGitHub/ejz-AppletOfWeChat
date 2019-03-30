// pages/wallet/detail/detail.js
var app = getApp();
const wxRequest = require('../../../config/promise.js');
var Utils = require('../../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wxRequest.postRequest('api/user/getAccountRecordList.do', {
        token: app.globalData.token
      })
      .then(res => {
        let recordList = res.dataMap.recordList;
        recordList.map(item => {
          if (item.bankNumber) {
            item.bankNumber = item.bankNumber.substring(item.bankNumber.length - 4);
          }

          if (item.createdDate) {
            item.createdDate = Utils.getAllTime(item.createdDate)
          }
        })
        this.setData({
          recordList: recordList
        })
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

  }
})