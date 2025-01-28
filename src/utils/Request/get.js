import axios from 'axios'

function get(url, params, config) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params, config)
      .then((response) => {
        resolve(response?.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default get
