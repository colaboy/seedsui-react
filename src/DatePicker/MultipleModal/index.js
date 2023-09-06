import React, { forwardRef } from 'react'
import { validateDate } from './../utils'
import BaseModal from './../../Select/Modal'
import MultipleMain from './../MultipleMain'

const Modal = forwardRef(({ onBeforeChange, ...props }, ref) => {
  return (
    <BaseModal
      ref={ref}
      {...props}
      onBeforeChange={async (tabs) => {
        // eslint-disable-next-line
        return new Promise(async (resolve) => {
          // 校验值是否合法
          for (let tab of tabs) {
            let newValue = validateDate(tab.value, {
              type: tab?.type || props?.type,
              min: props?.min,
              max: props?.max,
              onError: props?.onError
            })
            if (newValue === false) {
              resolve(false)
              return
            }
            tab.value = newValue
          }

          // 外部传入的校验
          if (typeof onBeforeChange === 'function') {
            let goOn = await onBeforeChange(tabs)
            if (goOn === false) {
              resolve(false)
              return
            }
          }

          // 通过校验，并赋予新值
          resolve(tabs)
        })
      }}
      MainComponent={MultipleMain}
    />
  )
})

export default Modal
