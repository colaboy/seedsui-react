import { LocaleUtil } from 'seedsui-react'
import scrollToErrorDOM from './scrollToErrorDOM'
const locale = LocaleUtil.locale

// 聚集错误文本框
function validateData({ form }) {
  return new Promise((resolve) => {
    if (form) {
      form
        .validateFields()
        .then(() => {
          resolve(form.getFieldsValue())
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
          let errMsg = err.errorFields?.[0].errors?.[0] || locale('此项错误')
          resolve(errMsg)
        })
      return
    }
    setTimeout(() => {
      let errMsg = scrollToErrorDOM()
      resolve(errMsg)
    }, 100)
  })
}

export default validateData
