import locale from './../../locale'

// ranges分成两部分: quickRanges(快捷选择)和customRanges(自定义选择)
function getRanges(ranges) {
  let quickRanges = {}
  let customRanges = {}
  if (toString.call(ranges) === '[object Object]' && !Object.isEmptyObject(ranges)) {
    for (let rangeKey in ranges) {
      let rangeValue = ranges[rangeKey]
      if (
        Array.isArray(rangeValue) &&
        rangeValue.length === 2 &&
        Object.isDate(rangeValue[0]) &&
        Object.isDate(rangeValue[1])
      ) {
        quickRanges[rangeKey] = rangeValue
      } else {
        // 自定义选择只能有一个
        customRanges = {
          [rangeKey]: rangeValue
        }
      }
    }
  } else {
    if (typeof ranges === 'number') {
      customRanges = {
        [locale('自定义时间', 'datepicker-tooltip_custom_date')]: ranges
      }
    }
  }
  return {
    quickRanges: quickRanges,
    customRanges: customRanges
  }
}

export default getRanges
