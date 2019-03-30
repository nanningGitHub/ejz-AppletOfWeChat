var app = getApp()
var Utils = require('../../../utils/utils.js')
const wxRequest = require('../../../config/promise.js')
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
    gender: [{
        name: "男",
        value: 1
      },
      {
        name: "女",
        value: 0,
        checked: "true"
      }
    ],
    birthday: '',
    height: '',
    weight: '',
    eduSituation: [{
        name: "在校生",
        value: 0,
        checked: "true"
      },
      {
        name: "已毕业",
        value: 1
      }
    ],
    school: '',
    startSchool: '',
    degree: '',
    degreeData: ['小学', '初中', '高中', '专科', '本科', '硕士', '博士'],
    degreeIndex: 0,
    profession: '',
    intent: [{
        key:   "校园类",
         sort:  0,
         value:  1,
        checked: false
      },
      {
        key:   "活动类",
         sort:  0,
         value:  4,
        checked: false
      },
      {
        key:   "教育类",
         sort:  0,
         value:  10,
        checked: false
      },
      {
        key:   "市场类",
         sort:  0,
         value:  13,
        checked: false
      }, {
        key:   "服务类",
         sort:  0,
         value:  18,
        checked: false
      }, {
        key:   "文案类",
         sort:  0,
         value:  23,
        checked: false
      },
      {
        key:   "IT类",
         sort:  0,
         value:  28,
        checked: false
      }, {
        key:   "其他",
         sort:  0,
         value:  33,
        checked: false
      }
    ],
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
    introduce: [{
        name: '高颜值',
        value: 0,
        checked: false
      },
      {
        name: '高学历',
        value: 1,
        checked: false
      },
      {
        name: '吃苦耐劳',
        value: 2,
        checked: false
      },
      {
        name: '服从管理',
        value: 3,
        checked: false
      },
      {
        name: '大长腿',
        value: 4,
        checked: false
      },
      {
        name: '责任心强',
        value: 5,
        checked: false
      },
      {
        name: '诚实守信',
        value: 6,
        checked: false
      },
      {
        name: '擅长沟通',
        value: 7,
        checked: false
      },
    ],
    experience: ''
  },
  onLoad: function(option) {
    // this.getJobType() //调用请求期望职位数据
    let self = this
    if (option.userResume) { //有简历信息
      this.setData({
        userResume: option.userResume
      })
      var userResume = JSON.parse(option.userResume)
      if (userResume.gender) {
        this.setData({
          gender: [{
              name: "男",
              value: 1,
              checked: "true"
            },
            {
              name: "女",
              value: 0
            }
          ]
        })
      }
      if (userResume.eduSituation) {
        this.setData({
          eduSituation: [{
              name: "在校生",
              value: 0
            },
            {
              name: "已毕业",
              value: 1,
              checked: "true"
            }
          ]
        })
      }
      Map.getProvince(function(data) {
        var index = Utils.checkIndex(data.dataMap.CityList, userResume.provinceId)
        self.setData({
          provinceData: data.dataMap.CityList,
          province: data.dataMap.CityList[index].fullName,
          provinceIndex: index
        })
      })
      Map.getChildrenCity(userResume.provinceId, function(data) {
        var index = Utils.checkIndex(data.dataMap.childsList, userResume.cityId)
        self.setData({
          cityData: data.dataMap.childsList,
          city: data.dataMap.childsList[index].fullName,
          cityIndex: index
        })
      })
      Map.getArea(userResume.cityId, function(data) {
        var index = Utils.checkIndex(data.dataMap.childsList, userResume.areaId)
        self.setData({
          areaData: data.dataMap.childsList,
          area: data.dataMap.childsList[index].fullName,
          areaIndex: index
        })
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
      Map.getProvince(function(data) {
        self.setData({
          provinceData: data.dataMap.CityList,
        })
      })
      // try {
      //   var intent = wx.getStorageSync('intent')
      //   if (intent) {
      //     this.setData({
      //       intent: intent
      //     })
      //   } else {
      //     this.getJobType()
      //   }
      // } catch (e) {
      //   this.getJobType()
      // }
    }
  },
  onShow() {
    let userResume = this.data.userResume;
    let intent = this.data.intent;
    for (let i = 0; i < userResume.jobtypeids.length; i++) {
      for (let j = 0; j < intent.length; j++) {
        if (userResume.jobtypeids[i] == intent[j].value) {
          intent[j].checked = true;
        } else {
          continue
        }
      }
    }
    this.setData({
      intent: intent
    })
    // wx.getStorage({ //获取期望职位
    //   key: 'intent',
    //   success: function(res) {
    //     console.log(res.data)
    //     var intent = res.data;
    //     for (let i = 0; i < userResume.jobtypeids.length; i++) {
    //       for (let j = 0; j < intent.length; j++) {
    //         if (userResume.jobtypeids[i] == intent[j].value) {
    //           intent[j].checked = true;
    //         } else {
    //           continue
    //         }
    //       }
    //     }
    //     console.log(intent)
    //     that.setData({
    //       intent: intent
    //     })
    //   },
    // })

  },
  getJobType() { //获取期望职位的数据
    var self = this;
    Intent.getJobType(function(data) {
      let intent = data.dataMap.jobtypeList;
      self.setData({
        intent: intent
      })
    })
  },
  choosePortrait: function() { //上传头像oss
    let self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        self.setData({
          headerFile: tempFilePaths[0]
        })
        ImgUpload.osstoken(tempFilePaths[0], function(data) {
          self.setData({
            headerFile: data.host + '/' + data.fileName
          })
        })
      }
    })
  },
  degreeChange: function(e) {
    this.setData({
      degree: this.data.degreeData[e.detail.value],
      degreeIndex: e.detail.value
    })
  },
  intentChange: function(e) { //期望职位的判断 点击事件
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
  introduceChange: function(e) {
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
    this.setData({
      intro: introData.toString()
    })
  },
  birthdayChange: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  startSchoolChange: function(e) {
    this.setData({
      startSchool: e.detail.value
    })
  },
  provinceChange: function(e) { //选择省份
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
    Map.getChildrenCity(this.data.provinceData[e.detail.value].id, function(data) {
      self.setData({
        cityData: data.dataMap.childsList,
      })
      wx.hideToast()
    })
  },
  cityChange: function(e) {
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
    Map.getArea(this.data.cityData[e.detail.value].id, function(data) {
      self.setData({
        areaData: data.dataMap.childsList,
      })
      wx.hideToast()
    })
  },
  areaChange: function(e) {
    this.setData({
      area: this.data.areaData[e.detail.value].fullName,
      areaId: this.data.areaData[e.detail.value].id,
      areaIndex: e.detail.value
    })
  },
  formSubmit: function(e) { //提交表单
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
    } else if (e.detail.value.province == "") {
      wx.showModal({
        title: '错误',
        content: '请选择省',
        showCancel: false
      })
      return false
    } else if (e.detail.value.city == "") {
      wx.showModal({
        title: '错误',
        content: '请选择市',
        showCancel: false
      })
      return false
    } else if (e.detail.value.area == "") {
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
    wxRequest.postRequest('api/user/editUserInfo.do', {
        token: app.globalData.token,
        provinceId: this.data.provinceId,
        cityId: this.data.cityId,
        areaId: this.data.areaId,
        headImageName: this.data.headerFile,
        birthday: e.detail.value.birthday,
        weight: e.detail.value.weight,
        height: e.detail.value.height,
        degree: this.data.degree,
        mobile: e.detail.value.mobile,
        intro: this.data.intro,
        profession: e.detail.value.profession,
        qq: e.detail.value.qq,
        gender: e.detail.value.gender,
        realName: e.detail.value.realName,
        school: e.detail.value.school,
        startSchool: e.detail.value.startSchool,
        jobTypeId: e.detail.value.intent.toString(),
        email: e.detail.value.email,
        experience: e.detail.value.experience,
        eduSituation: e.detail.value.eduSituation
      })
      .then(res => {
        let lifePicturesCount = this.data.userResume.userLifePicture ? this.data.userResume.userLifePicture.length : 0
        return wxRequest.postRequest('api/user/updateDegree.do', {
          token: app.globalData.token,
          count: lifePicturesCount
        })
      })
      .then(res => {
        wx.navigateTo({
          url: '../lifePhoto/lifePhoto?userResume=' + JSON.stringify(this.data.userResume)
        })
      })
  },

})