// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react'
import locale from './../../locale'
import { getFormat } from './../utils'
import Instance from './instance.js'
import Utils from './Utils'

const Main = forwardRef(
  (
    {
      // Modal
      visible,

      // Main
      // MainComponent,
      // MainProps,

      // Main: common
      value,
      list,
      multiple,
      onSelect,
      onBeforeChange,
      onChange,

      // Main: Picker Control properties
      defaultPickerValue,

      // Main: DatePicker Control properties
      titleFormatter,
      type = 'date', // year | quarter | month | date | time | datetime
      min,
      max,
      onError,
      ranges,
      rangesModal, // 快捷选择弹出方式
      separator,

      ...props
    },
    ref
  ) => {
    // 过滤非法的类型
    if (!['year', 'quarter', 'month', 'date', 'time', 'datetime'].includes(type)) {
      console.error(
        "DatePicker.Modal: Wrong parameter with \"type\"! You need correct to ['year', 'quarter', 'month', 'date', 'time', 'datetime'] any one"
      )
      // eslint-disable-next-line
      type = 'date'
    }

    // 节点
    const mainRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
        instance: instance.current,
        getInstance: () => instance.current,
        getValue: getValue,
        update: update,
        // 获取标题
        getTitle: () => {
          if (instance?.current?.formatTitle) {
            let format = ''
            // 如果用户没有自定义标题格式, 则使用动态格式
            if (typeof titleFormatter === 'function') {
              format = titleFormatter({ type, value: getValue(), ranges, separator })
            }
            if (!format || typeof format !== 'string') {
              // 只有年月日、年月日时分才显示周几
              format = `${getFormat(type)}${['date', 'datetime'].includes(type) ? ' 周EE' : ''}`
            }
            return instance.current.formatTitle(format)
          }
          return ''
        }
      }
    })

    // useEffect(() => {
    //   initInstance()
    //   // eslint-disable-next-line
    // }, [])

    useEffect(() => {
      update()
      // eslint-disable-next-line
    }, [value])

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onScrollTransitionEnd = handleChange
    }

    // 更新视图
    function update() {
      if (instance.current) {
        instance.current.updateParams({
          viewType: type,
          yyUnit: locale('', 'picker_unit_year'),
          QQUnit: locale('', 'picker_unit_quarter'),
          MMUnit: locale('', 'picker_unit_month'),
          ddUnit: locale('', 'picker_unit_date'),
          hhUnit: locale('', 'picker_unit_hour'),
          mmUnit: locale('', 'picker_unit_minute')
        })
        const def = Utils.getDefaults(value, defaultPickerValue)
        instance.current.setDefaults(def)
        instance.current.update()
      } else {
        initInstance()
      }
    }

    // 滚动结束
    function handleChange(s) {
      setTimeout(() => {
        // 根据月份算日
        if (
          (s.params.viewType === 'date' || s.params.viewType === 'datetime') &&
          (s.activeSlot.index === 0 || s.activeSlot.index === 1)
        ) {
          let year = s.activeOptions[0]['id']
          let month = s.activeOptions[1]['id']
          let defaultDay = s.activeOptions[2]['id']
          s.updateDays(year, month, defaultDay) // 更新总天数
        }

        // 触发onChange事件
        if (onChange) onChange(getValue())
      }, 300)
    }

    // 获取选中值
    function getValue() {
      let s = instance.current
      // 获取选中项
      let newValue = s.getActiveDate(s.activeOptions)
      let activeKeys = s.activeOptions.map(function (n, i, a) {
        return n['id']
      })
      s.setDefaultsByKeys(activeKeys)
      return newValue
    }

    // 实例化
    function initInstance() {
      if (!mainRef || !mainRef.current) return
      let data = Utils.getData(list)
      let def = Utils.getDefaults(value, defaultPickerValue)
      // render数据
      instance.current = new Instance({
        wrapper: mainRef.current,
        viewType: type,
        yearsData: data.yearsData,
        quartersData: data.quartersData,
        monthsData: data.monthsData,
        daysData: data.daysData,
        hoursData: data.hoursData,
        minutesData: data.minutesData,
        defaultYear: def.year,
        defaultQuarter: def.quarter,
        defaultMonth: def.month,
        defaultDay: def.day,
        defaultHour: def.hour,
        defaultMinute: def.minute,
        onScrollTransitionEnd: handleChange,
        yyUnit: locale('', 'picker_unit_year'), // 年
        QQUnit: locale('', 'picker_unit_quarter'), // 季
        MMUnit: locale('', 'picker_unit_month'), // 月
        ddUnit: locale('', 'picker_unit_date'), // 日
        hhUnit: locale('', 'picker_unit_hour'), // 时
        mmUnit: locale('', 'picker_unit_minute') // 分
      })
    }

    return (
      <div
        {...props}
        className={`picker-wrapper${props.className ? ' ' + props.className : ''}`}
        ref={mainRef}
      >
        <div className="picker-layer">
          <div className="picker-layer-frame"></div>
        </div>
        <div className="picker-slotbox"></div>
      </div>
    )
  }
)

export default Main
