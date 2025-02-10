import axios from 'axios'
import formatResponse from './formatResponse'

function get(url, params, config) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params, config)
      .then((response) => {
        resolve(formatResponse(response))
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default get
