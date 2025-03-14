import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import getStrength from './getStrength'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

const PasswordStrength = ({ value = '', ...props }, ref) => {
  let strength = getStrength(value)

  const rootRef = useRef(null)
  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => {
        return rootRef.current
      },
      getStrength: (newValue) => {
        return getStrength(newValue || value)
      }
    }
  })

  return (
    <ul
      {...props}
      className={`input-password-strength level${strength}${
        props.className ? ' ' + props.className : ''
      }`}
      ref={rootRef}
    >
      <li>
        <div className="input-password-strength-progress"></div>
        <span className="input-password-strength-text">
          {LocaleUtil.locale('弱', 'SeedsUI_password_weak')}
        </span>
      </li>
      <li>
        <div className="input-password-strength-progress"></div>
        <span className="input-password-strength-text">
          {LocaleUtil.locale('中', 'SeedsUI_password_medium')}
        </span>
      </li>
      <li>
        <div className="input-password-strength-progress"></div>
        <span className="input-password-strength-text">
          {LocaleUtil.locale('强', 'SeedsUI_password_strong')}
        </span>
      </li>
    </ul>
  )
}

export default forwardRef(PasswordStrength)
