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

    // Combo
    getComboDOM,

    // Modal fixed properties
    visible,

    // Modal
    ModalComponent,
    ModalProps,

    // Modal: display properties
    portal,
    animation = 'slideUp',
    maskProps,
    captionProps,
    submitProps,
    cancelProps,
    maskClosable,

    // Main
    MainComponent,
    MainProps,

    // Main: common
    value,
    list, // [{id: '', name: ''}]
    multiple,
    allowClear,
    onSelect,
    onBeforeChange,
    onChange,

    // Main: render
    checkedType,
    checkedPosition,
    checkable,
    headerRender,
    footerRender,
    listRender,
    listHeaderRender,
    listFooterRender,
    listExtraHeaderRender,
    listExtraFooterRender,
    itemRender,
    itemContentRender,
    itemProps,
    checkboxProps,

    // Main: Picker Control properties
    defaultPickerValue,

    // Combo|Main: DatePicker Control properties
    titles,
    titleFormatter,
    min,
    max,
    rangeLimit,
    type = 'date', // year | quarter | month | date | time | datetime
    onError,
    ranges,
    modal = 'dropdown', // 弹出方式dropdown
    separator,

    // 纯渲染时不渲染Main
    children,
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
    onBeforeChange: onBeforeChange,
    onChange: onChange,
    // Main: Picker Control properties
    defaultPickerValue: defaultPickerValue,
    // Combo|Main: DatePicker Control properties
    titles: titles,
    min: min,
    max: max,
    rangeLimit: rangeLimit,
    type: type,
    onError: onError,
    ranges: ranges
    // Custom option config
    // customModal: customModal
  }

  for (let propName in MainPropsExternal) {
    if (props.MainProps[propName] === undefined)
      props.MainProps[propName] = MainPropsExternal[propName]
  }

  return (
    <BaseModal
      ref={ref}
      {...props}
      className={`slots${props.className ? ' ' + props.className : ''}`}
      type={type}
      valueFormatter={valueFormatter}
      multiple={false}
      visible={visible}
      MainComponent={RangeMain}
    />
  )
}

export default forwardRef(RangeModal)
