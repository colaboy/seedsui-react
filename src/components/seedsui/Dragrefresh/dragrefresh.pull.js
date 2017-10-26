//import Dragrefresh from './dragrefresh.js'
// 扩展Dragrefresh下拉刷新控件 (require dragrefresh.js)
var DragPull = function (params) {
  // 参数改写
  var onTopComplete = params.onTopComplete
  var onNoData = params.onNoData
  params.onTopComplete = undefined
  params.onNoData = undefined

  // 必须参数
  var overflowContainer = typeof params.overflowContainer === 'string' ? document.querySelector(params.overflowContainer) : params.overflowContainer
  if (!overflowContainer) {
    console.log('SeedsUI Error : DragPull overflowContainer不存在，请检查页面中是否有此元素')
  }
  var topContainer
  var topIcon
  var topCaption
  if (params.onTopRefresh) {
    topContainer = overflowContainer.querySelector('.SID-Dragrefresh-TopContainer')
    if (!topContainer) {
      topContainer = document.createElement('div')
      topContainer.setAttribute('class', 'SID-Dragrefresh-TopContainer df-pull')
      topContainer.innerHTML = '<div class="df-pull-box">' +
      '<div class="df-pull-icon"></div>' +
      '<div class="df-pull-caption">下拉可以刷新</div>' +
      '</div>'
      overflowContainer.insertBefore(topContainer, overflowContainer.childNodes[0])
    }
    topIcon = topContainer.querySelector('.df-pull-icon')
    topCaption = topContainer.querySelector('.df-pull-caption')
  }
  var bottomContainer
  var bottomIcon
  var bottomCaption
  if (params.onBottomRefresh) {
    bottomContainer = overflowContainer.querySelector('.SID-Dragrefresh-BottomContainer')
    if (!bottomContainer) {
      bottomContainer = document.createElement('div')
      bottomContainer.setAttribute('class', 'SID-Dragrefresh-BottomContainer df-pull')
      bottomContainer.setAttribute('style', 'height: 50px')
      bottomContainer.innerHTML = '<div class="df-pull-box">' +
      '<div class="df-pull-icon df-pull-icon-loading"></div>' +
      '<div class="df-pull-caption">正在加载...</div>' +
      '</div>'
      overflowContainer.appendChild(bottomContainer)
    }
    bottomIcon = bottomContainer.querySelector('.df-pull-icon')
    bottomCaption = bottomContainer.querySelector('.df-pull-caption')
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
    threshold: 50,
    onTopComplete: function (e) {
      if (bottomContainer && !e.isNoData) {
        bottomIcon.classList.remove('df-pull-icon-none')
        bottomCaption.innerHTML = '正在加载...'
      }
      // 回调
      if (onTopComplete) onTopComplete(e)
    },
    onNoData: function (e) {
      bottomIcon.classList.add('df-pull-icon-none')
      bottomCaption.innerHTML = '没有更多数据了'
      // 回调
      if (onNoData) onNoData(e)
    },
    onClickError: function (e) {
      console.log('点击错误容器')
    },
    // 实体操作
    onPull: function (e) {
      topContainer.style.height = e.touches.currentPosY + 'px'
      if (e.isRefreshed) {
        if (e.touches.currentPosY >= e.params.threshold) {
          topIcon.classList.add('df-pull-icon-down')
          topCaption.innerHTML = '释放立即刷新'
        } else {
          topIcon.classList.remove('df-pull-icon-down')
          topCaption.innerHTML = '下拉可以刷新'
        }
      }
    },
    onShowTop: function (e) {
      topContainer.style.height = e.params.threshold + 'px'
      topIcon.classList.remove('df-pull-icon-down')
      topIcon.classList.add('df-pull-icon-loading')
      topCaption.innerHTML = '正在刷新...'
    },
    onHideTop: function (e) {
      topContainer.style.height = '0'
    },
    onTopHid: function (e) {
      topIcon.classList.remove('df-pull-icon-down')
      topIcon.classList.remove('df-pull-icon-loading')
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
}

;//export default DragPull
