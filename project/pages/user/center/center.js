var app = getApp()
const filter = require('../../../utils/router')
const wxRequest = require('../../../config/promise.js')
Page(filter.loginCheck({
  data: {
    user: {},
    rawData: {},
    token: '',

  },
  onLoad: function(options) {
    this.setData({
      token: app.globalData.token
    })
    wxRequest.getRequest('api/user/getData.do', {
        token: app.globalData.token
      })
      .then(res => {
        console.log(res)
        let resumedataNum = Math.round(res.dataMap.userData.resumedataNum * 100)
        res.dataMap.userData.resumedataNum = resumedataNum;
        this.setData({
          user: res.dataMap.userData
        })
      })
  },
  onReady: function(e) {
    // 页面渲染完成
    const rawData = wx.getStorageSync('rawData')
    this.setData({
      rawData: JSON.parse(rawData)
    })
  },
  onShow: function() {

    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  myJob() {
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/pages/manage/login/login"
      })
    } else {
      wx.navigateTo({
        url: '/pages/user/myJob/myJob'
      })
    }
  },
  quit() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '退出且解除手机号绑定',
      success(res) {
        if (res.confirm) {
          that.logout()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  logout() {
    wxRequest.getRequest('mini/wechat/logout.do', {
        token: app.globalData.token
      })
      .then(res => {
        wx.removeStorageSync('token')
        wx.switchTab({
          url: '/pages/index/index'
        })
      })
  },
  myResume() {
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/pages/manage/login/login"
      })
    } else if (isNaN(this.data.user.resumedataNum)) {
      wx.navigateTo({
        url: '/pages/user/editResume/editResume',
      })
      // ' || ' / pages / user / editResume / editResume'
    } else {
      wx.navigateTo({
        url: '/pages/user/resume/resume',
      })
    }
  },
  Withdraw() {
    wx.navigateTo({
      url:'/pages/wallet/wallet/wallet'
    })
  },
}))