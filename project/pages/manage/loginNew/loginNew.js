// pages/manage/loginNew.js
var app = getApp()
var wxRequest = require('../../../config/promise.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: ''
  },

  /**
   * 获取手机号
   */
  getPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      wxRequest.getRequest('mini/wechat/wechatLogin.do', {
          code: this.data.code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        })
        .then(res => {
          wx.setStorageSync('token', res.dataMap.token)
          app.globalData.token = res.dataMap.token
          const rawData = wx.getStorageSync('rawData');
          if (!rawData){
            this.getSetting()
          } else{
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getSetting() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 必须是在用户已经授权的情况下调用
          wx.getUserInfo({
            success(res) {
              wx.setStorageSync('rawData', res.rawData)
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          wx.redirectTo({
            url: '/pages/manage/userinfo/userinfo'
          })
        }
      }
    })
  },


  // 进入login页面
  intologin() {
    wx.navigateTo({
      url: '/pages/manage/login/login',
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
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
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