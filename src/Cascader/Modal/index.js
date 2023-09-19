import React, { forwardRef } from 'react'

// 测试使用
// import BaseModal from 'seedsui-react/lib/Select/Modal'
// 内库使用
import BaseModal from './../../Select/Modal'

import Main from './../Main'

const Modal = forwardRef(
  (
    {
      loadData,
      optionProps,
      // Modal standard properties
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.MainProps) {
      props.MainProps = {}
    }
    props.MainProps.loadData = loadData
    props.MainProps.optionProps = optionProps
    return (
      <BaseModal
        ref={ref}
        {...props}
        className={`cascader${props.className ? ' ' + props.className : ''}`}
        multiple={undefined}
        MainComponent={Main}
      />
    )
  }
)

export default Modal
