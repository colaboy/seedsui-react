//import Dragrefresh from './dragrefresh.js'
// 扩展Dragrefresh下拉刷新控件 (require dragrefresh.js)
var DragCircle = function (params) {
  // 参数改写
  var onTopComplete = params.onTopComplete
  var onNoData = params.onNoData
  params.onTopComplete = undefined
  params.onNoData = undefined

  // 必须参数
  var overflowContainer = typeof params.overflowContainer === 'string' ? document.querySelector(params.overflowContainer) : params.overflowContainer
  if (!overflowContainer) {
    console.log('SeedsUI Error : DragCircle overflowContainer不存在，请检查页面中是否有此元素')
  }

  var topParent
  var topContainer
  var topIcon
  if (params.onTopRefresh) {
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
  var bottomContainer
  if (params.onBottomRefresh) {
    bottomContainer = overflowContainer.querySelector('.SID-Dragrefresh-BottomContainer')
    if (!bottomContainer) {
      bottomContainer = document.createElement('div')
      bottomContainer.setAttribute('class', 'SID-Dragrefresh-BottomContainer df-circle-icon df-circle-icon-loading')
      bottomContainer.setAttribute('style', 'height:50px')
      overflowContainer.appendChild(bottomContainer)
    }
  }
  var errorContainer
  if (params.onBottomRefresh) {
    errorContainer = overflowContainer.querySelector('.SID-Dragrefresh-ErrorContainer')
    if (!errorContainer) {
      errorContainer = document.createElement('div')
      errorContainer.setAttribute('class', 'SID-Dragrefresh-ErrorContainer df-pull hide')
      errorContainer.setAttribute('style', 'height: 50px;')
      errorContainer.innerHTML = '<div class="df-pull-box">' +
      '<div class="df-pull-caption">加载失败，请稍后重试</div>' +
      '</div>'
      overflowContainer.appendChild(errorContainer)
    }
  }
  /* ----------------------
  params
  ---------------------- */
  var defaults = {
    overflowContainer: overflowContainer,
    topContainer: topContainer,
    bottomContainer: bottomContainer,
    errorContainer: errorContainer,
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
    onClickError: function (e) {
      console.log('点击错误容器')
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
