// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef } from 'react'

// 快捷选择
import SelectorModal from './SelectorModal'

// 非快捷选择
import PickerModal from './PickerModal'

const RangeModal = forwardRef(
  (
    {
      // 显示文本格式化和value格式化
      valueFormatter,

      // Combo
      getComboDOM,

      // Modal fixed properties
      visible,
      onVisibleChange,

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
      titleFormatter,
      min,
      max,
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
    let daysLimit = null
    // 判断有没有快捷选择
    let hasSelector = false
    if (ranges) {
      for (let key in ranges) {
        if (Array.isArray(ranges[key])) {
          hasSelector = true
        } else {
          // 获取自定义字段的天数限制
          daysLimit = ranges[key]
        }
      }
    }

    // 快捷选择
    if (hasSelector) {
      if (modal === 'dropdown') {
        return (
          <SelectorModal
            // Modal properties
            getComboDOM={getComboDOM}
            maskClosable={maskClosable}
            visible={visible}
            onVisibleChange={onVisibleChange}
            // RangeMain properties
            portal={portal}
            type={type}
            ranges={ranges}
            value={value}
            defaultPickerValue={defaultPickerValue}
            onChange={onChange}
            {...props}
          />
        )
      }
      return null
    }

    // 非快捷选择
    return (
      <PickerModal
        value={value}
        defaultPickerValue={defaultPickerValue}
        daysLimit={daysLimit}
        type={type}
        onError={onError}
        onBeforeChange={onBeforeChange}
        onChange={onChange}
        visible={visible}
        onVisibleChange={onVisibleChange}
      />
    )
  }
)

export default RangeModal
