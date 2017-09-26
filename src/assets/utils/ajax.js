// Ajax
var Ajax = {
  xhr: function (config) {
    var xhr = new window.XMLHttpRequest()
    var url = config.url
    var data = config.data || {}
    var success = config.success
    var error = config.error
    var params = Object.params(data)
    var type = config.type || 'GET'
    var contentType = config.contentType
    var token = config.token
    var extra = config.extra

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var res = JSON.parse(xhr.responseText)
          success(res, extra)
        } else {
          error && error()
        }
      }
    }
    // 鉴权
    if (token) xhr.setRequestHeader('Authorization', token)
    // post | get
    if (type === 'POST') {
      xhr.open(type, url, true)
      xhr.setRequestHeader('Content-type', contentType || 'application/json')
      if (contentType === 'application/x-www-form-urlencoded; charset=UTF-8') {
        xhr.send(params)
      } else {
        xhr.send(JSON.stringify(data))
      }
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
    // config = req, type, contentType, token
    // 显示loading
    // ob.$emit('ajaxLoading', true)
    return new Promise(function (resolve, reject) {
      Ajax.xhr({
        url: url,
        data: config.req || {},
        type: config.type || null,
        contentType: config.contentType || null,
        token: config.token || null,
        success: function (data) {
          if (data.code === '1') {
            resolve(data)
          } else {
            reject(data)
          }
          // 关闭loading
          // ob.$emit('ajaxLoading', false)
        },
        error: function (err) {
          reject(err)
          // 关闭loading
          // ob.$emit('ajaxLoading', false)
        }
      })
    })
  }
}

//export default Ajax
