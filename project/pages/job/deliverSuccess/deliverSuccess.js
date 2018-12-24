Page({
  data: {
    jobId: ''
  },
  go: function () {
    wx.redirectTo({
      url: '../../userCenter/myJobDetail/myJobDetail?jobId=' + this.data.jobId,
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  onLoad: function (option) {
    this.setData({
      jobId: option.jobId
    })
  }
})