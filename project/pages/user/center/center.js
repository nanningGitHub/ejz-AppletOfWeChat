var app = getApp()
const filter = require('../../../utils/router')
const wxRequest = require('../../../config/promise.js')
Page(filter.loginCheck({
  data: {
    user: {},
    token: ''
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
    wx.navigateTo({
     url:'/pages/user/myJob/myJob'
    })
  }
}))
=======
  myJob() {
    console.log(app.globalData.token)
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
  myResume() {
    console.log(this.data.user.resumedataNum)
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
    wx.showToast({
      title: '请前往app提现',
      icon: 'success',
      mask: true
    })
  }
})
  myJob() {
    wx.navigateTo({
     url:'/pages/user/myJob/myJob'
    })
  }
}))
