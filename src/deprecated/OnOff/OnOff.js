import React from 'react'

// 开关控件
/**
 * @deprecated since version 5.2.8
 * 请使用Switch
 */
function OnOff({
  readOnly,
  disabled,
  checked,
  onAttribute = {},
  offAttribute = {},
  onClick,
  ...others
}) {
  return (
    <div
      {...others}
      className={`onoff${others.className ? ' ' + others.className : ''}${
        onAttribute.caption && offAttribute.caption ? '' : ' notext'
      }${checked ? ' active' : ''}`}
      data-on={onAttribute.caption || ''}
      data-off={offAttribute.caption || ''}
      data-readonly={readOnly}
      data-disabled={disabled}
      onClick={(e) => {
        if (onClick) onClick(e, checked)
      }}
    >
      <div className="onoff-handle"></div>
    </div>
  )
}

export default OnOff
