import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 复选框
const Checkbox = forwardRef(
  (
    {
      type, // checkbox或者radio, 不对外开放
      value,
      checked,

      disabled,

      inputProps = {},

      captionProps = {},
      children,
      onChange,
      ...props
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    const inputRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        inputDOM: inputRef.current,
        getRootDOM: () => {
          return rootRef.current
        },
        getInputDOM: () => {
          return inputRef.current
        }
      }
    })

    // 点击回调
    function handleClick(e) {
      if (disabled) return
      if (onChange) onChange(e.currentTarget.getAttribute('data-checked') !== 'true')
    }

    // 类型样式前缀
    let typeClassPrefix = type === 'radio' ? 'radio' : 'checkbox'
    return (
      <div
        {...props}
        onClick={handleClick}
        disabled={disabled}
        data-checked={checked}
        data-value={value}
        className={`${typeClassPrefix}${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        <span
          ref={inputRef}
          {...inputProps}
          className={`${typeClassPrefix}-input${
            inputProps.className ? ' ' + inputProps.className : ''
          }`}
        />
        {(children || captionProps?.caption) && (
          <div
            {...captionProps}
            className={`${typeClassPrefix}-caption${
              captionProps.className ? ' ' + captionProps.className : ''
            }`}
          >
            {captionProps?.caption}
            {children}
          </div>
        )}
      </div>
    )
  }
)

export default Checkbox
