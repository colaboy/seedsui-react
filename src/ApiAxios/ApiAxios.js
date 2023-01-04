// require (PrototypeObject.js), 使用了isEmptyObject、params
import axios from 'axios'

// axios 默认配置
// axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// response中提取result
function getResult(response) {
  let result = response.data || response
  if (typeof result === 'string') {
    try {
      return JSON.parse(result)
    } catch (error) {
      console.log('result转换JSON失败' + error)
      return result
    }
  }
  return result
}

// 构建get请求参数, get请求需要把url和data拼接起来
function buildGetUrl(url, params) {
  if (!params || Object.isEmptyObject(params)) {
    return url
  }
  if (typeof params === 'string') {
    return url + '?' + params
  }
  if (Object.type(params) === 'json') {
    return url + '?' + Object.params(params)
  }
  return url
}

// jsonp上传
function jsonp(url) {
  return new Promise((resolve, reject) => {
    window.jsonCallBack = (result) => {
      resolve(result)
    }
    var JSONP = document.createElement('script')
    JSONP.type = 'text/javascript'
    JSONP.src = `${url}&callback=jsonCallBack`
    document.getElementsByTagName('head')[0].appendChild(JSONP)
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP)
    }, 500)
  })
}

// 表单上传
function formUpload(url, options) {
  return new Promise((resolve, reject) => {
    if (!options.file) {
      // file文件框
      console.warn('没有找到options.file, 无法上传')
      resolve({
        code: '0',
        message: '没有找到options.file, 无法上传'
      })
      return
    }
    // 上传数据
    let formData = new FormData()
    formData.append('file', options.file.files[0])
    // 发送请求
    const instance = axios.create({
      withCredentials: true
    })
    instance
      .post(url, formData, {
        'Content-type': 'multipart/form-data'
      })
      .then((response) => {
        resolve(getResult(response))
      })
      .catch((error) => {
        if (Api.fail) Api.fail(error)
        reject(error)
      })
  })
}

// 封装成Api类
const Api = {
  fail: function (error) {
    console.warn({ error })
  },
  setBaseURL: function (baseURL) {
    axios.defaults.baseURL = baseURL
  },
  request: function (url, params = {}) {
    let { method, head, data, ...options } = params
    // 设置method
    if (
      method !== 'get' &&
      method !== 'post' &&
      method !== 'jsonp' &&
      method !== 'upload' &&
      method !== 'form-upload'
    )
      method = 'get'
    // 如果是jsonp, 则其它参数都没有意义了
    if (method === 'jsonp') {
      return jsonp(url)
    }
    // 如果是上传文件
    if (method === 'upload') {
      return formUpload(buildGetUrl(url, data), options)
    }
    return axios({
      url: method === 'get' ? buildGetUrl(url, data) : url,
      method: method,
      headers: {
        ...head
      },
      data: method === 'get' ? null : data,
      ...options
    })
  },
  post: function (url, params = {}) {
    return this.request(url, Object.assign({}, params, { method: 'post' }))
  },
  get: function (url, params = {}) {
    return this.request(url, Object.assign({}, params, { method: 'get' }))
  },
  all: function (requests) {
    // requests: [{url: '', params: {}}]
    const methods = requests.map((request) => {
      return this.request(request.url, request.params)
    })
    return axios.all(methods)
  },
  jsonp: function (url, params = {}) {
    return this.request(url, Object.assign({}, params, { method: 'jsonp' }))
  }
}

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return getResult(response)
  },
  (error) => {
    if (Api.fail) Api.fail(error)
    return Promise.reject(error)
  }
)

export default Api
