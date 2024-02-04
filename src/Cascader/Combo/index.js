import React, { forwardRef } from 'react'
// 测试使用
// import Combo from 'seedsui-react/lib/Select/Combo'
// 内库使用
import Combo from './../../Select/Combo'
import Modal from './../Modal'

// 级联选择
const CascaderCombo = forwardRef(
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

    return <Combo ref={ref} ModalComponent={Modal} {...props} />
  }
)

export default CascaderCombo
