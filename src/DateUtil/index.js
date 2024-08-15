import compareDate from './compareDate'
import formatDate from './formatDate'

// 日期工具类
const dateUtil = {
  // 比较年月日,大于返回1,等于返回0,小于返回-1,错误返回undefined
  compareDate: compareDate,
  // 格式化日期
  formatDate: formatDate
}

export default dateUtil
