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
    navList: [],
    scrollLeft: 0,
    pageNo: 1,
    subjectList: [], // 模块推荐
    jobofflineList: [], //底部推荐岗位list
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
                    that.newHomeTop();
                    that.newHomeBottom();
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
  },

  // 判断用户是否开放位置信息 开始
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
          that.newHomeTop();
          that.newHomeBottom();
        }
      }
    })
  },
  // 判断用户是否开放位置信息 结束


  // 点击岗位进入详情页 开始
  toJobDetail: function(event) {
    let JobOfflineId = event.currentTarget.dataset.jobofflineid;
    wx.navigateTo({
      url: '/pages/job/detail/detail?JobOfflineId=' + JobOfflineId + '&cityId=' + app.globalData.cityId
    })
  },
  // 点击岗位进入详情页 结束

  // 通过经纬度获取城市名字开始
  loadCity: function(longitude, latitude) {
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
  //通过经纬度获取城市名字开始

  // 通过城市名字获取cityId开始
  getCityId: function(city) {
    wxRequest.getRequest('api/city/getCity.do', {
        cityName: city
      })
      .then(res => {
        app.globalData.cityId = res.dataMap.cityId;
        return res
      })
      .then(res => {
        this.newHomeTop();
        this.newHomeBottom();
      })
  },
  // 通过城市名字获取cityId结束

  //右上角进行分享开始
  onShareAppMessage() {
    return {
      title: 'e小兼',
      path: '/pages/index/index',
      success() {},
      fail() {}
    }
  },
  // 右上角进行分享结束

  // 点击搜索框开始
  Search() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 点击搜索框结束

  // 数据显示上面部分开始
  newHomeTop() {
    wxRequest.getRequest("newHomeTop.do", {
        cityId: app.globalData.cityId,
      })
      .then(res => {
        let bannerList = res.dataMap.bannerList || [];
        let navList = res.dataMap.navList || [];
        // console.log(bannerList);
        // console.log(navList)
        // bannerList.map(item => {
        //   item.imageUrl = Utils.ossImg(item.imageUrl)
        // })
        this.setData({
          bannerList: bannerList,
          navList: navList,
        })
      })
  },
  // 数据显示上面部分结束

  // 首页新接口下半部分开始
  newHomeBottom() {
    wxRequest.getRequest("newHomeBottom.do", {
        cityId: app.globalData.cityId,
        pageNo: this.data.pageNo,
        pageSize: 10
      })
      .then(res => {
        let subjectList = res.dataMap.subjectList || [];
        let jobofflineList = res.dataMap.jobofflineList || [];
        let oldJobofflineList = this.data.jobofflineList;
        subjectList.map(item => {
          item.jobOffline.map(item => {
            item.startTime = Utils.getLocalTime(item.startDate)
            item.endTime = Utils.getLocalTime(item.endDate)
            item.lastFreshTime = Utils.getLocalTime(item.lastFreshDate)
            item.startWorkTime = Utils.getTime(item.startDate)
            item.endWorkTime = Utils.getTime(item.endDate)
          })
        })
        jobofflineList.map(item => {
          item.startTime = Utils.getLocalTime(item.startDate)
          item.endTime = Utils.getLocalTime(item.endDate)
          item.lastFreshTime = Utils.getLocalTime(item.lastFreshDate)
          item.startWorkTime = Utils.getTime(item.startDate)
          item.endWorkTime = Utils.getTime(item.endDate)
        })
        this.setData({
          subjectList: subjectList,
          jobofflineList: [...oldJobofflineList, ...jobofflineList],
        })

      })
  },
  // 首页新接口下半部分结束

  // nav 的滚动事件开始
  scroll(e) {
    console.log(e.detail.scrollLeft);
    this.setData({
      scrollLeft: e.detail.scrollLeft
    })
  },
  // nav 的滚动事件结束

  // 点击nav判断开始
  navTo(e) {
    let item = e.currentTarget.dataset.item;
    console.log(item)
    if (item.goType == 4 || item.goType == 5) {
      if (item.goType == 4) {
        wx.navigateTo({
          url: '../job/navList/navList?prefectureId=' + item.prefectureId + '&goType=' + item.goType
        })
      } else {
        wx.navigateTo({
          url: '../job/navList/navList?mainJobType=' + item.jobTypeId + '&goType=' + item.goType
        })
      }
    } else if (item.goType == 1) {
      wx.navigateTo({
        url: '../job/h5/h5?goUrl=' + item.goUrl + '&goType=' + item.goType
      })
    } else if (item.goType = 3) {
      wx.navigateTo({
        url: '../job/detail/detail?JobOfflineId=' + item.id + '&goType=' + item.goType
      })
    }
  },
  // 点击nav判断结束

  // 上拉加载数据开始
  onReachBottom() {
    this.data.pageNo++
      this.setData({
        pageNo: this.data.pageNo
      })
    this.newHomeBottom()
  },
  // 上拉加载数据结束

  // 上拉刷新数据开始
  onPullDownRefresh() {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      bannerList: [],
      navList: [],
      scrollLeft: 0,
      pageNo: 1,
      subjectList: [], // 模块推荐
      jobofflineList: [], //底部推荐岗位list
      encryptedData: ''
    })
    this.newHomeTop();
    this.newHomeBottom();
    setTimeout(function() {
      wx.stopPullDownRefresh()
      wx.hideLoading()
    }, 1000)

  }
  // 上拉刷新数据结束
})