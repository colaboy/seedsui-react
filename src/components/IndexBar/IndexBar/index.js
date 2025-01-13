import React, {
  Fragment,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState
} from 'react'
import getAnchors from './getAnchors'
import goAnchor from './goAnchor'
import preventDefault from './preventDefault'

const IndexBar = forwardRef(({ scrollerDOM, children, ...props }, ref) => {
  let [anchors, setAnchors] = useState(null)

  // Nodes
  const scrollerRef = useRef(null)
  const sidebarRef = useRef(null)
  const tooltipRef = useRef(null)

  // Touches
  let touchesRef = useRef({
    startX: 0
  })

  useImperativeHandle(ref, () => {
    return {
      rootDOM: sidebarRef.current,
      tooltipDOM: tooltipRef.current,
      getRootDOM: () => sidebarRef.current,
      getTooltipDOM: () => sidebarRef.current
    }
  })

  useEffect(() => {
    // 获取滚动容器
    scrollerRef.current = scrollerDOM || sidebarRef.current?.previousElementSibling

    // 直接在dom上touchStart
    // sidebarRef.current.addEventListener('touchstart', s.onTouchStart, false)
    // sidebarRef.current.addEventListener('touchmove', s.onTouchMove, false)
    // sidebarRef.current.addEventListener('touchend', s.onTouchEnd, false)
    // sidebarRef.current.addEventListener('touchcancel', s.onTouchEnd, false)

    // 更新锚记
    updateAnchors()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // 更新锚记
    updateAnchors()
    // eslint-disable-next-line
  }, [children])

  // 获取所有锚点
  function updateAnchors() {
    if (!scrollerRef.current) return
    anchors = getAnchors(scrollerRef.current)
    setAnchors(anchors)
  }

  function handleTouchStart(e) {
    e.stopPropagation()
    // 解决拖动时影响document弹性
    e.currentTarget.addEventListener('touchmove', preventDefault, false)

    touchesRef.current.startX = e.touches[0].clientX

    // 滚动到指定位置
    goAnchor({
      scrollerDOM: scrollerRef.current,
      sidebarDOM: sidebarRef.current,
      tooltipDOM: tooltipRef.current,
      x: touchesRef.current.startX,
      y: e.touches[0].clientY
    })

    // 激活indexbar
    sidebarRef.current.classList.add('active')
    tooltipRef.current.classList.add('active')
  }
  function handleTouchMove(e) {
    e.stopPropagation()
    goAnchor({
      scrollerDOM: scrollerRef.current,
      sidebarDOM: sidebarRef.current,
      tooltipDOM: tooltipRef.current,
      x: touchesRef.current.startX,
      y: e.touches[0].clientY
    })
  }
  function handleTouchEnd(e) {
    e.stopPropagation()
    // 解除对move时的弹性对当前div的锁定
    e.currentTarget.removeEventListener('touchmove', preventDefault, false)

    sidebarRef.current.classList.remove('active')
    tooltipRef.current.classList.remove('active')
  }

  const DOM = (
    <Fragment>
      {children}
      <div
        {...props}
        className={`indexbar${props.className ? ' ' + props.className : ''}`}
        ref={sidebarRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {(anchors || []).map((anchor, i) => {
          return (
            <span className="indexbar-button" data-indexbar-link={anchor} key={`btn${i}`}>
              <span className="indexbar-button-caption">{anchor}</span>
            </span>
          )
        })}
      </div>
      <div ref={tooltipRef} className="indexbar-tooltip"></div>
    </Fragment>
  )
  return DOM
})

export default IndexBar
