// require PrototypeString.js
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import locale from './../../locale'

const PasswordStrong = forwardRef(({ value = '', strong, ...props }, ref) => {
  // 校验级别
  var lvl = 0
  if (typeof strong === 'number') {
    lvl = strong
  } else {
    lvl = value.safeLvl()
  }

  // 节点
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => {
        return rootRef.current
      }
    }
  })

  return (
    <ul
      {...props}
      className={`input-password-strong lvl${lvl}${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      <li>
        <div className="input-password-strong-progress"></div>
        <span className="input-password-strong-caption">{locale('弱', 'low')}</span>
      </li>
      <li>
        <div className="input-password-strong-progress"></div>
        <span className="input-password-strong-caption">{locale('中', 'medium')}</span>
      </li>
      <li>
        <div className="input-password-strong-progress"></div>
        <span className="input-password-strong-caption">{locale('强', 'strong')}</span>
      </li>
    </ul>
  )
})

export default PasswordStrong
