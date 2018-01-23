//import Dragrefresh from './dragrefresh.js'
var DragCircle = function (params) {
  // 参数改写
  var onTopComplete = params.onTopComplete
  var onBottomRefresh = params.onBottomRefresh
  var onNoData = params.onNoData
  var onError = params.onError
  params.onTopComplete = undefined
  params.onBottomRefresh = undefined
  params.onNoData = undefined
  params.onError = undefined

  // 必须参数
  var container = typeof params.container === 'string' ? document.querySelector(params.container) : params.container
  if (!container) {
    console.log('SeedsUI Error : DragCircle container不存在，请检查页面中是否有此元素')
  }
  var topContainer
  var topIcon
  var topCaption
  if (params.onTopRefresh) {
    topParent = container.parentNode
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
  var nodataContainer
  var errorContainer
  if (onBottomRefresh) {
    bottomContainer = container.querySelector('.SID-Dragrefresh-BottomContainer')
    if (!bottomContainer) {
      bottomContainer = document.createElement('div')
      bottomContainer.setAttribute('class', 'SID-Dragrefresh-BottomContainer df-circle-icon df-circle-icon-loading')
      bottomContainer.setAttribute('style', 'height:50px')
      container.appendChild(bottomContainer)
    }

    nodataContainer = container.querySelector('.SID-Dragrefresh-NoDataContainer')
    if (!errorContainer) {
      nodataContainer = document.createElement('div')
      nodataContainer.setAttribute('class', 'SID-Dragrefresh-NoDataContainer df-pull hide')
      nodataContainer.setAttribute('style', 'height: 50px;')
      nodataContainer.innerHTML = '<div class="df-pull-box">' +
      '<div class="df-pull-caption">没有更多数据了</div>' +
      '</div>'
      container.appendChild(nodataContainer)
    }

    errorContainer = container.querySelector('.SID-Dragrefresh-ErrorContainer')
    if (!errorContainer) {
      errorContainer = document.createElement('div')
      errorContainer.setAttribute('class', 'SID-Dragrefresh-ErrorContainer df-pull hide')
      errorContainer.setAttribute('style', 'height: 50px;')
      errorContainer.innerHTML = '<div class="df-pull-box">' +
      '<div class="df-pull-caption">加载失败，请稍后重试</div>' +
      '</div>'
      container.appendChild(errorContainer)
    }
  }

  /* ----------------------
  params
  ---------------------- */
  var defaults = {
    container: container,
    topContainer: topContainer,
    threshold: 50,
    onTopComplete: function (e) {
      if (bottomContainer && !e.isNoData) {
        bottomContainer.classList.remove('hide')
        nodataContainer.classList.add('hide')
        errorContainer.classList.add('hide')
      }
      // 回调
      if (onTopComplete) onTopComplete(e)
    },
    onBottomRefresh: function (e) {
      if (bottomContainer) {
        bottomContainer.classList.remove('hide')
        nodataContainer.classList.add('hide')
        errorContainer.classList.add('hide')
      }
      // 回调
      if (onBottomRefresh) onBottomRefresh(e)
    },
    onNoData: function (e) {
      // 显示无数据容器,隐藏底部和错误容器
      if (bottomContainer) {
        bottomContainer.classList.add('hide')
        nodataContainer.classList.remove('hide')
        errorContainer.classList.add('hide')
      }
      // 回调
      if (onNoData) onNoData(e)
    },
    onError: function (e) {
      // 显示错误容器,隐藏底部和无数据容器
      if (bottomContainer) {
        bottomContainer.classList.add('hide')
        nodataContainer.classList.add('hide')
        errorContainer.classList.remove('hide')
      }
      // 回调
      if (onError) onError(e)
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

;//export default DragCircle
