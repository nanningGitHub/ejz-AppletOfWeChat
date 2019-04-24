// pages/userManage/register/register.js
var app = getApp()
var wxRequest = require('../../../config/promise.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    disabled: true,
    code: '获取验证码'
  },
  getMobile: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getVerificationCode() {
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入手机号',
      })
    } else if (this.data.disabled) {
      this.getSMS();
    } else {

    }
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
  getSMS: function(e) { //请求验证码接口
    wxRequest.getRequest('api/user/sendRegisterSMS.do', {
        phoneNumber: this.data.mobile
      })
      .then(res => {
        this.goGetCode();
      })
  },
  register: function(e) {
    wxRequest.getRequest('api/user/register.do', {
        phoneNumber: e.detail.value.mobile,
        password: e.detail.value.password,
        validateCode: e.detail.value.validate,
        user_type: 4
      })
      .then(res => {
        console.log(res)
        wx.reLaunch({
          url: '/pages/manage/login/login',
        })
      })
      .catch(err => {})
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