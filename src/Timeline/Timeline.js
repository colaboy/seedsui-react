import React, { useEffect, useRef } from 'react'

function Timeline({
  list, // [{content: node, contentHTML: string, icon: node(默认Dot), active: bool}]
  lineAttribute = {},
  lineCross = true, // 线条是否通到底部
  badgeAttribute = {},
  dotAttribute = {},
  ...others
}) {
  const rootRef = useRef(null)
  const lineRef = useRef(null)

  // 通到底部的计算方法
  useEffect(() => {
    if (lineCross !== false || !lineRef || !lineRef.current || !rootRef.current) return
    let dotsEl = rootRef.current.querySelectorAll('.timeline-dot')
    if (!dotsEl.length) return
    // 取出此点距离根容器的间距
    let top = getOffsetTop(dotsEl[0], rootRef.current)
    let bottom = getOffsetBottom(dotsEl[dotsEl.length - 1], rootRef.current)
    lineRef.current.style.top = top + 'px'
    lineRef.current.style.bottom = bottom + 'px'
  }, [lineCross])

  function getOffsetTop(currentEl, targetEl) {
    if (!targetEl || !currentEl) return 0
    let offsetTop = 0
    function sumOffsetTop(el) {
      if (targetEl.innerHTML === el.innerHTML || !el || el.tagName === 'BODY') return
      offsetTop += el.offsetTop
      sumOffsetTop(el.parentNode)
    }
    sumOffsetTop(currentEl)
    return offsetTop
  }
  function getOffsetBottom(currentEl, targetEl) {
    if (!targetEl || !currentEl) return 0
    let offsetTop = getOffsetTop(currentEl, targetEl) + currentEl.offsetHeight
    return targetEl.scrollHeight - offsetTop
  }

  if (!list) return null
  const listDOM = list.map((item, index) => {
    return (
      <div key={index} className={'timeline-case' + (item.active ? ' active' : '')}>
        <div
          {...badgeAttribute}
          className={`timeline-badge${
            badgeAttribute.className ? ' ' + badgeAttribute.className : ''
          }`}
        >
          {item.icon || (
            <i
              {...dotAttribute}
              className={`timeline-dot${
                dotAttribute.className ? ' ' + dotAttribute.className : ''
              }`}
            ></i>
          )}
        </div>
        {item.content}
        {item.contentHTML && <div dangerouslySetInnerHTML={{ __html: item.contentHTML }}></div>}
      </div>
    )
  })
  return (
    <div
      ref={rootRef}
      {...others}
      className={`timeline${others.className ? ' ' + others.className : ''}`}
    >
      <span
        ref={lineRef}
        {...lineAttribute}
        className={`timeline-line${lineAttribute.className ? ' ' + lineAttribute.className : ''}`}
      ></span>
      {listDOM}
    </div>
  )
}

export default Timeline
