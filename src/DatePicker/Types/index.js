import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react'
import Tabs from './../../Tabs'
import locale from './../../locale'
// 测试使用
// import Tabs from 'seedsui-react/lib/Tabs'
// import locale from 'seedsui-react/lib/locale'

import Combo from './../Combo'
import { validateMaxMin, getDateDisplayValue } from './../utils'

// 日期类型选择控件: 年月日季
const Types = forwardRef(
  (
    {
      min,
      max,
      list = [
        {
          type: 'date',
          name: locale('日', 'SeedsUI_unit_date')
        },
        {
          type: 'month',
          name: locale('月', 'SeedsUI_unit_month')
        },
        {
          type: 'quarter',
          name: locale('季', 'SeedsUI_unit_quarter')
        },
        {
          type: 'year',
          name: locale('年', 'SeedsUI_unit_year')
        }
      ],
      value,
      /*
      {
        type: 'date',
        name: '日',
        value: new Date()
      }
      */

      // 渲染tab右边的选择器
      pickerRender,

      // 配置
      contentProps = {},
      TabsProps = {},
      DatePickerComboProps = {},

      onError,
      onChange,

      // 其它属性
      ...props
    },
    ref
  ) => {
    // 显示文本
    let displayValue = getDateDisplayValue({
      type: value?.type,
      value: value?.value
    })

    const rootRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current,
        instance: instance.current,
        getRootDOM: () => rootRef?.current,
        getInstance: () => instance.current,
        // 显示文本
        displayValue: displayValue,
        getDisplayValue: (newValue) => {
          return getDateDisplayValue({
            type: value?.type,
            value: newValue || value?.value
          })
        }
      }
    })

    useEffect(() => {
      // 如果默认没有值, 则默认为当天
      if (!value) {
        let newValue = list[0]
        updateValue(newValue)
        handleChange(newValue)
      }
    }, []) // eslint-disable-line

    // 统一的修改方法
    function handleChange(newValue) {
      let date = validateMaxMin(newValue.value, {
        type: newValue.type,
        min: min,
        max: max,
        onError: onError
      })
      if (date === false) {
        return
      }
      newValue.value = date
      if (onChange) onChange(newValue)
    }

    // 点击Tab
    function handleTabs(newValue) {
      if (!newValue.type) return
      newValue.value = value?.value
      handleChange(newValue)
    }

    // 向前
    function handlePrev(e) {
      if (!value) return
      let newValue = updateValue(value, -1)
      handleChange(newValue)
    }

    // 向后
    function handleNext(e) {
      if (!value) return
      let newValue = updateValue(value, 1)
      handleChange(newValue)
    }

    // 选择日期
    function handleDate(date) {
      value.value = date
      handleChange({ ...value })
    }

    /**
     * 切换日期
     * @param {Date} newValue 日期
     * @param {Number} go 前行后退, 0: 当前; -1: 后退; 1: 前进;
     */
    function updateValue(newValue, go = 0) {
      if (!newValue?.type) return
      if (!newValue?.value) {
        newValue.value = new Date()
      }
      // eslint-disable-next-line
      newValue = Object.clone(newValue)
      switch (newValue.type) {
        // 年
        case 'year': {
          if (go === 0) {
            break
          }
          go === -1 ? newValue.value.prevYear() : newValue.value.nextYear()
          break
        }
        // 季
        case 'quarter': {
          if (go === 0) {
            break
          }
          go === -1 ? newValue.value.prevQuarter() : newValue.value.nextQuarter()
          break
        }
        // 月
        case 'month': {
          if (go === 0) {
            break
          }
          go === -1 ? newValue.value.prevMonth() : newValue.value.nextMonth()
          break
        }
        // 日
        case 'date': {
          if (go === 0) {
            break
          }
          go === -1 ? newValue.value.prevDate() : newValue.value.nextDate()
          break
        }
        default: {
        }
      }
      return newValue
    }

    // 获取选择控件的node
    function getPickerNode() {
      let pickerNode = undefined
      if (typeof pickerRender === 'function') {
        pickerNode = pickerRender(value, { onChange: handleDate })
      }
      if (pickerNode === undefined) {
        pickerNode = (
          <>
            <i className="datepicker-types-prev icon shape-arrow-left sm" onClick={handlePrev} />
            <Combo
              {...(DatePickerComboProps || {})}
              value={value?.value}
              type={value?.type}
              className={`datepicker-types-date${
                DatePickerComboProps?.className ? ' ' + DatePickerComboProps.className : ''
              }`}
              onChange={handleDate}
            >
              <p>{displayValue || ''}</p>
            </Combo>
            <i className="datepicker-types-next icon shape-arrow-right sm" onClick={handleNext} />
          </>
        )
      }

      return pickerNode
    }
    return (
      <div
        {...props}
        className={`datepicker-types${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        {Array.isArray(list) && (
          <Tabs
            onChange={handleTabs}
            list={list}
            value={value}
            className="tabs-rect datepicker-types-tabs"
            {...TabsProps}
          />
        )}
        <div
          {...contentProps}
          className={`datepicker-types-content${
            contentProps.className ? ' ' + contentProps.className : ''
          }`}
        >
          {getPickerNode()}
        </div>
      </div>
    )
  }
)

export default Types
