import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 复选框
const Checkbox = forwardRef(
  (
    {
      icon,
      iconPosition = 'left',

      checked,

      readOnly,
      disabled,

      children,
      onChange,
      ...props
    },
    ref
  ) => {
    // Expose
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => {
          return rootRef.current
        }
      }
    })

    // 点击回调
    function handleClick() {
      if (disabled || readOnly) return
      if (onChange) onChange(!checked)
    }

    // 获取选中状态的Node
    function getInputNode(checked) {
      if (typeof icon === 'function') {
        return icon({ checked })
      }
      if (icon !== undefined) {
        return icon
      }
      return <span className={`checkbox-icon default`} />
    }

    return (
      <div
        {...props}
        onClick={handleClick}
        disabled={disabled}
        readOnly={readOnly}
        className={`checkbox${props.className ? ' ' + props.className : ''}${
          checked ? ' checked' : ''
        }`}
        ref={rootRef}
      >
        {iconPosition !== 'right' && getInputNode(checked)}
        {children && <span className={`checkbox-content`}>{children}</span>}
        {iconPosition === 'right' && getInputNode(checked)}
      </div>
    )
  }
)

export default Checkbox
