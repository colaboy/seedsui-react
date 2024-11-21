import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react'

import { validateMaxMin } from './../utils'
import WeekCombo from './WeekCombo'
import DateCombo from './DateCombo'

// 内库使用
import Tabs from './../../Tabs'
import locale from './../../locale'

// 测试使用
// import { Tabs, locale } from 'seedsui-react'

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
          type: 'week',
          id: 'week',
          name: locale('周', 'datetype_unit_week')
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
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current,
        getRootDOM: () => rootRef?.current
      }
    })

    useEffect(() => {
      // 如果默认没有值, 则默认为当天
      if (!value) {
        let newValue = list[0]
        if (!newValue.value) {
          newValue.value = new Date()
        }
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
      if (!newValue.value) newValue.value = value?.value || new Date()
      handleChange(newValue)
    }

    // 选择日期
    function handleDate(date) {
      value.value = date
      handleChange({ ...value })
    }

    // 获取选择控件的node
    function getPickerNode() {
      let pickerNode = undefined
      if (typeof pickerRender === 'function') {
        pickerNode = pickerRender(value, { onChange: handleDate })
      }
      if (pickerNode === undefined) {
        pickerNode =
          value.type === 'week' ? (
            <WeekCombo
              {...(DatePickerComboProps || {})}
              value={value?.value}
              onChange={handleDate}
            />
          ) : (
            <DateCombo
              {...(DatePickerComboProps || {})}
              type={value?.type}
              value={value?.value}
              onChange={handleDate}
            />
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
          {value?.value instanceof Date ? getPickerNode() : null}
        </div>
      </div>
    )
  }
)

export default Types
