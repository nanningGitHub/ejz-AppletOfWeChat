var app = getApp()
var Utils = require('../../../utils/utils.js')
const wxRequest = require('../../../config/promise.js')
Page({
  data: {
    userResume: {},
  },
  toEdit: function () {
    wx.navigateTo({
      url: '../editResume/editResume?userResume=' + JSON.stringify(this.data.userResume),
    })
  },
  previewImg: function (e) {
    wx.previewImage({
      current: this.data.userResume.userLifePicture[parseInt(e.currentTarget.dataset.index)],
      urls: this.data.userResume.userLifePicture
    })
  },
  showUserResume: function (token) {
    wxRequest.postRequest("api/user/showUserResume.do", {
      token: app.globalData.token
    })
      .then(res => {
        let resume = res.dataMap.userResume
        let editResumeInfo = {
          provinceId: resume.provinceId,
          cityId: resume.cityId,
          areaId: resume.areaId,
          headImageName: resume.headerFile,
          birthday: resume.birthdayDate,
          weight: resume.weight,
          height: resume.height,
          degree: resume.degree,
          mobile: resume.mobile,
          intro: resume.intro,
          profession: resume.profession,
          qq: resume.qq,
          gender: resume.gender,
          realName: resume.realName,
          school: resume.school,
          startSchool: resume.startSchool,
          jobTypeId: resume.jobtypeids,
          email: resume.email,
          experience: resume.experience,
          eduSituation: resume.eduSituation
        }
        app.globalData.resume = resume
        app.globalData.editResumeInfo = editResumeInfo
        this.setData({
          userResume: resume
        })
      })
  },
  onLoad: function () {
    this.showUserResume(app.globalData.token)
  }
})