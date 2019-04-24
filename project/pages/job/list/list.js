//index.js
//获取应用实例
var app = getApp();
const Utils = require('../../../utils/utils.js');
const wxRequest = require('../../../config/promise.js');
Page({
  data: {
    mainJobType: '',
    subJobType: '',
    sortType: '',
    cityId: app.globalData.cityId,
    settlementType: '',
    childrenList: [],
    jobOfflinePage: {
      dataList: []
    },
    pageNo: 1,
    flagJob: false,
    flagSort: false,
    flagFilter: false,
    items: [{
        value: '不限',
        checked: true
      },
      {
        value: '男生可做'
      },
      {
        value: '女生可做'
      }
    ],
    IDitems: [{
        value: '不限',
        checked: true
      },
      {
        value: '学生可做'
      },
      {
        value: '非学生可做'
      }
    ]
  },
  onLoad: function() {
    this.GetScreen();
  },
  onShow() {
    this.GetJobLists();
  },
  selectSort(e) {
    if (e.currentTarget.dataset.flag == 'flagJob') {
      this.data.flagJob = !this.data.flagJob;
      this.data.flagSort = false;
      this.data.flagFilter = false;
    }
    if (e.currentTarget.dataset.flag == 'flagSort') {
      this.data.flagSort = !this.data.flagSort;
      this.data.flagJob = false;
      this.data.flagFilter = false;
    }
    if (e.currentTarget.dataset.flag == 'flagFilter') {
      this.data.flagFilter = !this.data.flagFilter;
      this.data.flagJob = false;
      this.data.flagSort = false;
    }
    this.setData({
      flagJob: this.data.flagJob,
      flagSort: this.data.flagSort,
      flagFilter: this.data.flagFilter
    })
  },
  closeSelect() {
    this.setData({
      flagJob: false,
      flagSort: false,
      flagFilter: false,
    })
  },
  userEntry: function() { //进入我要找兼职
    app.login('user', function() {
      wx.navigateTo({
        url: '../findJob/intent/intent'
      })
    })
  },
  enterpriseEntry: function() { //进入我要招人
    app.login('enterprise', function() {
      wx.navigateTo({
        url: '../enterprise/intent/intent'
      })
    })
  },
  checkOpenId: function(entry) { //判断openId是否绑定
    wx.getStorage({
      key: 'token',
      success: function(res) {},
      fail: function() {}
    })
  },
  GetScreen() { //请求筛选条件
    wxRequest.getRequest('api/job/offline/getConditions.do', {
        cityName: app.globalData.cityId,
      })
      .then(res => {
        res.dataMap.cityList[0].flag = true;
        res.dataMap.settlementList[0].flag = true;
        res.dataMap.sortTypeList[0].flag = true;
        res.dataMap.jobTypeList[0].flag = true;
        let childrenList = res.dataMap.jobTypeList[0].childrenList;
        childrenList[0].flag = true;
        this.setData({
          dataMap: res.dataMap,
          childrenList: childrenList
        })
      })
      .then(res => {
        // this.getIndexList()
      })
  },
  JobTypeParent(e) { //点击职位的父级
    let ParentValue = e.currentTarget.dataset.value;
    let jobTypeList = this.data.dataMap.jobTypeList;
    for (let i in jobTypeList) {
      jobTypeList[i].flag = false;
      if (jobTypeList[i].value == ParentValue) {
        jobTypeList[i].flag = true;
      }
    }
    this.data.dataMap.jobTypeList = jobTypeList;
    this.setData({
      dataMap: this.data.dataMap,
      childrenList: e.currentTarget.dataset.childrenlist,
      mainJobType: ParentValue,
    })
  },
  JobTypeChildren(e) { //点击职位的子级
    this.data.jobOfflinePage.dataList = [];
    let ChildrenValue = e.currentTarget.dataset.value;
    let childrenList = this.data.childrenList;
    for (let i in childrenList) {
      childrenList[i].flag = false;
      if (childrenList[i].value == ChildrenValue) {
        childrenList[i].flag = true;
      }
    }
    this.data.childrenList = childrenList;
    this.setData({
      childrenList: this.data.childrenList,
      subJobType: ChildrenValue,
      flagJob: false,
      pageNo: 1,
      jobOfflinePage: this.data.jobOfflinePage
    })
    this.GetJobLists()

  },
  SortTypeList(e) { //排序的点击事件
    this.data.jobOfflinePage.dataList = [];
    let value = e.currentTarget.dataset.value;
    let sortTypeList = this.data.dataMap.sortTypeList;
    for (let i in sortTypeList) {
      sortTypeList[i].flag = false;
      if (sortTypeList[i].value == value) {
        sortTypeList[i].flag = true;
      }
    }
    this.data.dataMap.sortTypeList = sortTypeList
    this.setData({
      dataMap: this.data.dataMap,
      sortType: value,
      flagSort: false,
      pageNo: 1,
      jobOfflinePage: this.data.jobOfflinePage
    })
    this.GetJobLists()
  },
  CityList(e) { //城市的选择
    let cityValue = e.currentTarget.dataset.value;
    let cityList = this.data.dataMap.cityList;
    for (let i in cityList) {
      if (cityList[0].value == cityValue) {
        cityList[i].flag = false;
      } else {
        cityList[0].flag = false;
      }
      if (cityList[i].value == cityValue) {
        cityList[i].flag = !cityList[i].flag;
      }
    }
    this.data.dataMap.cityList = cityList;
    this.setData({
      dataMap: this.data.dataMap
    })
  },
  SettlementList(e) { //结算的方式选择
    let SettlementValue = e.currentTarget.dataset.value;
    let SettlementList = this.data.dataMap.settlementList;
    for (let i in SettlementList) {
      if (SettlementList[0].value == SettlementValue) {
        SettlementList[i].flag = false;
      } else {
        SettlementList[0].flag = false;
      }
      if (SettlementList[i].value == SettlementValue) {
        SettlementList[i].flag = !SettlementList[i].flag;
      }
    }
    this.data.dataMap.SettlementList = SettlementList;
    this.setData({
      dataMap: this.data.dataMap
    })
  },
  ConfirmSelect(e) { //点击筛选方式===确定按钮
    this.data.jobOfflinePage.dataList = [];
    let cityId = [];
    let cityList = this.data.dataMap.cityList;
    for (let i in cityList) {
      if (cityList[i].flag == true) {
        cityId.push(cityList[i].value)
      }
    }
    cityId = cityId.toString()
    let settlementType = [];
    let SettlementList = this.data.dataMap.SettlementList;
    for (let i in SettlementList) {
      if (SettlementList[i].flag == true) {
        settlementType.push(SettlementList[i].value)
      }
    }
    settlementType = settlementType.toString()
    this.setData({
      cityId: cityId,
      settlementType: settlementType,
      flagFilter: false,
      pageNo: 1,
      jobOfflinePage: this.data.jobOfflinePage
    })
    this.GetJobLists();
  },
  ClearSelect(e) { //点击筛选方式===重置按钮
    // 清空结算方式开始
    let SettlementList = this.data.dataMap.settlementList;
    for (let i in SettlementList) {
      SettlementList[i].flag = false;
    }
    SettlementList[0].flag = true;
    this.data.dataMap.SettlementList = SettlementList;
    // 清空结算方式结束

    //  清空工作区域开始
    let cityList = this.data.dataMap.cityList;
    for (let i in cityList) {
      cityList[i].flag = false;
    }
    cityList[0].flag = true;
    this.data.dataMap.cityList = cityList;
    // 清空工作区域结束
    this.setData({
      dataMap: this.data.dataMap
    })
  },
  onReachBottom() {
    this.data.pageNo++
      this.setData({
        pageNo: this.data.pageNo
      })
    this.GetJobLists()
  },
  GetJobLists() { //获取工作列表
    wxRequest.getRequest('api/job/offline/getList.do', {
        mainJobType: this.data.mainJobType,
        subJobType: this.data.subJobType,
        sortType: this.data.sortType,
        cityId: this.data.cityId, //城市ID,多个时以","分割ID拼接字符串
        settlementType: this.data.settlementType, //结算类型,多个时以","分割ID拼接字符串
        pageNo: this.data.pageNo
      })
      .then(res => {
        let jobOfflinePage = res.dataMap.jobOfflinePage;
        let BeforeJobOfflinePage = this.data.jobOfflinePage;
        jobOfflinePage.dataList.map(item => {
          item.startTime = Utils.getLocalTime(item.startDate)
          item.endTime = Utils.getLocalTime(item.endDate)
          item.lastFreshTime = Utils.getLocalTime(item.lastFreshDate)
          item.startWorkTime = Utils.getTime(item.startDate)
          item.endWorkTime = Utils.getTime(item.endDate)
        })

        // jobOfflinePage.dataList = BeforeJobOfflinePage.dataList.concat(jobOfflinePage.dataList)
        jobOfflinePage.dataList = [...BeforeJobOfflinePage.dataList, ...jobOfflinePage.dataList]
        this.setData({
          jobOfflinePage: jobOfflinePage
        })
        // app.globalData.cityId = res.dataMap.cityId
        // return res
      })
      .then(res => {
        // this.getIndexList()
      })
  },

  // 点击岗位进入详情页 开始
  toJobDetail: function(event) {
    let JobOfflineId = event.currentTarget.dataset.jobofflineid;
    wx.navigateTo({
      url: '/pages/job/detail/detail?JobOfflineId=' + JobOfflineId + '&cityId=' + app.globalData.cityId
    })
  },
  // 点击岗位进入详情页 结束

  // 遮罩成滑动问题开始
  move() {

  }
  // 遮罩成滑动问题结束
})