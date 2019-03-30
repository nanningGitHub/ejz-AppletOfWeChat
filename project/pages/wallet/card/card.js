// pages/wallet/card/card.js
var app = getApp();
const wxRequest = require('../../../config/promise.js');
const Utils = require('../../../utils/utils.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: app.globalData.token,
    bankList: []
  },
  moveItem(e) {
    let index = e.currentTarget.dataset.index;
    let isDelete = this.data.bankList[index].isDelete
    if (isDelete) {
      this.data.bankList[index].isDelete = 0
    } else {
      this.data.bankList[index].isDelete = 1
    }
    this.setData({
      bankList: this.data.bankList
    })
  },
  unbind(e) {
    let bankId = e.currentTarget.dataset.id
    this.setData({
      bankId: bankId
    })
    wx.redirectTo({
      url: '/pages/wallet/Unbundpassword/Unbundpassword?bankId=' + bankId
    })
  },
  intoBinding() {
    wx.navigateTo({
      url: '/pages/wallet/binding/binding'
    })
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
    wxRequest.getRequest('api/user/ifBandBankCard.do', {
        token: app.globalData.token
      })
      .then(res => {
        if (res.code == 0) {
          let bankList = res.dataMap.bankList;
          bankList.map(item => {
            item.message = Utils.bankMessage(item.bankTypeId);
            item.bankNumber = item.bankNumber.substring(item.bankNumber.length - 4);
          })
          this.setData({
            bankList: res.dataMap.bankList
          })
        } else {

        }
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

  }
})