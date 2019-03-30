const wxRequest = require('/config/promise.js')
App({
  onLaunch: function (options) {
    let self = this
    try {
      var value = wx.getStorageSync('token')
      if (value) {
        this.reGet(value)
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  reGet: function (token) {
    wxRequest.getRequest('api/user/reGetToken.do', {
      token: token
    })
      .then(res => {
        wx.setStorageSync('token', res.dataMap.token)
        this.globalData.token = res.dataMap.token;
      })
      .catch(err => {
        if (err.data.code === 101) {
          this.globalData.token = ''
          wx.clearStorage()
        }
      })
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    
  },
  globalData: {
    token: '',
    location: {},
    cityId: '',
    resume: {},
    editResumeInfo: {},
    gender: {
      1: '男',
      0: '女',
      2: '不限'
    }
  }
})