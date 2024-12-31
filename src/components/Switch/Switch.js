import React, { useImperativeHandle, forwardRef, useRef } from 'react'

// 开关控件
const Switch = forwardRef(
  (
    { readOnly, disabled, checked, checkedProps = {}, uncheckedProps = {}, onChange, ...props },
    ref
  ) => {
    const rootRef = useRef(null)

    // 节点
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    return (
      <div
        {...props}
        className={`switch${props.className ? ' ' + props.className : ''}${
          checkedProps.text && uncheckedProps.text ? '' : ' notext'
        }${checked ? ' active' : ''}`}
        data-on={checkedProps.text || ''}
        data-off={uncheckedProps.text || ''}
        data-readonly={readOnly}
        data-disabled={disabled}
        onClick={(e) => {
          if (onChange) onChange(!checked)
          e.stopPropagation()
        }}
        ref={rootRef}
      >
        <div className="switch-handle"></div>
      </div>
    )
  }
)

export default Switch
