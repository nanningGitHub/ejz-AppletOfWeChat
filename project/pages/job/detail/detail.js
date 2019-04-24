var app = getApp()
var Utils = require('../../../utils/utils.js')
var wxRequest = require('../../../config/promise.js')
Page({
  data: {
    isShow: false,
    item: {}, //岗位信息
    isdeliver: false,
    status: -1, //收藏兼职状态
    favoriteJobId: '', //岗位的ID
    enterprise: {}, //企业信息
    enroll: [], //已报名同学列表
    cityId: '', //获取相关推荐需要城市ID
    recommentList: [] //相关推荐岗位list
  },
  dictionary: {
    gender: {
      0: '男',
      1: '女',
      2: '不限'
    }
  },
  onLoad: function(option) {
    this.setData({
      JobOfflineId: option.JobOfflineId,
      cityId: app.globalData.cityId
    })
  },
  onShow() {
    this.getSingle()
  },

  // 通过线下兼职ID获取兼职信息开始
  getSingle() {
    wxRequest.getRequest('api/job/offline/getSingle.do', {
        JobOfflineId: this.data.JobOfflineId
      })
      .then(res => {
        let jobOffline = res.dataMap.jobOffline;
        jobOffline.startTime = Utils.getLocalTime(jobOffline.startDate)
        jobOffline.endTime = Utils.getLocalTime(jobOffline.endDate)
        jobOffline.lastFreshTime = Utils.getLocalTime(jobOffline.lastFreshDate)
        jobOffline.startWorkTime = Utils.getTime(jobOffline.startDate)
        jobOffline.endWorkTime = Utils.getTime(jobOffline.endDate)
        this.setData({
          item: jobOffline
        })
      })
      .then(res => {
        this.getEnterprise();
        this.getisdeliver();
        this.getFavoriteJobId();
        this.getRecommentJobList();
      })
  },
  // 通过线下兼职ID获取兼职信息结束

  // 获取企业详情开始
  getEnterprise() {
    wxRequest.getRequest('api/enterprise/getEnterprise.do', {
        enterpriseId: this.data.item.enterpriseId
      })
      .then(res => {
        this.setData({
          enterprise: res.dataMap.enterprise
        })
      })
  },
  // 获取企业详情结束

  // 查看用户投递岗位状态开始
  getisdeliver() {
    wxRequest.postRequest('api/job/offline/getisdeliver.do', {
        token: app.globalData.token,
        jobOfflineId: this.data.item.id
      })
      .then(res => {
        this.setData({
          isdeliver: res.dataMap.isdeliver
        })
      })
  },
  // 查看用户投递岗位状态结束


  // 查看用户收藏兼职状态开始
  getFavoriteJobId() {
    wxRequest.postRequest('api/company/getFavoriteJobId.do', {
        token: app.globalData.token,
        jobOfflineId: this.data.item.id
      })
      .then(res => {
        this.setData({
          favoriteJobId: res.dataMap.favoriteJobId || "",
          status: res.dataMap.status,
        })
      })
  },
  //  查看用户收藏兼职状态结束




  deliverResume: function() {
    if (this.data.isdeliver) {
      wx.showToast({
        icon: 'none',
        title: '您已经投递完成了'
      })
      return;
    }
    wx.showToast({
      icon: 'loading',
      duration: 1000
    })
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/pages/manage/login/login"
      })
    }
    wxRequest.getRequest('api/job/offline/deliverResume.do', {
        token: app.globalData.token,
        jobOfflineId: this.data.item.id
      })
      .then(res => {
        var that = this;
        wx.navigateTo({
          url: '../deliverSuccess/deliverSuccess?jobId=' + this.data.item.id,
          success: function(res) {
            that.setData({
              isdeliver: true
            })
          },
          contact: function(e) {
            if (this.data.isdeliver) {
              wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.mobile
              })
            } else {
              wx.showModal({
                title: '无法联系企业',
                content: '请先投递简历，才能联系企业',
                showCancel: false
              })
            }
          },
          onShareAppMessage: function(res) {
            if (res.from === 'button') {
              // 来自页面内转发按钮
            }
            return {
              title: '查看兼职详情',
              path: '/pages/job/detail/detail?jobData=' + JSON.stringify(item)
            }
          },

        })
      })
  },

  //  打开地图开始
  OpenLocation() {
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
    })

  },
  // 打开地图结束








  // 点击收藏按钮开始
  FavoriteJob() {
    if (this.data.status == 1) {
      this.delFavoriteJob();
    } else if (this.data.status == -1) {
      this.addFavoriteJob();
    } else {
      return;
    }
  },
  // 点击收藏按钮结束

  // 收藏兼职开始
  addFavoriteJob() {
    wxRequest.postRequest('api/company/addFavoriteJob.do', {
        token: app.globalData.token,
        jobOfflineId: this.data.item.id
      })
      .then(res => {
        this.setData({
          favoriteJobId: res.dataMap.userFavoriteId,
          status: 1
        })
      })
  },
  // 收藏兼职结束


  // 取消兼职开始
  delFavoriteJob() {
    wxRequest.postRequest('api/company/delFavoriteJob.do', {
        token: app.globalData.token,
        favoriteId: this.data.favoriteJobId
      })
      .then(res => {
        this.setData({
          favoriteJobId: '',
          status: -1
        })
      })
  },
  // 取消兼职结束

  // 推荐兼职开始
  getRecommentJobList() {
    wxRequest.postRequest('api/job/offline/getRecommentList.do', {
        jobId: this.data.item.id,
        cityId: this.data.cityId,
        mainType: this.data.item.jobMainTypeId,
        subType: this.data.item.jobSubtypeId,
      })
      .then(res => {
        let recommentList = res.dataMap.recommentList;
        recommentList.map(item => {
          item.startTime = Utils.getLocalTime(item.startDate)
          item.endTime = Utils.getLocalTime(item.endDate)
          item.lastFreshTime = Utils.getLocalTime(item.lastFreshDate)
          item.startWorkTime = Utils.getTime(item.startDate)
          item.endWorkTime = Utils.getTime(item.endDate)
        })
        this.setData({
          recommentList: recommentList
        })
      })
  },
  // 推荐兼职结束

  // 点击相关岗位重新渲染页面数据开始
  RenderJobDetail: function(event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      item: item,
    })
    this.getisdeliver();
    this.getFavoriteJobId();
    this.getRecommentJobList()
    this.getEnterprise();
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  // 点击相关岗位重新渲染页面数据结束
})