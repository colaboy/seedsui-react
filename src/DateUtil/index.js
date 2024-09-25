import compare from './compare'
import formatDate from './formatDate'
import getQuarter from './getQuarter'

// 日期工具类
const dateUtil = {
  // 比较年月日,大于返回1,等于返回0,小于返回-1,错误返回undefined
  compare: compare,
  // 格式化日期
  formatDate: formatDate,
  // 获取当前季度
  getQuarter: getQuarter
}

export default dateUtil
