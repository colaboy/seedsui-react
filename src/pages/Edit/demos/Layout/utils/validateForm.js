import { Toast } from 'seedsui-react'

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

// 聚集错误文本框
function validateForm({ form, errorType }) {
  return new Promise((resolve) => {
    if (form) {
      form
        .validateFields()
        .then(() => {
          resolve(null)
        })
        .catch((err) => {
          // 定位到错误的位置
          let fieldName = err?.errorFields?.[0]?.name
          if (fieldName && form?.scrollToField) {
            form.scrollToField(fieldName)
          } else {
            setTimeout(() => {
              scrollToErrorDOM()
            }, 100)
          }

          // 错误消息
          let errMsg = err.errorFields[0].errors[0]
          if (errorType === 'toast') {
            Toast.show({ content: errMsg })
          }
          resolve(errMsg)
        })
      return
    }
    setTimeout(() => {
      let errMsg = scrollToErrorDOM()
      // 弹窗
      if (errorType === 'toast') {
        Toast.show({ content: errMsg })
      }
      resolve(errMsg)
    }, 100)
  })
}

export default validateForm
