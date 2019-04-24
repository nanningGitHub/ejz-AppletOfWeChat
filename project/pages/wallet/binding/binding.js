// pages/wallet/binding/binding.js
var app = getApp();
const wxRequest = require('../../../config/promise.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    code: '获取验证码',
    banklist: [],
    creditCardNumbers: '请选择开户银行',
    token: "",
    name: '',
    cardNumber: '',
    bankTypeId: '',
    bankNumber: '',
    phoneNumber: '',
    forbid: false //当验证码成功时，禁止编辑验证码之前内容
  },
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  cardNumber(e) {
    this.setData({
      cardNumber: e.detail.value
    })
  },
  bindPickerChange(e) {
    let index = e.detail.value
    this.setData({
      creditCardNumbers: this.data.banklist[index].name,
      bankTypeId: this.data.banklist[index].id
    })
  },
  bankNumber(e) {
    this.setData({
      bankNumber: e.detail.value
    })
  },
  phoneNumber(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  validateCode(e) {
    this.setData({
      msgCode: e.detail.value
    })
  },
  getSendMesCode() {
    if (this.data.disabled) {
      if (!this.data.token) {
        wx.showToast({
          icon: 'none',
          title: '请登录',
        })
      } else if (!this.data.name) {
        wx.showToast({
          icon: 'none',
          title: '请输入持卡人姓名',
        })
      } else if (!this.data.cardNumber) {
        wx.showToast({
          icon: 'none',
          title: '请输入身份证号',
        })
      } else if (!this.data.bankTypeId) {
        wx.showToast({
          icon: 'none',
          title: '请选择开户银行',
        })
      } else if (!this.data.bankNumber) {
        wx.showToast({
          icon: 'none',
          title: '请输入银行卡号',
        })
      } else if (!this.data.phoneNumber) {
        wx.showToast({
          icon: 'none',
          title: '请输入银行预留手机号',
        })
      } else {
        this.sendMes();
      }
    } else {

    }
  },
  sendMes() {
    wxRequest.postRequest('api/user/sendMes.do', {
        token: this.data.token,
        name: this.data.name,
        card_number: this.data.cardNumber,
        bankTypeId: this.data.bankTypeId,
        bank_number: this.data.bankNumber,
        phone_number: this.data.phoneNumber
      })
      .then(res => {
        this.goGetCode();
        this.setData({
          forbid: true
        })
      })
  },
  goGetCode() { //获取短信倒计时
    var that = this;
    var time = 60;
    that.setData({
      code: '60秒后重发',
      disabled: false
    })
    var Interval = setInterval(function() {
      time--;
      if (time > 0) {
        that.setData({
          code: time + '秒后重发'
        })
      } else {
        clearInterval(Interval);
        that.setData({
          code: '获取验证码',
          disabled: true
        })
      }
    }, 1000)
  },

  AddToComplete() {
    let AddToCompleteType = true;
    if (AddToCompleteType) {
      AddToCompleteType = false;
      if (!this.data.token) {
        wx.showToast({
          icon: 'none',
          title: '请登录',
        })
      } else if (!this.data.name) {
        wx.showToast({
          icon: 'none',
          title: '请输入持卡人姓名',
        })
      } else if (!this.data.cardNumber) {
        wx.showToast({
          icon: 'none',
          title: '请输入身份证号',
        })
      } else if (!this.data.bankTypeId) {
        wx.showToast({
          icon: 'none',
          title: '请选择开户银行',
        })
      } else if (!this.data.bankNumber) {
        wx.showToast({
          icon: 'none',
          title: '请输入银行卡号',
        })
      } else if (!this.data.phoneNumber) {
        wx.showToast({
          icon: 'none',
          title: '请输入银行预留手机号',
        })
      } else if (!this.data.msgCode) {
        wx.showToast({
          icon: 'none',
          title: '请输入验证码',
        })
      } else {
        wxRequest.postRequest('api/user/bandBank.do', {
            token: this.data.token,
            name: this.data.name,
            card_number: this.data.cardNumber,
            bankTypeId: this.data.bankTypeId,
            bank_number: this.data.bankNumber,
            phone_number: this.data.phoneNumber,
            msgCode: this.data.msgCode
          })
          .then(res => {
            AddToCompleteType = true;
            wx.redirectTo({
              url: '/pages/wallet/BindingSuccess/BindingSuccess'
            })
          })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wxRequest.getRequest('api/bank/getBankList.do', {})
      .then(res => {
        this.setData({
          banklist: res.dataMap.bank
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
    this.setData({
      token: app.globalData.token
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