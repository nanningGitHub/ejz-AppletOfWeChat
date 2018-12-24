var app = getApp()
var Utils = require('../../../utils/utils.js')
const wxRequest = require('../../../config/promise.js')
var ImgUpload = require('../../../store/imgUpload.js')
var Resume = require('../../../store/resume.js')
Page({
  data: {
    photoData: [],
    imgArray: []
  },
  photoListData: [],
  freeCount: 9,
  uploadImg: function (array, i) {
    var self = this
    if (i < array.length) {
      wx.showToast({
        title: '上传中',
        icon: 'loading',
        duration: 10000,
      })
      ImgUpload.osstoken(array[i], function (data) {
        self.setData({
          imgArray: self.data.imgArray.concat(data.host + '/' + data.fileName)
        })
        i = i + 1
        self.uploadImg(array, i)
      })
    } else {
      wx.hideToast()
      return
    }
  },
  addLifePhoto: function () {
    let self = this
    wx.chooseImage({
      count: self.freeCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        self.uploadImg(tempFilePaths, 0)
        var photoData = []
        for (var i = 0; i < tempFilePaths.length; i++) {
          self.photoListData = self.photoListData.concat({ add: false, url: tempFilePaths[i] })
        }
        self.freeCount = 12 - self.photoListData.length > 9 ? 9 : 12 - self.photoListData.length
        photoData = self.photoListData
        photoData = photoData.length < 12 ? photoData.concat({ add: true, url: '../../../images/life_photo.png' }) : photoData
        self.setData({
          photoData: photoData
        })
      },
    })
  },
  controllPhoto: function (e) {
    var self = this
    console.log(e)
    wx.showActionSheet({
      itemList: ['查看', '删除'],
      success: function (res) {
        console.log(res.tapIndex)
        switch (res.tapIndex) {
          case 0: wx.previewImage({
            current: self.data.imgArray[parseInt(e.currentTarget.dataset.index)],
            urls: self.data.imgArray
          })
            break
          case 1: self.deleteLifePhoto(e)
            break
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  deleteLifePhoto: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var photoData = []
    this.photoListData.splice(index, 1)
    this.data.imgArray.splice(index, 1)
    this.setData({
      imgArray: this.data.imgArray
    })
    this.freeCount = 12 - this.photoListData.length > 9 ? 9 : 12 - this.photoListData.length
    photoData = this.photoListData
    photoData = photoData.length < 12 ? photoData.concat({ add: true, url: '../../../images/life_photo.png' }) : photoData
    this.setData({
      photoData: photoData
    })
  },
  submitLifePhoto: function () {
    var lifePicNames = this.data.imgArray.toString()
    var count = this.data.imgArray.length
    wxRequest.postRequest('api/user/addLifePic.do', {
      token: app.globalData.token,
      lifePicNames: lifePicNames
    })
      .then(res => {
        return wxRequest.postRequest('api/user/updateDegree.do', {
          token: app.globalData.token,
          count: count
        })
      })
      .then(res => {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 3000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/user/center/center',
          })
        }, 3000)
      })
  },
  onLoad: function (option) {
    var userResume = JSON.parse(option.userResume)
    if (userResume.userLifePicture && userResume.userLifePicture.length) {
      var photoData = []
      for (var i = 0; i < userResume.userLifePicture.length; i++) {
        this.photoListData = this.photoListData.concat({ add: false, url: userResume.userLifePicture[i] })
      }
      this.freeCount = 12 - this.photoListData.length > 9 ? 9 : 12 - this.photoListData.length
      photoData = this.photoListData
      photoData = photoData.length < 12 ? photoData.concat({ add: true, url: '../../../images/life_photo.png' }) : photoData
      console.log(photoData)
      this.setData({
        imgArray: userResume.userLifePicture,
        photoData: photoData
      })
    } else {
      this.setData({
        photoData: [{ add: true, url: '../../../images/life_photo.png' }]
      })
    }
  },
})