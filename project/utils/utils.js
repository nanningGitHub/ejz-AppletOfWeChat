var Utils = {
  wxUrl: "https://openapi.ejzhi.com/",
  // wxUrl: "http://localtestapi.ejzhi.com/",
  // wxUrl: "http://192.168.1.49:8081/",
  trim: function(str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  checkIndex: function(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == value) {
        return i
      } else {
        continue
      }
    }
  },
  getLocalTime: function(now) {
    var time = new Date(now);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    if (month < 10) {
      month = '0' + month
    }
    if (date < 10) {
      date = '0' + date
    }
    return year + "-" + month + "-" + date;
  },
  getTime: function(now) {
    var time = new Date(now);
    var hour = time.getHours();
    var minute = time.getMinutes();
    if (minute < 10) {
      minute = '0' + minute
    }
    return hour + ":" + minute;
  },
  getAllTime: function(now) {
    var time = new Date(now);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    if (month < 10) {
      month = '0' + month
    }
    if (date < 10) {
      date = '0' + date
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  },
  imgLogo: function(jobClass) { // 根据兼职类型获取图片
    switch (jobClass) {
      case 2:
        return "/images/offline/offline_practice.png";
        break;
      case 3:
        return "/images/offline/offline_in_school.png";
        break;
      case 5:
        return "/images/offline/offline_show.png";
        break;
      case 6:
        return "/images/offline/offline_ceremony.png";
        break;
      case 7:
        return "/images/offline/offline_model.png";
        break;
      case 8:
        return "/images/offline/offline_host.png";
        break;
      case 9:
        return "/images/offline/offline_security.png";
        break;
      case 11:
        return "/images/offline/offline_tutor.png";
        break;
      case 12:
        return "/images/offline/offline_assistant.png";
        break;
      case 14:
        return "/images/offline/offline_dispatch.png";
        break;
      case 15:
        return "/images/offline/offline_scan_code.png";
        break;
      case 16:
        return "/images/offline/offline_promotion.png";
        break;
      case 17:
        return "/images/offline/offline_sale.png";
        break;
      case 19:
        return "/images/offline/offline_waiter.png";
        break;
      case 20:
        return "/images/offline/offline_custom_service.png";
        break;
      case 21:
        return "/images/offline/offline_room_service.png";
        break;
      case 22:
        return "/images/offline/offline_express.png";
        break;
      case 24:
        return "/images/offline/offline_translate.png";
        break;
      case 25:
        return "/images/offline/offline_clerk.png";
        break;
      case 26:
        return "/images/offline/offline_plan.png";
        break;
      case 27:
        return "/images/offline/offline_editor.png";
        break;
      case 29:
        return "/images/offline/offline_technology.png";
        break;
      case 30:
        return "/images/offline/offline_product.png";
        break;
      case 31:
        return "/images/offline/offline_operate.png";
        break;
      case 32:
        return "/images/offline/offline_design.png";
        break;
      case 34:
        return "/images/offline/offline_volunteer.png";
        break;
      case 35:
        return "/images/offline/offline_casual.png";
        break;
      case 36:
        return "/images/offline/offline_accounting.png";
        break;
      case 37:
        return "/images/offline/offline_other.png";
        break;
    }
  }
}

module.exports = Utils;