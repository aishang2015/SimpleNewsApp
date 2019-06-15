function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' //数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: '服务器地址' + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        wx.hideLoading();
        resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading();
        reject(false)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })
}

// 如果在访问api时，还未取得token。则主动取得token一次。以保证服务器顺利校验token。
function safeRequest(url, method, data){
  if (wx.getStorageSync('access_token') == '') {
    return new Promise((resolve, reject) => {
      wx.login({
        success: wxlogin_res => {
          if (wxlogin_res.code) {
            wx.request({
              url: "服务器地址/api/wechatapp/login",
              data: {
                code: wxlogin_res.code
              },
              method: "POST",
              dataType: "json",
              success: request_res => {
                wx.setStorage({
                  key: "access_token",
                  data: request_res.data.access_token
                });
                resolve(request_res.data.access_token);
              }
            });
          }
        },
        fail: () => { }
      });
    }).then(function (res) {
      return request(url, method, data);
    });
  }else{
    return request(url, method, data);
  }
}

export function get(url, data) {
  return safeRequest(url, 'GET', data);
}

export function post(url, data) {
  return safeRequest(url, 'POST', data)
}

export function wash(html) {
  html = html.replace("<!DOCTYPE html>", "").replace("<html>", "")
    .replace("<head>", "").replace("</head>", "").replace("<body>", "").replace("</body>", "").replace("</html>", "");
  return html;
}

export default {
  formatNumber,
  formatTime,
  get,
  post,
  wash
}
