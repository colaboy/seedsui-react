import locale from 'library/utils/locale'

// 校验特殊控件
function validate({ value }) {
  // 自定义校验1联动: 部门必填
  if (value?.radio === '1') {
    if (Object.isEmptyObject(value.dept)) {
      return Promise.reject(
        locale(`请在自定义校验1中选择部门`, 'library.e12f0b208e73c60d59eeb705105461d4')
      )
    }
  }

  return Promise.resolve()
}

export default validate
