// pages/user/editResume/baseInfo.js
const app = getApp()
const wxRequest = require('../../../config/promise.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resume: {},
    gender: [
      {
        id: 1,
        name: '男'
      },
      {
        id: 0,
        name: '女'
      }
    ],
    role: [
      {
        id: 0,
        name: '学生'
      },
      {
        id: 1,
        name: '非学生'
      }
    ],
    degreeData: ['小学', '初中', '高中', '专科', '本科', '硕士', '博士'],
    degreeIndex: ''
  },
  degreeChange: function (e) {
    let resume = this.data.resume
    resume.degree = this.data.degreeData[e.detail.value]
    this.setData({
      resume: resume,
      degreeIndex: e.detail.value
    })
  },
  edit: function (e) {
    let params = app.globalData.editResumeInfo
    wxRequest.postRequest('api/user/editUserInfo.do', {
      token: app.globalData.token,
      ...params
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let resume = app.globalData.resume
    let gender = this.data.gender
    let role = this.data.role
    let degreeIndex = this.data.degreeData.indexOf(resume.degree)
    gender.map(item => {
      if (item.id == resume.gender) {
        item.checked = true
      }
    })
    role.map(item => {
      if (item.id == resume.eduSituation) {
        item.checked = true
      }
    })
    this.setData({
      resume: resume,
      gender: gender,
      role: role,
      degreeIndex: degreeIndex
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})