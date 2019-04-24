// pages/wallet/key/key.js
var app = getApp();
const wxRequest = require('../../../config/promise.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    phoneNumber: '',
    validateCode: '',
    withdrawPW: '',
    disabled: true,
    code: '获取验证码'
  },
  phoneNumber(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  validateCode(e) {
    this.setData({
      validateCode: e.detail.value
    })
  },
  withdrawPW(e) {
    this.setData({
      withdrawPW: e.detail.value
    })
  },
  sendFindTxPWSMS() {
    if (!this.data.phoneNumber) {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号',
      })
      return
    }
    if (this.data.disabled) {
      this.getSMS();
    } else {

    }

  },
  getSMS() {
    wxRequest.getRequest('api/user/sendFindTxPWSMS.do', {
      phoneNumber: this.data.phoneNumber
    })
      .then(res => {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        })
        this.goGetCode();
      })
  },
  goGetCode() { //获取短信倒计时
    var that = this;
    var time = 60;
    that.setData({
      code: '60秒后重发',
      disabled: false
    })
    var Interval = setInterval(function() {
      time--;
      if (time > 0) {
        that.setData({
          code: time + '秒后重发'
        })
      } else {
        clearInterval(Interval);
        that.setData({
          code: '获取验证码',
          disabled: true
        })
      }
    }, 1000)
  },
 
  findTXPassword() {
    if (!this.data.phoneNumber) {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号',
      })
    } else if (!this.data.validateCode) {
      wx.showToast({
        icon: 'none',
        title: '请输入验证码',
      })
    } else if (!this.data.withdrawPW) {
      wx.showToast({
        icon: 'none',
        title: '请输入新密码',
      })
    } else {
      wxRequest.getRequest('api/user/findTXPassword.do', {
          token: app.globalData.token,
          phoneNumber: this.data.phoneNumber,
          validateCode: this.data.validateCode,
          withdrawPW: this.data.withdrawPW
        })
        .then(res => {
          wx.redirectTo({
            url: '/pages/wallet/wallet/wallet'
          })
        })
    }
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