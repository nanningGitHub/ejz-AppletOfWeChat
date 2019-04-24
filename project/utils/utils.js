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
  getMD: function(now) {
    var time = new Date(now);
    var month = time.getMonth() + 1;
    var date = time.getDate();
    if (month < 10) {
      month = '0' + month
    }
    if (date < 10) {
      date = '0' + date
    }
    return month + "月" + date + "日";
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
  bankMessage: function(bankTypeId) {
    const bank = {
      1: {
        bankName: '中国农业银行',
        bankloge: 'ABC'
      },
      2: {
        bankName: '中国银行',
        bankloge: 'BOC'
      },
      3: {
        bankName: '中国建设银行',
        bankloge: 'CCB'
      },
      4: {
        bankName: '中国工商银行',
        bankloge: 'ICBC'
      },
      5: {
        bankName: '中国民生银行',
        bankloge: 'CMSB'
      },
      6: {
        bankName: '招商银行',
        bankloge: 'CMB'
      },
      7: {
        bankName: '兴业银行',
        bankloge: 'CIB'
      },
      8: {
        bankName: '中信银行',
        bankloge: 'CITIC'
      },
      9: {
        bankName: '中国光大银行',
        bankloge: 'CEB'
      },
      10: {
        bankName: '平安银行',
        bankloge: 'SPABANK'
      },
      11: {
        bankName: '中国邮政储蓄银行',
        bankloge: 'PSBC'
      },
      12: {
        bankName: '交通银行',
        bankloge: 'COMM'
      },
      13: {
        bankName: '广东发展银行',
        bankloge: 'GDB'
      },
      14: {
        bankName: '浦发银行',
        bankloge: 'SPDB'
      }
    }
    return bank[bankTypeId] || [];
  },
  // 优化加载图片速度开始
  ossImg(url) {
    let ossUrl = "^[http|https]+://[^\\s|?|/]*.aliyuncs.com/[^\\s|?|/]*$";
    if (url.match(ossUrl)) {
      return url + "?x-oss-process=image/format,webp";
    } else {
      return url;
    }
  }
  // 优化加载图片速度结束
}

module.exports = Utils;