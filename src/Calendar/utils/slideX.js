import dayjs from 'dayjs'
import isDisabledDate from './isDisabledDate'
import getDateRowIndex from './getDateRowIndex'

// 左右滑动
function slideX(
  op,
  { type, min, max, duration, weekStart, activeDate, container, bodyX, bodyY, cellHeight }
) {
  // 添加动画
  bodyX.style.transitionDuration = duration + 'ms'

  // 滑动位置
  let translateX = -container.clientWidth
  // 切换后日期
  let newActiveDate = activeDate

  // 左滑动
  if (op === 'previous') {
    // 位置
    translateX = 0

    // 日期
    if (type === 'month') {
      newActiveDate = dayjs(activeDate).subtract(1, 'month').toDate()
    } else {
      newActiveDate = dayjs(activeDate).subtract(7, 'day').toDate()
    }
  }
  // 右滑动
  else if (op === 'next') {
    // 位置
    translateX = -container.clientWidth * 2

    // 日期
    if (type === 'month') {
      newActiveDate = dayjs(activeDate).add(1, 'month').toDate()
    } else {
      newActiveDate = dayjs(activeDate).add(7, 'day').toDate()
    }
  }

  // 使用禁用当天作为选中项
  let disabledDate = isDisabledDate(newActiveDate, { min, max })

  // 禁止日期
  if (disabledDate) {
    let errMsg = '禁止访问' + disabledDate.format('YYYY年MM月DD日') + '前的日期'
    console.log(errMsg)
    newActiveDate = activeDate
    translateX = -container.clientWidth
  }

  // 横向移动面板
  bodyX.style.transform = 'translateX(' + translateX + 'px)'

  // 动画执行结束后刷新日历
  return new Promise((resolve) => {
    setTimeout(() => {
      bodyX.style.transitionDuration = '0ms'

      resolve(newActiveDate)

      // 复原位置
      setTimeout(() => {
        bodyX.style.transform = 'translateX(' + -container.clientWidth + 'px)'

        // 月视图时, 需要还原位置
        let translateY = 0
        if (type === 'month') {
          translateY = 0
        }
        // 周视图时, 需要移动竖向位置
        else {
          let activeDateRowIndex = getDateRowIndex(newActiveDate, weekStart)
          translateY = -activeDateRowIndex * cellHeight
        }
        bodyY.style.transform = 'translateY(' + translateY + 'px)'
        bodyY.setAttribute('data-translateY', translateY)
      }, 0)
    }, duration)
  })
}

export default slideX
