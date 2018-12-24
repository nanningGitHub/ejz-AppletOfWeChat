var app = getApp()
var Utils = require('../../../utils/utils.js')
const wxRequest = require('../../../config/promise.js')
var MyJob = require('../../../store/myJob.js')
Page({
  data: {
      getShangGangJiLu: {},
      jobOffline: {},
      statusNum: '',
      workFlow: [],
      step: [
          { image: '../../../images/trail_success.png', text: '待录用' },
          { image: '', text: '已录用' },
          { image: '', text: '待结算' },
          { image: '', text: '已结算' }
      ]
  },
  onLoad: function (options) {
      var self = this
    wxRequest.getRequest('api/jobRequest/getShangGangJiLu.do', {
      token: app.globalData.token,
      jobId: options.jobId
    })
      .then(res => {
        let workFlow = res.dataMap.workFlow
        var workFlowData = []
        for (var i in workFlow) {
          workFlowData.unshift({
            time: Utils.getAllTime(workFlow[i].date),
            info: workFlow[i].info
          })
        }
        var statusNum = res.dataMap.statusNum
        var step = self.data.step
        var obj = {}
        switch (statusNum) {
          case -1:
            workFlowData.unshift({
              time: Utils.getAllTime(res.dataMap.jobOffline.modifyDate),
              info: '该职位已招满'
            })
            step[1].image = "../../../images/trail_fail.png"
            step[1].text = "已招满"
            break
          case 0:
            workFlowData.unshift({
              time: Utils.getAllTime(res.dataMap.jobOffline.modifyDate),
              info: '您已取消了该职位'
            })
            step[1].image = "../../../images/trail_fail.png"
            step[1].text = "已取消"
            break
          case 2:
            step[1].image = "../../../images/trail_success.png"
            break
          case 3:
            step[1].image = "../../../images/trail_success.png"
            step[1].text = "已上岗"
            break
          case 4:
            step[1].image = "../../../images/trail_success.png"
            step[1].text = "已上岗"
            step[2].image = "../../../images/trail_success.png"
            break
          case 5:
            step[1].image = "../../../images/trail_success.png"
            step[1].text = "已上岗"
            step[2].image = "../../../images/trail_success.png"
            step[3].image = "../../../images/trail_success.png"
            break
        }
        var jobData = res.dataMap.jobOffline
        jobData.image = Utils.imgLogo(jobData.jobSubtypeId)
        jobData.modifyTime = Utils.getLocalTime(jobData.modifyDate)
        this.setData({
          getShangGangJiLu: res.dataMap.getShangGangJiLu,
          jobOffline: jobData,
          statusNum: res.dataMap.statusNum,
          workFlow: workFlowData,
          step: step
        })
      })
  }
})