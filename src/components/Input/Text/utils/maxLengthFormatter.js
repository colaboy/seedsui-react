// 矫正最大长度与小数位
function maxLengthFormatter(val, { maxLength }) {
  // eslint-disable-next-line
  if (typeof val === 'number') val = String(val)

  // 最大长度
  if (maxLength && val && val.length > maxLength) {
    // eslint-disable-next-line
    val = val.substring(0, maxLength)
  }
  return val
}

export default maxLengthFormatter
