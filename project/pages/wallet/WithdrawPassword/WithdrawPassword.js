// pages/wallet/WithdrawalPassword/WithdrawalPassword.js
var app = getApp();
const wxRequest = require('../../../config/promise.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bankId: '',
    password: '',
    asterisk: ''
  },
  addkey(e) {
    if (this.data.password.length < 6) {
      this.setData({
        password: this.data.password + e.target.dataset.number,
        asterisk: this.data.asterisk + e.target.dataset.asterisk
      })
      if (this.data.password.length == 6) {
        wxRequest.postRequest('api/user/withdrawForBank.do', {
            token: app.globalData.token,
            bankId: this.data.bankId,
            password: this.data.password,
            txMoney: this.data.txMoney
          })
          .then(res => {
            wx.redirectTo({
              url: '/pages/wallet/WithdrawalSuccess/WithdrawalSuccess'
            })
          })
      }
    }
  },
  deletePassword() {
    let password = this.data.password;
    let asterisk = this.data.asterisk;
    password = password.slice(0, password.length - 1);
    asterisk = asterisk.slice(0, asterisk.length - 1);
    this.setData({
      password: password,
      asterisk: asterisk
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      bankId: options.bankId,
      txMoney: options.txMoney
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(options) {

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