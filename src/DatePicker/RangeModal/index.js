// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef } from 'react'
import { validateRange } from './../utils'

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
    customModal,
    min,
    max,
    disabledStart,
    disabledEnd,
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
    customModal: customModal,
    min: min,
    max: max,
    disabledStart: disabledStart,
    disabledEnd: disabledEnd,
    type: type,
    onError: onError,
    ranges: ranges,
    // Custom option config
    // customModal: customModal
    DatePickerModalProps: {
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
      onBeforeChange={async (newValue) => {
        // 只能校验min和max, 因为不知道用户此刻选中的的项是哪项
        let goOn = await validateRange(newValue, {
          type,
          min,
          max,
          // dateRangeLimit:
          //   activeKey && typeof ranges[activeKey] === 'number' ? ranges[activeKey] : null,
          onError,
          onBeforeChange
          // ranges,
          // activeKey: activeKey
        })
        if (goOn === false) return false

        // 修改值
        if (Array.isArray(goOn) && goOn.length === 2) {
          // eslint-disable-next-line
          newValue = goOn
        }

        return newValue
      }}
      onChange={onChange}
      // Main: Picker Control properties
      defaultPickerValue={defaultPickerValue}
      // Combo|Main: DatePicker Control properties
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
