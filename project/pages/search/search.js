// pages/search/search.js
const wxRequest = require('../../config/promise.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotWords: [],
    historyList: [],
    searchkey: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotWord()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getHistory()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 获取热门搜索关键词开始
  getHotWord() {
    wxRequest.getRequest('api/job/offline/getHotWord.do', {})
      .then(res => {
        this.setData({
          hotWords: res.dataMap.hotWords,
          searchkey: ''
        })
      })
  },
  // 获取热门搜索关键词结束


  bindKeyInput: function(e) { //搜索输入框
    this.setData({
      searchkey: e.detail.value
    })
  },

  //点击确定按钮开始
  Cancel() {
    if (this.data.searchkey) {
      wx.navigateTo({
        url: '/pages/job/navList/navList?searchkey=' + this.data.searchkey 
      })
      let historyList = this.data.historyList;
      let storageType = historyList.some(item => {
        return item == this.data.searchkey
      })
      if (!storageType) {
        wx.setStorage({
          key: 'history',
          data: [...this.data.historyList, this.data.searchkey]
        })
      }
      this.setData({
        searchkey: ''
      })
    }
  },
  //点击确定按钮结束

  // 点击搜索关键词开始
  HotWord(e) {
    this.setData({
      searchkey: e.currentTarget.dataset.item
    })

    this.Cancel()
  },
  //  点击搜索关键词结束


  // 清空历史搜索开始
  deleteHistory() {
    let that = this;
    wx.removeStorage({
      key: 'history',
      success(res) {
        that.setData({
          historyList: []
        })
      }
    })
  },
  // 清空历史搜索结束

  // 获取缓存历史搜索开始
  getHistory() {
    let that = this;
    wx.getStorage({
      key: 'history',
      success(res) {
        that.setData({
          historyList: res.data
        })
      }
    })
  }
  //  获取缓存历史搜索结束

})