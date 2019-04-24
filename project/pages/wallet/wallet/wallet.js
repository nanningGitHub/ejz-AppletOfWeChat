// pages/wallet/wallet/wallet.js
var app = getApp();
const wxRequest = require('../../../config/promise.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayMoney: 0,
    token: app.globalData.token,
  },

  intoDetail() {
    wx.navigateTo({
      url: '/pages/wallet/detail/detail'
    })
  },
  intoCard() {
    wx.navigateTo({
      url: '/pages/wallet/card/card'
    })
  },
  intoExplain() {
    wx.navigateTo({
      url: '/pages/wallet/explain/explain'
    })
  },
  intoAmend() {
    wx.navigateTo({
      url: '/pages/wallet/amend/amend'
    })
  },
  intoKey() {
    wx.navigateTo({
      url: '/pages/wallet/key/key'
    })
  },
  ishaveTxPw() {
    // 需要当code为1时，进行逻辑判断
    wx.request({
      url: wxRequest.openUrl+'api/user/ishaveTxPw.do',
      data: {
        token: app.globalData.token,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '/pages/wallet/withdrawDeposit/withdrawDeposit'
          })
        } else if (res.data.code == 1) {
          wx.navigateTo({
            url: '/pages/wallet/setpassword/setpassword'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
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
    wxRequest.getRequest('api/user/getUserAmount.do', {
        token: app.globalData.token
      })
      .then(res => {
        if (res.code == 0) {
          this.setData({
            displayMoney: res.dataMap.displayMoney
          })
        } else {

        }
      })
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