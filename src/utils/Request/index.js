import axios from 'axios'
import serializeParams from './serializeParams'
import get from './get'
import post from './post'

const env = process.env.NODE_ENV
if (env === 'development') {
  axios.defaults.baseURL = `/api`
}

const Request = {
  serializeParams: serializeParams,
  get: get,
  post: post
}
export default Request
