// Format axios error
function formatError(response) {
  let result = response
  // axios错误信息多返回了两层, 减少一层, 返回{status: 401, data: {code: 'xxx', message: 'xxx'}}
  if (response.config && response.response) {
    result = response.response
  }
  return result
}

export default formatError
