// 矫正formatter
function externalFormatter(val, { formatter }) {
  if (typeof formatter === 'function') {
    let formatterValue = formatter(val)
    if (typeof formatterValue === 'string' || typeof formatterValue === 'number') {
      // eslint-disable-next-line
      val = formatterValue
    }
  }
  return val
}

export default externalFormatter
