// pages/wallet/confirmPassword/confirmPassword.js
var app = getApp();
const wxRequest = require('../../../config/promise.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    firstPassword: '',
    asterisk: ''
  },
  addkey(e) {
    if (this.data.password.length < 6) {
      this.setData({
        password: this.data.password + e.target.dataset.number,
        asterisk: this.data.asterisk + e.target.dataset.asterisk
      })
      if (this.data.password.length == 6) {
        if (this.data.password == this.data.firstPassword) {
          wxRequest.getRequest('api/user/withdrawal.do', {
              token: app.globalData.token,
              password: this.data.password
            })
            .then(res => {
              wx.redirectTo({
                url: '/pages/wallet/withdrawDeposit/withdrawDeposit',
              })
            })

        } else {
          wx.showToast({
            title: '密码不一致，请重新输入',
            icon: 'none'
          })
        }
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
    console.log(options)
    this.setData({
      firstPassword: options.password
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