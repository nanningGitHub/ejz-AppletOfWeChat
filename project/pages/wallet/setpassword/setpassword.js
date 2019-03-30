// pages/wallet/setpassword/setpassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    asterisk: ''
  },
  addkey(e) {
    if (this.data.password.length < 6) {
      this.setData({
        password: this.data.password + e.target.dataset.number,
        asterisk: this.data.asterisk + e.target.dataset.asterisk
      })
      if (this.data.password.length == 6) {
        wx.redirectTo({
          url: '/pages/wallet/confirmPassword/confirmPassword?password=' + this.data.password,
        })
      }
    }
  },
  deletePassword() {
    let password = this.data.password;
    let asterisk = this.data.asterisk;
    password = password.slice(0, password.length - 1);
    asterisk = asterisk.slice(0, asterisk.length - 1);
    this.setData({
      password: password,
      asterisk: asterisk
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