import dayjs from 'dayjs'
import isDisabledDate from './isDisabledDate'
import Months from './Months'

// 左右滑动
function slideX(
  op,
  { type, min, max, duration, weekStart, drawDate, container, bodyX, bodyY, cellHeight, onError }
) {
  // 添加动画
  bodyX.style.transitionDuration = duration + 'ms'

  // 滑动位置
  let translateX = -container.clientWidth
  // 切换后日期
  let newDrawDate = drawDate

  // 左滑动
  if (op === 'previous') {
    // 位置
    translateX = 0

    // 日期
    if (type === 'month') {
      newDrawDate = dayjs(drawDate).subtract(1, 'month').toDate()
    } else {
      newDrawDate = dayjs(drawDate).subtract(7, 'day').toDate()
    }
  }
  // 右滑动
  else if (op === 'next') {
    // 位置
    translateX = -container.clientWidth * 2

    // 日期
    if (type === 'month') {
      newDrawDate = dayjs(drawDate).add(1, 'month').toDate()
    } else {
      newDrawDate = dayjs(drawDate).add(7, 'day').toDate()
    }
  }

  // 使用禁用当天作为选中项
  let error = isDisabledDate(newDrawDate, { min, max })
  if (error) {
    if (typeof onError === 'function') {
      let isOk = onError(error)
      if (isOk === true) error = null
    }
    if (error) {
      console.log(error?.errMsg)
      newDrawDate = drawDate
      translateX = -container.clientWidth
    }
  }

  // 横向移动面板
  bodyX.style.transform = 'translateX(' + translateX + 'px)'

  // 动画执行结束后刷新日历
  return new Promise((resolve) => {
    setTimeout(() => {
      bodyX.style.transitionDuration = '0ms'

      resolve(newDrawDate)

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
          let drawDateRowIndex = Months.getDateRowIndex(newDrawDate, weekStart)
          translateY = -drawDateRowIndex * cellHeight
        }
        bodyY.style.transform = 'translateY(' + translateY + 'px)'
        bodyY.setAttribute('data-translateY', translateY)
      }, 0)
    }, duration)
  })
}

export default slideX
