import _ from 'lodash'
// 在现有时间集合中，增加超过timeSpace的时间
function getSpaceDates(date, dates, timeSpace) {
  if (date instanceof Date === false) {
    return {
      isOverTime: false,
      dates: dates
    }
  }

  if (_.isEmpty(dates)) {
    return {
      isOverTime: true,
      dates: [date]
    }
  }

  // 检查date和dates中的每个日期差距是否超过timeSpace
  const isOverTime = dates.some((existingDate) => {
    return Math.abs(new Date(date) - new Date(existingDate)) > timeSpace
  })

  // 否则将新日期加入到dates中并返回新的dates
  if (isOverTime) {
    return {
      isOverTime: true,
      dates: [...dates, date]
    }
  }

  // 如果传入的date与dates中的任何日期相差小于timeSpace，返回原来的dates
  return {
    isOverTime: false,
    dates
  }
}

export default getSpaceDates
