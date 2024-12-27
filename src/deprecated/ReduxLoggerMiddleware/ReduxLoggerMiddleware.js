const loggerMiddleware = (store) => (next) => (action) => {
  console.log('日志:dispatching', action)
  let result = next(action)
  console.log('日志:next state', store.getState())
  return result
}
export default loggerMiddleware
