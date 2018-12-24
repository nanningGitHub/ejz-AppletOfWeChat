var app = getApp()
var Utils = require('../../../utils/utils.js')
var Resume = require('../../../store/resume.js')
var ImgUpload = require('../../../store/imgUpload.js')
var Map = require('../../../store/map.js')
var Intent = require('../../../store/intent.js')
Page({
  data: {
    userResume: {},
    portrait: '',
    headerFile: '',
    realName: '',
    gender: [
      { name: "男", value: 1 },
      { name: "女", value: 0, checked: "true" }
    ],
    birthday: '',
    height: '',
    weight: '',
    eduSituation: [
      { name: "在校生", value: 0, checked: "true" },
      { name: "已毕业", value: 1 }
    ],
    school: '',
    startSchool: '',
    degree: '',
    degreeData: ['小学', '初中', '高中', '专科', '本科', '硕士', '博士'],
    degreeIndex: 0,
    profession: '',
    intent: [],
    province: '请选择',
    provinceId: '',
    provinceData: [],
    provinceIndex: '',
    city: '请选择',
    cityId: '',
    cityData: [],
    cityIndex: '',
    area: '请选择',
    areaId: '',
    areaData: [],
    areaIndex: '',
    email: '',
    qq: '',
    mobile: '',
    intro: '',
    introduce: [
      { name: '高颜值', value: 0, checked: false },
      { name: '高学历', value: 1, checked: false },
      { name: '吃苦耐劳', value: 2, checked: false },
      { name: '服从管理', value: 3, checked: false },
      { name: '大长腿', value: 4, checked: false },
      { name: '责任心强', value: 5, checked: false },
      { name: '诚实守信', value: 6, checked: false },
      { name: '擅长沟通', value: 7, checked: false },
    ],
    experience: ''
  },
  getJobType: function () {
    var self = this
    Intent.getJobType(function (data) {
      var jobType = []
      var jobtypeList = data.dataMap.jobtypeList
      for (var i = 0; i < jobtypeList.length; i++) {
        jobType = jobType.concat({ name: jobtypeList[i].key, value: jobtypeList[i].value, checked: false })
      }
      self.setData({
        intent: jobType
      })
    })
  },
  choosePortrait: function () {
    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        self.setData({
          headerFile: tempFilePaths[0]
        })
        ImgUpload.osstoken(tempFilePaths[0], function (data) {
          self.setData({
            portrait: data.host + '/' + data.fileName
          })
        })
      }
    })
  },
  degreeChange: function (e) {
    this.setData({
      degree: this.data.degreeData[e.detail.value],
      degreeIndex: e.detail.value
    })
  },
  intentChange: function (e) {
    for (var j = 0; j < this.data.intent.length; j++) {
      this.data.intent[j].checked = false
    }
    for (var i = 0; i < e.detail.value.length; i++) {
      for (var j = 0; j < this.data.intent.length; j++) {
        if (e.detail.value[i] == this.data.intent[j].value) {
          this.data.intent[j].checked = true
        } else {
          continue
        }
      }
    }
    this.setData({
      intent: this.data.intent
    })
  },
  introduceChange: function (e) {
    for (var j = 0; j < this.data.introduce.length; j++) {
      this.data.introduce[j].checked = false
    }
    for (var i = 0; i < e.detail.value.length; i++) {
      this.data.introduce[e.detail.value[i]].checked = true
    }
    this.setData({
      introduce: this.data.introduce
    })
    var introData = []
    for (var i = 0; i < e.detail.value.length; i++) {
      introData = introData.concat(this.data.introduce[e.detail.value[i]].name)
    }
    console.log(introData)
    this.setData({
      intro: introData.toString()
    })
  },
  birthdayChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  startSchoolChange: function (e) {
    this.setData({
      startSchool: e.detail.value
    })
  },
  provinceChange: function (e) {
    let self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.setData({
      province: this.data.provinceData[e.detail.value].fullName,
      provinceId: this.data.provinceData[e.detail.value].id,
      provinceIndex: e.detail.value,
      city: '请选择',
      cityId: '',
      cityIndex: '',
      area: '请选择',
      areaId: '',
      areaIndex: ''
    })
    Map.getChildrenCity(this.data.provinceData[e.detail.value].id, function (data) {
      self.setData({
        cityData: data.dataMap.childsList,
      })
      wx.hideToast()
    })
  },
  cityChange: function (e) {
    let self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.setData({
      city: this.data.cityData[e.detail.value].fullName,
      cityId: this.data.cityData[e.detail.value].id,
      cityIndex: e.detail.value,
      area: '请选择',
      areaId: '',
      areaIndex: ''
    })
    Map.getArea(this.data.cityData[e.detail.value].id, function (data) {
      self.setData({
        areaData: data.dataMap.childsList,
      })
      wx.hideToast()
    })
  },
  areaChange: function (e) {
    this.setData({
      area: this.data.areaData[e.detail.value].fullName,
      areaId: this.data.areaData[e.detail.value].id,
      areaIndex: e.detail.value
    })
  },
  formSubmit: function (e) { //提交表单
    var self = this
    if (e.detail.value.realName == "") {
      wx.showModal({
        title: '错误',
        content: '用户名不能为空',
        showCancel: false
      })
      return false
    } else if (e.detail.value.birthday == "") {
      wx.showModal({
        title: '错误',
        content: '出生年月不能为空',
        showCancel: false
      })
      return false
    } else if (e.detail.value.school == "") {
      wx.showModal({
        title: '错误',
        content: '就读学校不能为空',
        showCancel: false
      })
      return false
    } else if (e.detail.value.startSchool == "") {
      wx.showModal({
        title: '错误',
        content: '入学时间不能为空',
        showCancel: false
      })
      return false
    } else if (e.detail.value.degree == "") {
      wx.showModal({
        title: '错误',
        content: '请选择学历',
        showCancel: false
      })
      return false
    } else if (e.detail.value.profession == "") {
      wx.showModal({
        title: '错误',
        content: '专业不能为空',
        showCancel: false
      })
      return false
    } else if (e.detail.value.intent.length == 0) {
      wx.showModal({
        title: '错误',
        content: '请选择您的期望职位',
        showCancel: false
      })
      return false
    } else if (e.detail.value.provinceId == "") {
      wx.showModal({
        title: '错误',
        content: '请选择省',
        showCancel: false
      })
      return false
    } else if (e.detail.value.cityId == "") {
      wx.showModal({
        title: '错误',
        content: '请选择市',
        showCancel: false
      })
      return false
    } else if (e.detail.value.areaId == "") {
      wx.showModal({
        title: '错误',
        content: '请选择地区',
        showCancel: false
      })
      return false
    } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(e.detail.value.mobile))) {
      wx.showModal({
        title: '错误',
        content: '手机号格式不正确',
        showCancel: false
      })
      return false
    }
    Resume.editUserInfo(app.globalData.token, this.data.provinceId, this.data.cityId, this.data.areaId, this.data.portrait, e.detail.value.birthday, e.detail.value.weight, e.detail.value.height, this.data.degree, e.detail.value.mobile, this.data.intro, e.detail.value.profession, e.detail.value.qq, e.detail.value.gender, e.detail.value.realName, e.detail.value.school, e.detail.value.startSchool, e.detail.value.intent.toString(), e.detail.value.email, e.detail.value.experience, e.detail.value.eduSituation, function (data) {
      if (data.code == 0) {
        var lifePicturesCount = self.data.userResume.userLifePicture ? self.data.userResume.userLifePicture.length : 0
        Resume.updateDegree(app.globalData.token, lifePicturesCount, function (data) {
          wx.setStorage({
            key: 'userName',
            data: e.detail.value.realName,
            success: function (res) {
              wx.redirectTo({
                url: '../lifePhoto/lifePhoto?userResume=' + JSON.stringify(self.data.userResume)
              })
            }
          })
        })
      } else {
        wx.showModal({
          title: '错误',
          content: data.msg,
          showCancel: false
        })
      }
    })
  },
  onLoad: function (option) {
    let self = this
    if (option.userResume) { //有简历信息
      var userResume = JSON.parse(option.userResume)
      if (userResume.gender) {
        this.setData({
          gender: [
            { name: "男", value: 1, checked: "true" },
            { name: "女", value: 0 }
          ]
        })
      }
      if (userResume.eduSituation) {
        this.setData({
          eduSituation: [
            { name: "在校生", value: 0 },
            { name: "已毕业", value: 1, checked: "true" }
          ]
        })
      }
      Map.getProvince(function (data) {
        var index = Utils.checkIndex(data.dataMap.CityList, userResume.provinceId)
        self.setData({
          provinceData: data.dataMap.CityList,
          province: data.dataMap.CityList[index].fullName,
          provinceIndex: index
        })
      })
      Map.getChildrenCity(userResume.provinceId, function (data) {
        var index = Utils.checkIndex(data.dataMap.childsList, userResume.cityId)
        self.setData({
          cityData: data.dataMap.childsList,
          city: data.dataMap.childsList[index].fullName,
          cityIndex: index
        })
      })
      Map.getArea(userResume.cityId, function (data) {
        var index = Utils.checkIndex(data.dataMap.childsList, userResume.areaId)
        self.setData({
          areaData: data.dataMap.childsList,
          area: data.dataMap.childsList[index].fullName,
          areaIndex: index
        })
      })
      wx.getStorage({
        key: 'intent',
        success: function (res) {
          var intent = []
          for (var i = 0; i < res.data.length; i++) {
            intent = intent.concat({ name: res.data[i].key, value: res.data[i].value, checked: false })
          }
          for (var i = 0; i < userResume.jobtypeids.length; i++) {
            for (var j = 0; j < intent.length; j++) {
              if (userResume.jobtypeids[i] == intent[j].value) {
                intent[j].checked = true
              } else {
                continue
              }
            }
          }
          self.setData({
            intent: intent
          })
        },
      })
      var intro = userResume.intro ? userResume.intro : userResume.oldIntro
      var introData = intro.split(',')
      if (introData.length) {
        for (var i = 0; i < introData.length; i++) {
          for (var j = 0; j < this.data.introduce.length; j++) {
            if (introData[i] == this.data.introduce[j].name) {
              this.data.introduce[j].checked = true
            } else {
              continue
            }
          }
        }
        this.setData({
          introduce: this.data.introduce
        })
      }
      this.setData({
        userResume: userResume,
        portrait: userResume.headerFile,
        headerFile: userResume.headerFile,
        realName: userResume.realName,
        birthday: Utils.getLocalTime(userResume.birthdayDate),
        height: userResume.height,
        weight: userResume.weight,
        school: userResume.school,
        startSchool: userResume.startSchool,
        degree: userResume.degree,
        profession: userResume.profession,
        email: userResume.email,
        qq: userResume.qq,
        mobile: userResume.mobile,
        provinceId: userResume.provinceId,
        cityId: userResume.cityId,
        areaId: userResume.areaId,
        experience: userResume.experience,
        intro: userResume.intro ? userResume.intro : userResume.oldIntro
      })
    } else { //没有简历信息
      Map.getProvince(function (data) {
        self.setData({
          provinceData: data.dataMap.CityList,
        })
      })
      try {
        var intent = wx.getStorageSync('intent')
        if (intent) {
          var jobType = []
          for (var i = 0; i < intent.length; i++) {
            jobType = jobType.concat({ name: intent[i].key, value: intent[i].value, checked: false })
          }
          this.setData({
            intent: jobType
          })
        } else {
          this.getJobType()
        }
      } catch (e) {
        this.getJobType()
      }
    }
  }
})