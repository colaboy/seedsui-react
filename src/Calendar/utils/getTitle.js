// 获取标题字符串
function getTitle(activeDate, titleFormatter, info) {
  if (!activeDate) {
    return ''
  }
  let title = ''
  if (typeof titleFormatter === 'function') {
    title = titleFormatter(activeDate, info)
  } else {
    let format = typeof titleFormatter === 'string' ? titleFormatter : 'YYYY-MM'
    title = activeDate.format(format)
  }

  return title
}
export default getTitle
