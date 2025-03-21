import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-start */

const Ok = ({ disabled, total, text, onClick, ...props }) => {
  // 点击确定
  function handleOkClick(e) {
    e.stopPropagation()
    if (onClick) onClick(e)
  }

  return (
    <div
      {...props}
      className={`modal-selectmodal-header-button-ok${
        props.className ? ' ' + props.className : ''
      }${disabled === true ? ' disabled' : ''}`}
      onClick={handleOkClick}
    >
      {text && typeof text === 'string' ? text : LocaleUtil.locale('确定', 'SeedsUI_ok')}
      {typeof total === 'number' && `(${total})`}
    </div>
  )
}

export default Ok
