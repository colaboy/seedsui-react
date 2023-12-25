// 矫正最大值和最小值
function minMaxFormatter(val, { min, max }) {
  if (val && !isNaN(val) && val !== (null || '')) {
    if (typeof max === 'number') {
      // eslint-disable-next-line
      if (Number(val) > max) val = max
    }
    if (typeof min === 'number') {
      // eslint-disable-next-line
      if (Number(val) < min) val = min
    }
  }
  return val
}

export default minMaxFormatter
