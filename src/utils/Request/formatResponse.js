// Format axios response
function formatResponse(response) {
  let result = response
  // axios多返回了一层, 则获取接口返回的data
  if (response.config && response.data) {
    result = response.data
  }
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

export default formatResponse
