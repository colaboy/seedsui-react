// require PrototypeDate.js和PrototypeString.js
import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { validateRange } from './../utils'

// 快捷选择
import SelectorModal from './SelectorModal'

// 非快捷选择
import PickerModal from './PickerModal'

// 区间弹窗
const RangeModal = (
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
  const selectorModalRef = useRef(null)
  // 判断有没有快捷选择
  let hasSelector = false
  if (ranges) {
    for (let key in ranges) {
      if (Array.isArray(ranges[key])) {
        hasSelector = true
      }
    }
  }

  useImperativeHandle(ref, () => {
    return {
      ...(selectorModalRef.current || {})
    }
  })

  // 修改
  async function handleChange(newValue, options) {
    // eslint-disable-next-line
    if (newValue === undefined) newValue = null

    let goOn = await validateRange(newValue, {
      type,
      min,
      max,
      daysLimit:
        options?.activeKey && typeof ranges?.[options.activeKey] === 'number'
          ? ranges[options.activeKey]
          : null,
      onError,
      onBeforeChange,
      activeKey: options?.activeKey,
      ranges
    })
    if (goOn === false) return

    // 修改值
    if (Array.isArray(goOn) && goOn.length === 2) {
      // eslint-disable-next-line
      newValue = goOn
    }
    onChange && onChange(newValue, options)
  }

  // 快捷选择
  if (hasSelector) {
    if (modal === 'dropdown' || modal === 'picker') {
      return (
        <SelectorModal
          ref={selectorModalRef}
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
          allowClear={allowClear}
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
          modal={modal}
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
      onBeforeChange={async (newValue) => {
        let goOn = await validateRange(newValue, {
          type,
          min,
          max,
          daysLimit: null,
          onError,
          onBeforeChange,
          activeKey: null,
          ranges: null
        })
        return goOn
      }}
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

export default forwardRef(RangeModal)
