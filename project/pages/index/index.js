//index.js
//获取应用实例
var app = getApp()
const Utils = require('../../utils/utils.js')
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
const wxRequest = require('../../config/promise.js')
var map = new QQMapWX({
  key: 'CPGBZ-CCRL4-UWZUW-XEWUC-OMUS5-EKBFB' // 必填
})
Page({
  data: {
    bannerList: [],
    messageList: [],
    jobList: [],
    navList: [{
        name: '附近兼职',
        url: 'nav_1',
        type: 'near'
      },
      {
        name: '日结兼职',
        url: 'nav_2',
        type: 'date'
      },
      {
        name: '高薪兼职',
        url: 'nav_3',
        type: 'high'
      },
      {
        name: '实习专区',
        url: 'nav_4',
        type: 'practice'
      }
    ],
    code: '',
    vi: '',
    encryptedData: ''
  },
  onShow: function() {
    const token = wx.getStorageSync('token');
    if (token) {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 必须是在用户已经授权的情况下调用
            wx.getUserInfo({
              success(res) {
                wx.setStorageSync('rawData', res.rawData)
              }
            })
          } else {
            const rawData = wx.getStorageSync('rawData');
            if (!rawData) {
              wx.redirectTo({
                url: '/pages/manage/userinfo/userinfo'
              })
            }
          }
        }
      })
    } else {
      wx.redirectTo({
        url: '/pages/manage/loginNew/loginNew'
      })
    }
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.getLocation({ //获取地理位置
                type: 'wgs84',
                success: res => {
                  var latitude = res.latitude
                  var longitude = res.longitude
                  var speed = res.speed
                  var accuracy = res.accuracy
                  app.globalData.location = res
                  that.loadCity(longitude, latitude)
                }
              })
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '请进行位置授权',
                success(res) {
                  if (res.confirm) {
                    that.openSetting()
                  } else if (res.cancel) {
                    that.getIndexList()
                  }
                }
              })
            }
          })
        } else {
          wx.getLocation({ //获取地理位置
            type: 'wgs84',
            success: res => {
              var latitude = res.latitude
              var longitude = res.longitude
              var speed = res.speed
              var accuracy = res.accuracy
              app.globalData.location = res
              that.loadCity(longitude, latitude)
            }
          })
        }
      }
    })
    // //判断用户是否授权地理位置
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       // 必须是在用户已经授权的情况下调用
    //       wx.getLocation({ //获取地理位置
    //         type: 'wgs84',
    //         altitude: true,
    //         success: res => {
    //           var latitude = res.latitude
    //           var longitude = res.longitude
    //           var speed = res.speed
    //           var accuracy = res.accuracy
    //           app.globalData.location = res
    //           this.loadCity(longitude, latitude)
    //         }
    //       })
    //     } else {
    //     }
    //   }
    // })
  },
  toJobDetail: function(event) {
    let item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/job/detail/detail?jobData=' + JSON.stringify(item)
    })
  },
  loadCity: function(longitude, latitude) { // 调用接口
    map.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: res => {
        this.getCityId(res.result.address_component.city)
      }
    })
  },
  getCityId: function(city) { //
    wxRequest.getRequest('api/city/getCity.do', {
        cityName: city
      })
      .then(res => {
        app.globalData.cityId = res.dataMap.cityId;
        return res
      })
      .then(res => {
        this.getIndexList()
      })
  },
  getIndexList: function() {
    wxRequest.getRequest("showHome.do", {
        cityId: app.globalData.cityId,
        appVersion: '',
        pageNo: '',
        pageSize: 10
      })
      .then(res => {
        let jobList = res.dataMap.jobofflineList
        jobList.map(item => {
          item.startTime = Utils.getLocalTime(item.startDate)
          item.endTime = Utils.getLocalTime(item.endDate)
          item.lastFreshTime = Utils.getLocalTime(item.lastFreshDate)
          item.startWorkTime = Utils.getTime(item.startDate)
          item.endWorkTime = Utils.getTime(item.endDate)
        })
        this.setData({
          // bannerList: res.dataMap.bannerList,
          messageList: res.dataMap.messageList,
          jobList: jobList
        })
      })
  },
  Search() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  onShareAppMessage() { //右上角进行分享
    return {
      title: 'e小兼',
      path: '/pages/index/index',
      success() {},
      fail() {}
    }
  },
  openSetting() {
    var that = this;
    wx.openSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          wx.getLocation({ //获取地理位置
            type: 'wgs84',
            success: res => {
              var latitude = res.latitude
              var longitude = res.longitude
              var speed = res.speed
              var accuracy = res.accuracy
              app.globalData.location = res
              that.loadCity(longitude, latitude)
            }
          })
        } else {
          that.getIndexList()
        }
      },
      fail() {

      }
    })
  },

})