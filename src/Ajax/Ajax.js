// Ajax
var Ajax = {
  xhr: function (config) {
    var xhr = new window.XMLHttpRequest()
    var url = config.url
    var success = config.success
    var fail = config.fail
    var params = config.data || {}
    var type = config.type || 'GET'
    var contentType = config.contentType // 'application/x-www-form-urlencoded; charset=UTF-8' || 'application/json'
    var token = config.token
    var extra = config.extra

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var res = JSON.parse(xhr.responseText)
          success(res, extra)
        } else {
          fail && fail()
        }
      }
    }
    // 鉴权
    if (token) xhr.setRequestHeader('Authorization', token)
    // 发送请求
    if (type === 'POST' || type === 'post') {
      xhr.open(type, url, true)
      xhr.setRequestHeader('Content-type', contentType || 'application/json')
      xhr.send(params)
    } else {
      if (url.indexOf('?') === -1) {
        url += '?' + params
      } else {
        url += '&' + params
      }
      xhr.open(type, url, true)
      xhr.send(null)
    }
  },
  fetchData: function (url, config) {
    return new Promise(function (resolve) {
      Ajax.xhr({
        url: url,
        data: config.params || {},
        type: config.type || null,
        contentType: config.contentType || null,
        token: config.token || null,
        success: function (result) {
          resolve(result)
        },
        fail: function (err) {
          resolve({ errMsg: `发送请求失败`, data: err })
        },
      })
    })
  },
}

export default Ajax

// 示例:
// Ajax.xhr({
//   url: `/app/location/locationareafence/locationareafence_savefence.action`,
//   data: Object.params(params),
//   type: 'post',
//   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//   success: function (result) {
//     console.log(result)
//   },
//   fail: function (err) {
//     console.log(err)
//   }
// })
