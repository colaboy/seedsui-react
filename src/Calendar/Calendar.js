// require (PrototypeDate.js), 使用了format
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance.js'

const Calendar = forwardRef(
  (
    {
      type = 'month', // week | month
      value,
      titleFormat, // 标题日期格式化 YYYY年MM月DD日 周E 第W周
      min, // 禁用之前日期
      max, // 禁用之后日期
      verticalDrag, // 是否允许垂直拖动
      prevHTML = '&lt', // 左箭头
      nextHTML = '&gt', // 右箭头
      renderCellDOM,
      cellHeight,
      onChange,
      onClick,
      onError
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current,
        showWeek: () => {
          instance.current.showWeek()
        },
        showMonth: () => {
          instance.current.showMonth()
        },
        jumpTo: (jumpDate) => {
          if (!instance.current) return
          if (jumpDate instanceof Date) {
            instance.current.setDate(jumpDate)
          } else if (jumpDate === 'today') {
            instance.current.setDate(new Date())
          } else if (jumpDate === 'default') {
            instance.current.setDefaultDate()
          }
        }
      }
    })
    useEffect(() => {
      if (instance.current) return
      initInstance()
    }, []) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onChange = handleChange
      instance.current.params.onClick = handleClick
      instance.current.params.onError = handleError
    }
    function initInstance() {
      instance.current = new Instance(rootRef.current, {
        viewType: type,
        cellHeight: cellHeight,
        titleFormat: titleFormat,
        disableBeforeDate: min,
        disableAfterDate: max,
        verticalDrag: verticalDrag,
        defaultDate: value,
        prevHTML: prevHTML,
        nextHTML: nextHTML,
        renderCellDOM: renderCellDOM,
        onClick: handleClick,
        onChange: handleChange,
        onError: handleError // func(err)
      })
    }

    function handleClick(s) {
      if (onClick) onClick(s)
    }

    function handleChange(s) {
      // 如果选中日期和之前的相同则不需要触发onChange
      if (value && s.activeDate && JSON.stringify(value) === JSON.stringify(s.activeDate)) {
        return
      }
      if (onChange) onChange(s.activeDate)
    }
    function handleError(err) {
      if (onError) onError(err)
    }
    return <div ref={rootRef} className="calendar"></div>
  }
)

export default Calendar
