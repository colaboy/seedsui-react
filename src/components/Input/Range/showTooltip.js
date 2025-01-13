function showToolTip(tooltipDOM, inputDOM) {
  //当前值所占百分比
  let percent = ((inputDOM.value - inputDOM.min) / (inputDOM.max - inputDOM.min)).toFixed(2)

  //距左的位置
  let dragRange = inputDOM.clientWidth * percent
  let offsetLeft = inputDOM.offsetLeft + dragRange - 10
  //var currentOffsetLeft=offsetLeft-inputDOM.parentNode.offsetLeft

  //滑块内部的实际位置
  let currentBallLeft = 28 * percent

  //当前值的位置-滑块的位置=小球正中间的位置
  let left = offsetLeft - currentBallLeft
  tooltipDOM.innerHTML = inputDOM.value
  tooltipDOM.style.visibility = 'visible'
  tooltipDOM.style.left = left + 'px'
}

export default showToolTip
