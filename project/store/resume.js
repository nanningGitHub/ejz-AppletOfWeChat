var Utils = require('../utils/utils.js');
var Resume = {
    showUserResume: function (token, callback) { //获取用户简历
        wx.request({
            url: Utils.wxUrl + 'api/user/showUserResume.do',
            data: {
                token: token
            },
            method: 'GET',
            success: function (res) {
                callback(res.data)
            }
        })
    },
    editUserInfo: function (token, provinceId, cityId, areaId, headImageName, birthday, weight, height, degree, mobile, intro, profession, qq, gender, realName, school, startSchool, jobTypeId, email, experience, eduSituation, callback) { // 编辑简历
        wx.request({
            url: Utils.wxUrl + 'api/user/editUserInfo.do',
            data: {
                token: token,
                provinceId: provinceId,
                cityId: cityId,
                areaId: areaId,
                headImageName: headImageName,
                birthday: birthday,
                weight: weight,
                height: height,
                degree: degree,
                mobile: mobile,
                intro: intro,
                profession: profession,
                qq: qq,
                gender: gender,
                realName: realName,
                school: school,
                startSchool: startSchool,
                jobTypeId: jobTypeId,
                email: email,
                experience: experience,
                eduSituation: eduSituation
            },
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                callback(res.data)
            }
        })
    },
    addLifePic: function (token, lifePicNames, callback) { //上传生活照
        wx.request({
            url: Utils.wxUrl + 'api/user/addLifePic.do',
            data: {
                token: token,
                lifePicNames: lifePicNames
            },
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                callback(res.data)
            }
        })
    },
    updateDegree: function (token, count, callback) { //修改简历完善度
        wx.request({
            url: Utils.wxUrl + 'api/user/updateDegree.do',
            data: {
                token: token,
                count: count
            },
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                callback(res.data)
            }
        })
    }
}

module.exports = Resume;