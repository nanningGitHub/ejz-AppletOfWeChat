// pages/wallet/amend/amend.js
var app = getApp();
const wxRequest = require('../../../config/promise.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPW: '',
    newPW: '',
    againNewPW: '',
  },

  oldPW(e) {
    this.setData({
      oldPW: e.detail.value
    })
  },
  newPW(e) {
    this.setData({
      newPW: e.detail.value
    })

  },
  againNewPW(e) {
    this.setData({
      againNewPW: e.detail.value
    })
  },
  modifyTXPassword() {
    wxRequest.getRequest('api/user/modifyTXPassword.do', {
        token: app.globalData.token,
        oldPW: this.data.oldPW,
        newPW: this.data.newPW,
        againNewPW: this.data.againNewPW
      })
      .then(res => {
        wx.redirectTo({
          url: '/pages/wallet/wallet/wallet',
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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