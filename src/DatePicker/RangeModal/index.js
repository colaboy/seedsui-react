// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef } from 'react'
import RangeMain from './../RangeMain'
import BaseModal from './../../Select/Modal'
// 测试使用
// import BaseModal from 'seedsui-react/lib/Select/Modal'

// 区间弹窗
const RangeModal = (
  {
    // 显示文本格式化和value格式化
    valueFormatter,

    // Modal fixed properties
    visible,

    // Modal: display properties
    portal,

    // Main: common
    value,
    allowClear,
    onBeforeChange,
    onChange,

    // Main: Picker Control properties
    defaultPickerValue,

    // Combo|Main: DatePicker Control properties
    titles,
    min,
    max,
    type = 'date', // year | quarter | month | date | time | datetime
    onError,
    ranges,
    separator,
    ...props
  },
  ref
) => {
  // 扩展非标准属性
  if (!props.MainProps) {
    props.MainProps = {}
  }
  let MainPropsExternal = {
    portal: portal,
    // components props
    // SelectorProps: SelectorProps,
    // customDatePickerProps: customDatePickerProps,
    allowClear: allowClear,
    // Main: common
    value: value,
    // onBeforeChange: onBeforeChange,
    // onChange: onChange,
    // Main: Picker Control properties
    defaultPickerValue: defaultPickerValue,
    // Combo|Main: DatePicker Control properties
    titles: titles,
    min: min,
    max: max,
    type: type,
    onError: onError,
    ranges: ranges,
    // Custom option config
    // customModal: customModal
    ModalProps: {
      maskProps: props.maskProps || null
    }
  }

  for (let propName in MainPropsExternal) {
    if (props.MainProps[propName] === undefined) {
      props.MainProps[propName] = MainPropsExternal[propName]
    }
  }

  return (
    <BaseModal
      ref={ref}
      {...props}
      className={`slots${props.className ? ' ' + props.className : ''}`}
      // type={type}
      valueFormatter={valueFormatter}
      multiple={false}
      visible={visible}
      MainComponent={RangeMain}
      // Modal: display properties
      portal={portal}
      // Main: common
      value={value}
      allowClear={allowClear}
      onBeforeChange={onBeforeChange}
      onChange={onChange}
      // Main: Picker Control properties
      defaultPickerValue={defaultPickerValue}
      // Combo|Main: DatePicker Control properties
      titles={titles}
      min={min}
      max={max}
      type={type}
      separator={separator}
      onError={onError}
      ranges={ranges}
    />
  )
}

export default forwardRef(RangeModal)
