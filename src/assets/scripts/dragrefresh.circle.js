//import Dragrefresh from './dragrefresh.js'
// 扩展Dragrefresh下拉刷新控件 (require dragrefresh.js)
var DragCircle = function (params) {
  // 参数改写
  var onTopComplete = params.onTopComplete
  var onNoData = params.onNoData
  params.onTopComplete = undefined
  params.onNoData = undefined
  var topContainer = params.topContainer
  var bottomContainer = params.bottomContainer
  params.topContainer = undefined
  params.bottomContainer = undefined
  // 必须参数
  var overflowContainer = typeof params.overflowContainer === 'string' ? document.querySelector(params.overflowContainer) : params.overflowContainer
  if (!overflowContainer) {
    console.log('SeedsUI Error : Dragrefresh.Pull overflowContainer不存在，请检查页面中是否有此元素')
  }

  var topParent
  var topIcon
  if (topContainer !== false) {
    topParent = overflowContainer.parentNode
    topContainer = topParent.querySelector('.SID-Dragrefresh-TopContainer')
    if (!topContainer) {
      topContainer = document.createElement('div')
      topContainer.setAttribute('class', 'SID-Dragrefresh-TopContainer df-circle')
      topContainer.innerHTML = '<div class="df-circle-icon"></div>'
      topParent.appendChild(topContainer)
    }
    topIcon = topContainer.querySelector('.df-circle-icon')
  }

  if (bottomContainer !== false) {
    bottomContainer = overflowContainer.querySelector('.SID-Dragrefresh-BottomContainer')
    if (!bottomContainer) {
      bottomContainer = document.createElement('div')
      bottomContainer.setAttribute('class', 'SID-Dragrefresh-BottomContainer df-circle-icon df-circle-icon-loading')
      bottomContainer.setAttribute('style', 'height:50px')
      overflowContainer.appendChild(bottomContainer)
    }
  }
  /* ----------------------
  params
  ---------------------- */
  var defaults = {
    overflowContainer: overflowContainer,
    topContainer: topContainer,
    bottomContainer: bottomContainer,
    baseline: params.baseline || -50,
    threshold: params.threshold || 120,
    onTopComplete: function (e) {
      if (bottomContainer) bottomContainer.classList.remove('df-circle-icon-none')
      // 回调
      if (onTopComplete) onTopComplete(e)
    },
    onNoData: function (e) {
      bottomContainer.classList.add('df-circle-icon-none')
      // 回调
      if (onNoData) onNoData(e)
    },
    // 实体操作
    onPull: function (e) {
      if (e.isRefreshed) {
        var rotateDeg = e.touches.currentPosY * 2
        topContainer.style.webkitTransform = 'translate3d(0,' + e.touches.currentPosY + 'px,0) rotate(' + rotateDeg + 'deg)'
      }
    },
    onShowTop: function (e) {
      topContainer.style.webkitTransform = 'translate3d(0,120px,0) rotate(0deg)'
    },
    onHideTop: function (e) {
      topContainer.style.webkitTransform = 'translate3d(0,0,0) rotate(0deg)'
    },
    onTopShowed: function (e) {
      topIcon.classList.add('df-circle-icon-loading')
    },
    onTopHid: function (e) {
      topIcon.classList.remove('df-circle-icon-loading')
    }
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = new Dragrefresh(params)
  return s
};

//export default DragCircle
