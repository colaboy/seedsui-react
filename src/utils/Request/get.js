import axios from 'axios'
import formatResponse from './formatResponse'
import formatError from './formatError'

function get(url, params, config) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params, config)
      .then((response) => {
        resolve(formatResponse(response))
      })
      .catch((error) => {
        reject(formatError(error))
      })
  })
}

export default get
