// 滚动到报错的位置
function scrollToErrorDOM() {
  // 错误消息
  let errMsg = ''

  let errorMsgDOM = document.querySelector('.adm-form-item-feedback-error')
  if (errorMsgDOM) {
    errMsg = errorMsgDOM?.innerHTML || ''

    // 滚动到错误位置
    errorMsgDOM.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  return errMsg
}

export default scrollToErrorDOM
