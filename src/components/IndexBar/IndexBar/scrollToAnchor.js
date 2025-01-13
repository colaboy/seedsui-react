// 滚动到指定位置
function scrollToAnchor({ scrollerDOM, anchor }) {
  let currentAnchorDOM = scrollerDOM.querySelector(`[data-indexbar-anchor="${anchor}"]`)
  if (currentAnchorDOM) scrollerDOM.scrollTop = currentAnchorDOM.offsetTop
}

export default scrollToAnchor
