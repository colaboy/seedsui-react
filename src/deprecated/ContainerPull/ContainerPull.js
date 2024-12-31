import React, { forwardRef, useRef, useImperativeHandle, useEffect, useContext } from 'react'
import Container from './../Container'
import Instance from './instance.js'
import Context from './../Context/instance.js'

/**
 * @deprecated since version 5.4.9
 * 请使用Body
 */
const ContainerPull = forwardRef(
  (
    {
      onTopRefresh,
      onBottomRefresh,
      refreshing, // true|1:正在刷新; false|0:刷新完成; 其它:不执行刷新
      children,
      ...others
    },
    ref
  ) => {
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }

    const rootRef = useRef(null)
    const topContainerRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })
    const instance = useRef(null)

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      // 头部刷新,加载第一页
      if (onTopRefresh) {
        instance.current.params.onTopRefresh = onTopRefresh
      }
      // 底部刷新,加载下一页
      if (onBottomRefresh) {
        instance.current.params.onBottomRefresh = bottomRefresh
      }
    }

    // 初始化
    if (refreshing === 0) refreshing = false
    else if (refreshing === 1) refreshing = true
    useEffect(() => {
      instance.current = new Instance({
        // threshold: 100,
        // end: 200, // 头部下拉的结束位置
        // endRefresh: null, // 滑动到指位置后自动刷新
        // moveTimeout: 0, // 滑动超时, 解决ios手指滑动到原生tabbar上, 不触发onTouchEnd
        container: rootRef.current,
        onScroll: others.onScroll ? others.onScroll : null,
        onTopRefresh: onTopRefresh, // 头部刷新,加载第一页
        onBottomRefresh: onBottomRefresh ? bottomRefresh : null, // 底部刷新,加载下一页
        // 构建实体
        topContainer: onTopRefresh ? topContainerRef.current : null,
        // 实体交互
        duration: 150,
        onPull: (e) => {
          var topContainer = e.topContainer
          topContainer.style.height = e.touches.currentPosY + 'px'
          var topIcon = topContainer.querySelector('.containerpull-pull-icon')
          var topCaption = topContainer.querySelector('.containerpull-pull-caption')
          if (!e.isLoading) {
            if (e.touches.currentPosY >= e.params.threshold) {
              if (topIcon) topIcon.classList.add('containerpull-pull-icon-down')
              if (topCaption)
                topCaption.innerHTML = locale('释放立即刷新', 'SeedsUI_release_refresh')
            } else {
              if (topIcon) topIcon.classList.remove('containerpull-pull-icon-down')
              if (topCaption)
                topCaption.innerHTML = locale('下拉可以刷新', 'SeedsUI_pull_down_refresh')
            }
          }
        },
        onShowTop: (e) => {
          var topContainer = e.topContainer
          var topIcon = topContainer.querySelector('.containerpull-pull-icon')
          var topCaption = topContainer.querySelector('.containerpull-pull-caption')
          topContainer.style.height = e.params.threshold + 'px'
          if (topIcon) topIcon.classList.remove('containerpull-pull-icon-down')
          if (topIcon) topIcon.classList.add('containerpull-pull-icon-loading')
          if (topCaption) topCaption.innerHTML = locale('正在刷新...', 'SeedsUI_refreshing')
        },
        onHideTop: (e) => {
          var topContainer = e.topContainer
          topContainer.style.height = '0'
        },
        onTopHid: (e) => {
          var topContainer = e.topContainer
          var topIcon = topContainer.querySelector('.containerpull-pull-icon')
          if (topIcon) topIcon.classList.remove('containerpull-pull-icon-down')
          if (topIcon) topIcon.classList.remove('containerpull-pull-icon-loading')
        }
      })
    }, []) // eslint-disable-line

    // 刷新完成, 重置状态
    function refreshed() {
      instance.current.isLoading = false
      if (instance.current.touches.posY) {
        // 如果头部展开, 则隐藏头部
        instance.current.hideTop() // 隐藏头部
      }
    }

    // 底部刷新
    function bottomRefresh() {
      // 如果没有设置刷新状态refreshing, 则不刷新
      if (refreshing !== true && refreshing !== false) {
        refreshed()
        return
      }
      // 正在刷新不触发底部刷新
      if (refreshing === true) return
      // 刷新完成触发底部刷新
      if (refreshing === false) {
        onBottomRefresh()
      }
    }

    // 控制刷新
    const pullRefreshTimeout = useRef()
    useEffect(() => {
      if (!instance.current) return
      // 如果没有设置刷新状态refreshing, 则不刷新
      if (refreshing !== true && refreshing !== false) {
        refreshed()
        return
      }
      // 正在刷新
      if (refreshing === true) {
        instance.current.isLoading = true
        return
      }
      // 刷新完成
      if (refreshing === false) {
        // 刷新完成, 重置状态
        refreshed()
        // 判断是否没有滚动条, 如果没有滚动条会再次触发onBottomRefresh方法
        if (pullRefreshTimeout.current) {
          window.clearTimeout(pullRefreshTimeout.current)
        }
        // 底部刷新
        if (!onBottomRefresh) return
        // 因为页面渲染需要时间, 所以需要等渲染完成后再判断有无滚动条
        pullRefreshTimeout.current = setTimeout(() => {
          if (!instance.current.hasScroll()) {
            console.log('刷新完成,但没有滚动条,继续加载...')
            bottomRefresh()
          } else if (instance.current.isBottom()) {
            console.log('刷新完成,滚动条在底部,继续加载...')
            bottomRefresh()
          }
        }, 500)
      }
    }, [refreshing]) // eslint-disable-line

    return (
      <Container {...others} ref={rootRef}>
        <div ref={topContainerRef} className="SID-Dragrefresh-TopContainer containerpull-pull">
          <div className="containerpull-pull-box">
            <div className="containerpull-pull-icon"></div>
            <div className="containerpull-pull-caption">
              {locale('下拉可以刷新', 'SeedsUI_pull_down_refresh')}
            </div>
          </div>
        </div>
        {children}
      </Container>
    )
  }
)

export default ContainerPull
