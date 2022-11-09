import React from 'react'

// 开关控件
function Switch({
  readOnly,
  disabled,
  checked,
  checkedProps = {},
  uncheckedProps = {},
  onChange,
  ...props
}) {
  return (
    <div
      {...props}
      className={`switch${props.className ? ' ' + props.className : ''}${
        checkedProps.caption && uncheckedProps.caption ? '' : ' notext'
      }${checked ? ' active' : ''}`}
      data-on={checkedProps.caption || ''}
      data-off={uncheckedProps.caption || ''}
      data-readonly={readOnly}
      data-disabled={disabled}
      onClick={(e) => {
        if (onChange) onChange(!checked)
        e.stopPropagation()
      }}
    >
      <div className="switch-handle"></div>
    </div>
  )
}

export default Switch
