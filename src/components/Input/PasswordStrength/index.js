import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import getLevel from './getLevel'

// 内库使用-start
import locale from './../../../utils/locale'
// 内库使用-end

/* 测试使用-start
import { locale } from 'seedsui-react'
测试使用-end */

const PasswordStrength = ({ value = '', ...props }, ref) => {
  let level = getLevel(value)

  const rootRef = useRef(null)
  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => {
        return rootRef.current
      },
      getLevel: (newValue) => {
        return getLevel(newValue || value)
      }
    }
  })

  return (
    <ul
      {...props}
      className={`input-password-strength level${level}${
        props.className ? ' ' + props.className : ''
      }`}
      ref={rootRef}
    >
      <li>
        <div className="input-password-strength-progress"></div>
        <span className="input-password-strength-caption">
          {locale('弱', 'SeedsUI_password_weak')}
        </span>
      </li>
      <li>
        <div className="input-password-strength-progress"></div>
        <span className="input-password-strength-caption">
          {locale('中', 'SeedsUI_password_medium')}
        </span>
      </li>
      <li>
        <div className="input-password-strength-progress"></div>
        <span className="input-password-strength-caption">
          {locale('强', 'SeedsUI_password_strong')}
        </span>
      </li>
    </ul>
  )
}

export default forwardRef(PasswordStrength)
