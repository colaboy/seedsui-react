import React, { forwardRef } from 'react'
import { validateMaxMin } from './../utils'
import valueFormatter from './valueFormatter'

import BaseModal from './../../Select/Modal'
// 测试使用
// import BaseModal from 'seedsui-react/lib/Select/Modal'
import Main from './../Main'

const Modal = forwardRef(({ type = 'date', allowClear, onBeforeChange, ...props }, ref) => {
  return (
    <BaseModal
      ref={ref}
      {...props}
      className={`slots${props.className ? ' ' + props.className : ''}`}
      type={type}
      valueFormatter={valueFormatter}
      multiple={false}
      onBeforeChange={async (value) => {
        // eslint-disable-next-line
        return new Promise(async (resolve) => {
          // 校验值是否合法
          let newValue = validateMaxMin(value, {
            type: type,
            min: props?.min,
            max: props?.max,
            onError: props?.onError
          })
          if (newValue === false) {
            resolve(false)
            return
          }

          // 外部传入的校验
          if (typeof onBeforeChange === 'function') {
            let goOn = await onBeforeChange(newValue)
            if (goOn === false) {
              resolve(false)
              return
            }
          }

          // 通过校验，并赋予新值
          resolve(newValue)
        })
      }}
      MainComponent={Main}
    />
  )
})

export default Modal
