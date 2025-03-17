// 文件剩余可上传数量
function getRemainCount(count, currentCount) {
  if (!count || isNaN(count)) {
    // eslint-disable-next-line
    count = 5
  }
  if (!currentCount || isNaN(currentCount)) {
    // eslint-disable-next-line
    currentCount = 0
  }
  let maxCount = count - currentCount
  // count超出最大限制9个:由${maxCount}纠正为9
  if (maxCount > 9) {
    maxCount = 9
  }
  // 参数count小于最小限制1个:由${maxCount}纠正为1
  else if (maxCount < 1) {
    maxCount = 1
  }
  return maxCount
}

export default getRemainCount
