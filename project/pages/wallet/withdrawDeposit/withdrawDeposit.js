// pages/wallet/withdrawDeposit/withdrawDeposit.js
var app = getApp();
const wxRequest = require('../../../config/promise.js');
const Utils = require('../../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: app.globalData.token,
    bankList: [],
    displayMoney: 0,
    txMoney: '',
    bankId: '',
  },
  intoBinding() {
    wx.navigateTo({
      url: '/pages/wallet/binding/binding'
    })
  },
  allIn() {
    this.setData({
      txMoney: this.data.displayMoney
    })
  },
  moneyInput(e) {
    this.setData({
      txMoney: e.detail.value
    })
  },
  bankId(e) {
    let bankList = this.data.bankList;
    bankList.map(item => {
      item.type = false;
      if (item.id == e.currentTarget.dataset.bankid) {
        item.type = true;
      }
    })
    this.setData({
      bankId: e.currentTarget.dataset.bankid,
      bankList: bankList
    })
  },
  intoWithdrawalPassword() {
    if (this.data.txMoney > this.data.displayMoney) {
      wx.showToast({
        title: '提现金额大于可提现金额',
        icon: 'none'
      })
    } else if (this.data.txMoney < 10) {
      wx.showToast({
        title: '提现金额不能小于10元',
        icon: 'none'
      })
    } else if (this.data.txMoney > 30000) {
      wx.showToast({
        title: '提现金额大于30000元',
        icon: 'none'
      })
    } else if (!this.data.bankId) {
      wx.showToast({
        title: '请选择银行卡',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '/pages/wallet/WithdrawalPassword/WithdrawalPassword?txMoney=' + this.data.txMoney + '&bankId=' + this.data.bankId,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

    wxRequest.getRequest('api/user/getUserAmount.do', {
        token: app.globalData.token
      })
      .then(res => {
        this.setData({
          displayMoney: res.dataMap.displayMoney
        })
      })
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