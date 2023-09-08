// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef } from 'react'
import validateDaysLimit from './validateDaysLimit'
import validateStartEnd from './validateStartEnd'

// 快捷选择
import SelectorModal from './SelectorModal'

// 非快捷选择
import PickerModal from './PickerModal'
import { validateMaxMin } from '../utils'

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

    // 修改
    async function handleChange(newValue) {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 修改提示
        let goOn = await handleBeforeChange(newValue)
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

    // 校验选择的区间是否合法
    function handleBeforeChange(newValue) {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 校验最大最小值
        if (Array.isArray(newValue) && newValue.length) {
          // 开始日期
          let minMaxValid = validateMaxMin(newValue?.[0], {
            type: type,
            min: min,
            max: max,
            onError: onError
          })
          if (minMaxValid === false) {
            resolve(false)
            return
          }
          if (newValue?.[0]) newValue[0] = minMaxValid

          // 结束日期
          minMaxValid = validateMaxMin(newValue[1], {
            type: type,
            min: min,
            max: max,
            onError: onError
          })
          if (minMaxValid === false) {
            resolve(false)
            return
          }
          if (newValue?.[1]) newValue[1] = minMaxValid
        }

        // 校验是否开始日期大于结束日期
        let startEndValid = validateStartEnd(newValue, { type: type, onError: onError })
        if (startEndValid === false) {
          resolve(false)
          return
        }
        // eslint-disable-next-line
        newValue = startEndValid

        // 校验天数限制
        if (typeof daysLimit === 'number') {
          let daysLimitValid = validateDaysLimit(newValue, {
            daysLimit: daysLimit,
            onError: onError
          })
          if (daysLimitValid === false) {
            resolve(false)
            return
          }
        }

        // 外部传入的校验
        if (typeof onBeforeChange === 'function') {
          let goOn = await onBeforeChange(newValue)
          if (goOn === false) {
            resolve(false)
            return
          }
        }

        resolve(newValue)
      })
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
            titles={titles}
            portal={portal}
            type={type}
            ranges={ranges}
            value={value}
            defaultPickerValue={defaultPickerValue}
            onChange={handleChange}
            {...props}
          />
        )
      }
      return null
    }

    // 非快捷选择
    return (
      <PickerModal
        // Modal properties
        // getComboDOM={getComboDOM}
        maskClosable={maskClosable}
        visible={visible}
        onVisibleChange={onVisibleChange}
        // RangeMain properties
        titles={titles}
        portal={portal}
        type={type}
        ranges={ranges}
        value={value}
        defaultPickerValue={defaultPickerValue}
        onChange={handleChange}
        {...props}
      />
    )
  }
)

export default RangeModal
