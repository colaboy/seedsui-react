import isDisabledDate from './isDisabledDate'

// 内库使用
import DateUtil from './../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

// 获取当前绘制日期
function formatDrawDate(newValue, { min, max }) {
  let newDrawDate = newValue
  if (Array.isArray(newValue) && newValue.length === 2) {
    newDrawDate = newValue[0]
  }
  if (newDrawDate instanceof Date === false) {
    newDrawDate = new Date()
  }

  // 访问禁止日期
  let disabledDate = isDisabledDate(newDrawDate, { min, max })
  if (disabledDate) {
    console.log(`禁止访问${DateUtil.format(newDrawDate, 'YYYY年MM月DD日')}`)
    return disabledDate
  }

  return newDrawDate
}

export default formatDrawDate
