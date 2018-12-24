// pages/search/search.js
const wxRequest = require('../../config/promise.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotWords: [],
    searchkey: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wxRequest.getRequest('api/job/offline/getHotWord.do', {})
      .then(res => {
        this.setData({
          hotWords: res.dataMap.hotWords,
          searchkey: ''
        })
      })
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
  bindKeyInput: function(e) { //搜索输入框
    this.setData({
      searchkey: e.detail.value
    })
  },
  Cancel() { //点击确定
    wx.navigateTo({
      url: '/pages/job/navList/navList?searchkey=' + this.data.searchkey
    })
  },
  HotWord(e) { //HotWord
    this.setData({
      searchkey: e.currentTarget.dataset.item
    })
    this.Cancel()
  }


})