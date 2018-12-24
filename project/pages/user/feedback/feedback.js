var app = getApp()
var Feedback = require('../../../store/feedback.js')
Page({
  data: {},
  suggest: function (token, contactTel, content) {
    Feedback.suggest(token, contactTel, content, function (data) {
      console.log(data)
    })
  },
  submitFeedback: function (e) {
    var mobile = e.detail.value.mobile
    var feedback = e.detail.value.feedback
    this.suggest(app.globalData.token, mobile, feedback)
  }
})