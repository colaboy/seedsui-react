// 获取标题字符串
function getTitle(activeDate, titleFormatter, info) {
  if (!activeDate) {
    return ''
  }
  let title = ''

  if (typeof titleFormatter === 'string') {
    title = activeDate.format(titleFormatter)
  } else if (typeof titleFormatter === 'function') {
    title = titleFormatter(activeDate, info)
  } else {
    title = activeDate.format('YYYY-MM')
  }

  return title
}
export default getTitle
