// 判断滚动条是否在底部
function isBottom(container) {
  let clientHeight = container.clientHeight // || window.innerHeight
  let scrollHeight = container.scrollHeight
  let scrollTop =
    container === document.body ? document.documentElement.scrollTop : container.scrollTop
  // console.log(clientHeight + ':' + scrollHeight + ':' + scrollTop)
  if (scrollTop + clientHeight >= scrollHeight - 2) {
    return true
  }
  return false
}
export default isBottom
