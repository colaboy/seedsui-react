import axios from 'axios'
import formatResponse from './formatResponse'
import serializeParams from './serializeParams'

function post(url, params, config) {
  const contentType = config?.headers?.['content-type'] || config?.headers?.['Content-Type']

  let newParams = params
  if (
    contentType?.indexOf('x-www-form-urlencoded') !== -1 &&
    toString.call(params) !== '[object Object]'
  ) {
    newParams = serializeParams(params)
  }

  return new Promise((resolve, reject) => {
    axios
      .post(url, newParams, config)
      .then((response) => {
        resolve(formatResponse(response))
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default post
