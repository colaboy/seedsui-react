import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance.js'
import locale from './../../locale'
import TopContainer from './TopContainer'

// 下拉刷新容器
const Main = forwardRef(({ onTopRefresh, onBottomRefresh, children, ...props }, ref) => {
  const rootRef = useRef(null)
  const instance = useRef(null)
  const topContainerRef = useRef(null)
  const bottomContainerRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      instance: instance.current,
      getRootDOM: () => rootRef.current,
      getInstance: () => instance.current
    }
  })

  // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
  if (instance.current) {
    // 头部刷新,加载第一页
    if (onTopRefresh) {
      instance.current.params.onTopRefresh = onTopRefresh
    }
    // 底部刷新,加载下一页
    if (onBottomRefresh) {
      instance.current.params.onBottomRefresh = onBottomRefresh
    }
  }

  // 初始化
  useEffect(() => {
    if (typeof onTopRefresh === 'function' || typeof onBottomRefresh === 'function') {
      initInstance()
    }
  }, [onTopRefresh, onBottomRefresh]) // eslint-disable-line

  async function initInstance() {
    if (instance.current) return
    instance.current = new Instance({
      // threshold: 100,
      // end: 200, // 头部下拉的结束位置
      // endRefresh: null, // 滑动到指位置后自动刷新
      // moveTimeout: 0, // 滑动超时, 解决ios手指滑动到原生tabbar上, 不触发onTouchEnd
      container: rootRef.current,
      onScroll: props.onScroll ? props.onScroll : null,
      onTopRefresh: onTopRefresh, // 头部刷新,加载第一页
      onBottomRefresh: onBottomRefresh, // 底部刷新,加载下一页
      // 构建实体
      topContainer: onTopRefresh ? topContainerRef.current : null,
      bottomContainer: onBottomRefresh ? bottomContainerRef.current : null,
      // 实体交互
      duration: 150,
      onPull: (e) => {
        var topContainer = e.topContainer
        topContainer.style.height = e.touches.currentPosY + 'px'
        var topIcon = topContainer.querySelector('.layout-main-pull-push-icon')
        var topCaption = topContainer.querySelector('.layout-main-pull-push-caption')
        if (!e.isLoading) {
          if (e.touches.currentPosY >= e.params.threshold) {
            if (topIcon) topIcon.classList.add('layout-main-pull-push-icon-down')
            if (topCaption) topCaption.innerHTML = locale('释放立即刷新', 'release')
          } else {
            if (topIcon) topIcon.classList.remove('layout-main-pull-push-icon-down')
            if (topCaption) topCaption.innerHTML = locale('下拉可以刷新', 'pull_down')
          }
        }
      },
      onShowTop: (e) => {
        var topContainer = e.topContainer
        var topIcon = topContainer.querySelector('.layout-main-pull-push-icon')
        var topCaption = topContainer.querySelector('.layout-main-pull-push-caption')
        topContainer.style.height = e.params.threshold + 'px'
        if (topIcon) topIcon.classList.remove('layout-main-pull-push-icon-down')
        if (topIcon) topIcon.classList.add('layout-main-pull-push-icon-loading')
        if (topCaption) topCaption.innerHTML = locale('正在刷新...', 'refreshing')
      },
      onHideTop: (e) => {
        var topContainer = e.topContainer
        topContainer.style.height = '0'
      },
      onTopHid: (e) => {
        var topContainer = e.topContainer
        var topIcon = topContainer.querySelector('.layout-main-pull-push-icon')
        if (topIcon) topIcon.classList.remove('layout-main-pull-push-icon-down')
        if (topIcon) topIcon.classList.remove('layout-main-pull-push-icon-loading')
      }
    })
  }
  return (
    <main
      ref={rootRef}
      {...props}
      className={`layout-main${props.className ? ' ' + props.className : ''}`}
    >
      {/* 头部刷新 */}
      <TopContainer ref={topContainerRef} />
      {/* 内容 */}
      {children}
    </main>
  )
})

export default Main
