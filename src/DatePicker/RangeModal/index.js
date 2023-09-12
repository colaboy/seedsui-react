// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef } from 'react'
import validateBeforeChange from './../RangeMain/validateBeforeChange'

// 快捷选择
import SelectorModal from './SelectorModal'

// 非快捷选择
import PickerModal from './PickerModal'

// 区间弹窗
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
      titles,
      titleFormatter,
      min,
      max,
      type = 'date', // year | quarter | month | date | time | datetime
      onError,
      ranges,
      modal = 'dropdown', // 弹出方式dropdown
      separator,
      onActiveKey,

      // 纯渲染时不渲染Main
      children,
      ...props
    },
    ref
  ) => {
    // 自定义日期天数限制
    let daysLimit = null
    // 判断有没有快捷选择
    let hasSelector = false
    if (ranges) {
      for (let key in ranges) {
        if (Array.isArray(ranges[key])) {
          hasSelector = true
        } else {
          daysLimit = ranges[key]
        }
      }
    }

    // 修改
    async function handleChange(newValue) {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 修改提示
        let goOn = await validateBeforeChange(newValue, {
          type,
          min,
          max,
          daysLimit,
          onError,
          onBeforeChange
        })
        if (goOn === false) {
          resolve(false)
          return
        }
        // 修改值
        if (typeof goOn === 'object') {
          // eslint-disable-next-line
          newValue = goOn
        }

        if (onChange) onChange(newValue)
        resolve(true)
      })
    }

    // 快捷选择
    if (hasSelector) {
      if (modal === 'dropdown') {
        return (
          <SelectorModal
            portal={portal}
            // Combo
            getComboDOM={getComboDOM}
            // Modal: display properties
            maskProps={maskProps}
            captionProps={captionProps}
            submitProps={submitProps}
            cancelProps={cancelProps}
            maskClosable={maskClosable}
            visible={visible}
            onVisibleChange={onVisibleChange}
            // Main: common
            value={value}
            onBeforeChange={onBeforeChange}
            onChange={handleChange}
            // Main: Picker Control properties
            defaultPickerValue={defaultPickerValue}
            // Combo|Main: DatePicker Control properties
            titles={titles}
            titleFormatter={titleFormatter}
            min={min}
            max={max}
            type={type}
            onError={onError}
            ranges={ranges}
            onActiveKey={onActiveKey}
            {...props}
          />
        )
      }
      return null
    }

    // 非快捷选择
    return (
      <PickerModal
        portal={portal}
        // Combo
        getComboDOM={getComboDOM}
        // Modal: display properties
        maskProps={maskProps}
        captionProps={captionProps}
        submitProps={submitProps}
        cancelProps={cancelProps}
        maskClosable={maskClosable}
        visible={visible}
        onVisibleChange={onVisibleChange}
        // Main: common
        value={value}
        onBeforeChange={onBeforeChange}
        onChange={handleChange}
        // Main: Picker Control properties
        defaultPickerValue={defaultPickerValue}
        // Combo|Main: DatePicker Control properties
        titles={titles}
        titleFormatter={titleFormatter}
        min={min}
        max={max}
        type={type}
        onError={onError}
        // ranges={ranges}
        {...props}
      />
    )
  }
)

export default RangeModal
