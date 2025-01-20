import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react'
import Tabbar from './../Tabbar'
import InputDate from './../InputDate'
import locale from './../locale'
import helper from './../InputDate/helper'

// 日期类型选择控件: 年月日季
const DateType = forwardRef(
  (
    {
      list = [
        {
          type: 'date',
          id: 'date',
          name: locale('日', 'SeedsUI_unit_date')
        },
        {
          type: 'month',
          id: 'month',
          name: locale('月', 'SeedsUI_unit_month')
        },
        {
          type: 'quarter',
          id: 'quarter',
          name: locale('季', 'SeedsUI_unit_quarter')
        },
        {
          type: 'year',
          id: 'year',
          name: locale('年', 'SeedsUI_unit_year')
        }
      ],
      listVisible = true,
      activeIndex = 0,

      // InputPicker
      onError, // func(e, err)
      inputpickerProps = {},
      selected,
      value,

      // 点击选项或者修改值, onChange(e, value, selected, activeIndex)
      onChange,

      // 其它属性
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    let min = list[activeIndex].min
    let max = list[activeIndex].max
    useImperativeHandle(ref, () => {
      return rootRef.current
    })

    useEffect(() => {
      // 如果默认没有值, 则默认为当天
      if (!value && typeof activeIndex === 'number' && list[activeIndex]) {
        let item = list[activeIndex]
        let newValue = getValue('', item.type, 0)
        handleChange({ target: rootRef.current }, newValue, [item], activeIndex)
      }
    }, []) // eslint-disable-line

    // 统一的修改方法
    function handleChange(e, val, selected, index, enableOnError) {
      val = helper.validateDate(val, {
        type: list[activeIndex].type,
        min: min,
        max: max,
        split: inputpickerProps?.pickerProps?.split || '-',
        timeSplit: inputpickerProps?.pickerProps?.timeSplit || ':',
        event: e,
        onError: enableOnError !== false ? onError : null
      })
      if (val === false) return
      if (onChange) onChange(e, val, selected, index)
    }

    // 点击Tab
    function handleTab(e, tabName, selected, index) {
      if (!selected) return
      let item = selected[0]
      if (!item.type) return
      // 设置值为今天
      let newValue = getValue('', item.type, 0)
      min = list[index].min
      max = list[index].max
      handleChange(e, newValue, [item], index, false)
    }

    // 向前
    function handlePrev(e) {
      if (!value || !list[activeIndex].type) return
      let newValue = getValue(value, list[activeIndex].type, -1)
      handleChange(e, newValue, [list[activeIndex]], activeIndex)
    }

    // 向后
    function handleNext(e) {
      if (!value || !list[activeIndex].type) return
      let newValue = getValue(value, list[activeIndex].type, 1)
      handleChange(e, newValue, [list[activeIndex]], activeIndex)
    }

    // 选择日期
    function handleDate(e, value) {
      handleChange(e, value, [list[activeIndex]], activeIndex)
    }

    /**
     * 切换日期
     * @param {String} currentValue 单位列表, 单位列表需要从大到小排序后才能计算
     * @param {String} dateType 日期类型, [date|month|quarter|year]
     * @param {Number} go 前行后退, 0: 当前; -1: 后退; 1: 前进;
     */
    function getValue(currentValue, dateType, go) {
      var date = new Date()
      var newValue = currentValue || ''
      switch (dateType) {
        // 年
        case 'year': {
          if (go === 0) {
            newValue = '' + date.getFullYear()
            break
          }
          date.year(currentValue)
          go === -1 ? date.prevYear() : date.nextYear()
          newValue = date.year()
          break
        }
        // 季
        case 'quarter': {
          if (go === 0) {
            newValue = date.getFullYear() + '-' + date.quarter()
            break
          }
          date.year(currentValue.split('-')[0])
          date.quarter(currentValue.split('-')[1])
          let quarter = go === -1 ? date.prevQuarter() : date.nextQuarter()
          newValue = date.getFullYear() + '-' + quarter
          break
        }
        // 月
        case 'month': {
          if (go === 0) {
            newValue = date.format('YYYY-MM')
            break
          }
          date = currentValue.toDate()
          go === -1 ? date.prevMonth() : date.nextMonth()
          newValue = date.format('YYYY-MM')
          break
        }
        // 日
        case 'date': {
          if (go === 0) {
            newValue = date.format('YYYY-MM-DD')
            break
          }
          date = currentValue.toDate()
          go === -1 ? date.prevDate() : date.nextDate()
          newValue = date.format('YYYY-MM-DD')
          break
        }
        default: {
          newValue = ''
        }
      }
      return newValue
    }

    return (
      <div {...others} className={`datetype${others.className ? ' ' + others.className : ''}`}>
        {listVisible && Array.isArray(list) && (
          <Tabbar
            rectJustify={false}
            onChange={handleTab}
            list={list}
            activeIndex={activeIndex}
            className="tabbar-rect datetype-tabbar"
          />
        )}
        <div className="datetype-content">
          <i className="datetype-prev icon shape-arrow-left sm" onClick={handlePrev} />
          {/* {value} */}
          <InputDate
            {...inputpickerProps}
            value={value}
            selected={selected}
            type={list[activeIndex].type}
            className={`datetype-date${
              inputpickerProps.className ? ' ' + inputpickerProps.className : ''
            }`}
            onChange={handleDate}
          >
            {value}
          </InputDate>
          <i className="datetype-next icon shape-arrow-right sm" onClick={handleNext} />
        </div>
      </div>
    )
  }
)

export default DateType
