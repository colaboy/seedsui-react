import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import locale from './../../utils/locale'

const TOGGLE_EXPAND_TEXT = locale('展开', 'SeedsUI_expand')
const TOGGLE_COLLAPSE_TEXT = locale('收缩', 'SeedsUI_collapse')

const Ellipsis = forwardRef(
  (
    {
      rows = 3,
      toggleProps = {
        visible: true,
        expandText: TOGGLE_EXPAND_TEXT,
        collapseText: TOGGLE_COLLAPSE_TEXT
      },
      html,
      children,
      ...props
    },
    ref
  ) => {
    // 展开和收缩样式
    const { visible, expandText, collapseText, style, className, ...otherToggleProps } = toggleProps

    // 只读时超过三行显示展开和收缩
    const contentRef = useRef(null)
    const toggleRef = useRef(null)

    useImperativeHandle(ref, () => {
      return {
        getContentDOM: () => {
          return contentRef.current
        },
        getToggleDOM: () => {
          return toggleRef.current
        }
      }
    })

    useEffect(() => {
      if (toggleRef.current && contentRef.current) {
        // 滚动高度和容器高度不一致说明有更多
        if (Math.abs(contentRef.current.scrollHeight - contentRef.current.clientHeight) > 2) {
          toggleRef.current.innerHTML = expandText || TOGGLE_EXPAND_TEXT
          toggleRef.current.style.display = 'inline-block'
        }
      }
    }, [contentRef]) // eslint-disable-line

    function handleToggle(e) {
      let visible = contentRef.current.classList.contains(`nowrap${rows}`)
      if (visible) {
        contentRef.current.classList.remove(`nowrap${rows}`)
        if (toggleRef.current) toggleRef.current.innerHTML = collapseText || TOGGLE_COLLAPSE_TEXT
      } else {
        contentRef.current.classList.add(`nowrap${rows}`)
        if (toggleRef.current) toggleRef.current.innerHTML = expandText || TOGGLE_EXPAND_TEXT
      }
      e.stopPropagation()
    }

    return (
      <>
        <div
          ref={contentRef}
          className={`nowrap${rows}`}
          {...props}
          dangerouslySetInnerHTML={html && typeof html === 'string' ? { __html: html } : null}
        >
          {children}
        </div>
        {visible && (
          <span
            ref={toggleRef}
            {...otherToggleProps}
            style={Object.assign({}, style, { display: 'none' })}
            className={`color-link${className ? ' ' + className : ''}`}
            onClick={handleToggle}
          ></span>
        )}
      </>
    )
  }
)

export default Ellipsis
