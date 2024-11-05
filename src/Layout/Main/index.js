import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import TopContainer from './TopContainer'
import isBottom from './utils/isBottom'
import topRefreshOk from './utils/topRefreshOk.js'

// 内库使用
import locale from './../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 下拉刷新容器
const Main = forwardRef(
  ({ threshold = 50, onTopRefresh, onBottomRefresh, onScroll, children, ...props }, ref) => {
    const rootRef = useRef(null)
    const isLoadingRef = useRef(null)
    const topContainerRef = useRef(null)

    // Expose api
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    /* ----------------------
    Events
    ---------------------- */
    // Touch信息
    let touchesRef = useRef({
      isTop: true,
      startY: 0,
      currentY: 0,
      diffY: 0
    })

    function handleTouchStart(e) {
      if (isLoadingRef.current) return
      e.stopPropagation()

      // 如果不在顶部，则不触发
      if (e.currentTarget.scrollTop <= 0) touchesRef.current.isTop = true
      else touchesRef.current.isTop = false

      topContainerRef.current.style.webkitTransitionDuration = '0ms'

      touchesRef.current.startY = e.clientY || e.touches[0].clientY
    }
    // 标识头部正在拖动
    function handleTouchMove(e) {
      if (isLoadingRef.current) return
      if (!touchesRef.current.isTop) return

      touchesRef.current.currentY = e.clientY || e.touches[0].clientY
      touchesRef.current.diffY = touchesRef.current.currentY - touchesRef.current.startY

      // 向下滚动
      if (touchesRef.current.diffY < 0) {
        return
      }

      // 拉动高度
      if (touchesRef.current.diffY > 100) touchesRef.current.diffY = 100
      topContainerRef.current.style.height = touchesRef.current.diffY + 'px'
      let topIcon = topContainerRef.current.querySelector('.layout-main-pull-push-icon')
      let topCaption = topContainerRef.current.querySelector('.layout-main-pull-push-caption')
      if (touchesRef.current.diffY >= threshold) {
        if (topIcon) topIcon.classList.add('layout-main-pull-push-icon-down')
        if (topCaption) topCaption.innerHTML = locale('释放立即刷新', 'SeedsUI_release_refresh')
      } else {
        if (topIcon) topIcon.classList.remove('layout-main-pull-push-icon-down')
        if (topCaption) topCaption.innerHTML = locale('下拉刷新', 'SeedsUI_pull_down_refresh')
      }
    }
    async function handleTouchEnd(e) {
      if (isLoadingRef.current) return
      if (!touchesRef.current.isTop) return

      topContainerRef.current.style.webkitTransitionDuration = '150ms'

      // 拉动幅度过小则收起
      if (touchesRef.current.diffY <= threshold) {
        topContainerRef.current.style.height = '0'
      }
      // 反之展示
      else {
        let topIcon = topContainerRef.current.querySelector('.layout-main-pull-push-icon')
        let topCaption = topContainerRef.current.querySelector('.layout-main-pull-push-caption')
        topContainerRef.current.style.height = threshold + 'px'
        if (topIcon) topIcon.classList.remove('layout-main-pull-push-icon-down')
        if (topIcon) topIcon.classList.add('layout-main-pull-push-icon-loading')
        if (topCaption) topCaption.innerHTML = locale('加载中...', 'SeedsUI_refreshing')

        // Trigger Events
        if (onTopRefresh) {
          isLoadingRef.current = true
          let isOk = await onTopRefresh()
          // 头部显示
          await topRefreshOk(topContainerRef.current, isOk)
          isLoadingRef.current = false
        }
      }
    }

    async function handleScroll(e) {
      if (onScroll) onScroll(e)
      if (!onBottomRefresh || isLoadingRef.current) return
      console.log(e.currentTarget.scrollTop)
      if (isBottom(rootRef.current)) {
        isLoadingRef.current = true
        await onBottomRefresh()
        isLoadingRef.current = false
      }
    }

    return (
      <main
        {...props}
        className={`layout-main${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
      >
        {/* 头部刷新 */}
        <TopContainer ref={topContainerRef} />
        {/* 内容 */}
        {children}
      </main>
    )
  }
)

export default Main
