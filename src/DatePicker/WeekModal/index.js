import React, { forwardRef } from 'react'

import DateUtil from './../../DateUtil'
import WeekMain from './../WeekMain'

// 内库使用
import BaseModal from './../../Select/Modal'

// 测试使用
// import BaseModal from 'seedsui-react/lib/Select/Modal'

// 周弹窗
const WeekModal = (
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
    titleFormatter,
    defaultPickerValue,

    // Combo|Main: DatePicker Control properties
    min,
    max,
    onError,
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
    allowClear: allowClear,
    // Main: common
    value: value,
    // Main: Picker Control properties
    defaultPickerValue: defaultPickerValue,
    // Combo|Main: DatePicker Control properties
    titleFormatter,
    min: min,
    max: max,
    onError: onError,
    // Custom option config
    DatePickerModalProps: {
      maskProps: props.maskProps || null
    }
  }

  for (let propName in MainPropsExternal) {
    if (props.MainProps[propName] === undefined) {
      props.MainProps[propName] = MainPropsExternal[propName]
    }
  }

  if (props?.captionProps) {
    delete props.captionProps
  }
  return (
    <BaseModal
      ref={ref}
      {...props}
      className={`slots${props.className ? ' ' + props.className : ''}`}
      valueFormatter={valueFormatter}
      multiple={false}
      visible={visible}
      MainComponent={WeekMain}
      // Modal: display properties
      portal={portal}
      // Main: common
      value={value}
      allowClear={allowClear}
      onBeforeChange={async (newValue) => {
        // 只能校验min和max, 因为不知道用户此刻选中的的项是哪项
        if (min instanceof Date && Calendar.isDisabledDate(newValue[0], { min: min })) {
          console.log('禁止访问' + DateUtil.format(newValue[0], 'YYYY年MM月DD日') + '前的日期')
          return
        }
        if (max instanceof Date && Calendar.isDisabledDate(newValue[1], { max: max })) {
          console.log('禁止访问' + DateUtil.format(newValue[1], 'YYYY年MM月DD日') + '后的日期')
          return false
        }

        return newValue
      }}
      onChange={onChange}
      // Main: Picker Control properties
      defaultPickerValue={defaultPickerValue}
      // Combo|Main: DatePicker Control properties
      min={min}
      max={max}
      onError={onError}
    />
  )
}

export default forwardRef(WeekModal)
