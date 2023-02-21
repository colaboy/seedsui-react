import React, { useState, forwardRef, Fragment } from 'react'
import Popover from './../Popover'
import locale from './../locale'
import DateRange from './DateRange'
import helper from './helper'

let range = 90

// 日期快捷选择弹窗
/**
 * @deprecated since version 5.2.8
 * 请使用DatePicker.Types
 */
const DateRangePopover = forwardRef(
  (
    {
      // 显隐与隐藏
      visible = false,
      onVisibleChange,

      // 位置
      top = 88,
      left = 10,

      // 开始、结束日期：['YYYY-MM-DD', 'YYYY-MM-DD']
      value,

      // 范围
      ranges = {
        [locale('今天', 'datepopover_today')]: [
          new Date().format('YYYY-MM-DD'),
          new Date().format('YYYY-MM-DD')
        ],
        [locale('昨天', 'datepopover_yesterday')]: [
          new Date().prevDate().format('YYYY-MM-DD'),
          new Date().prevDate().format('YYYY-MM-DD')
        ],
        [locale('本月', 'datepopover_this_month')]: [
          new Date().firstMonthDate().format('YYYY-MM-DD'),
          new Date().format('YYYY-MM-DD')
        ],
        [locale('上月', 'datepopover_last_month')]: [
          new Date().prevMonth().firstMonthDate().format('YYYY-MM-DD'),
          new Date().prevMonth().lastMonthDate().format('YYYY-MM-DD')
        ],
        [locale('最近7天', 'datepopover_last_days', ['7'])]: [
          new Date().prevDate(6).format('YYYY-MM-DD'),
          new Date().format('YYYY-MM-DD')
        ],
        [locale('最近30天', 'datepopover_last_days', ['30'])]: [
          new Date().prevDate(29).format('YYYY-MM-DD'),
          new Date().format('YYYY-MM-DD')
        ],
        [locale('自定义时间', 'datepopover_custom_date')]: 90
      },
      // 自定义日期, 范围内错误提示
      rangeErrMsg,

      // 修改事件
      onChange,

      // 其它属性
      maskAttribute,

      // 自定义弹框属性
      caption = locale('自定义时间', 'datepopover_custom_date'),
      startInputDateProps = {},
      endInputDateProps = {},
      ...others
    },
    ref
  ) => {
    let startDate = ''
    let endDate = ''
    if (Array.isArray(value) && value.length === 2) {
      startDate = value[0] || ''
      endDate = value[1] || ''
    }

    // 自定义日期数据
    const [rangeVisible, setRangeVisible] = useState(false)

    // 修改日期
    function handleChangeDate(e, startDate, endDate) {
      if (onChange) {
        onChange(e, [startDate, endDate], helper.getDateName(startDate, endDate))
      }
      if (onVisibleChange) onVisibleChange(false)
    }

    // 显示自定义弹框
    function showCustomDialog(currentRange) {
      // 设置区间不能超过?天
      range = currentRange
      setRangeVisible(true)
      if (onVisibleChange) onVisibleChange()
    }

    // 修改自定义日期
    function handleChangeCustom(e, values) {
      setRangeVisible(false)
      if (onChange) {
        onChange(e, values, helper.getDateName(values[0], values[1]))
      }
    }

    if (!ranges || typeof ranges !== 'object') {
      return null
    }
    return (
      <Fragment>
        <Popover
          ref={ref}
          show={visible}
          {...others}
          className={`datepopover ${others.className || 'top-left'}`}
          style={Object.assign({ left: `${left}px`, top: `${top}px` }, others.style || {})}
          maskAttribute={Object.assign(
            {},
            {
              onClick: () => {
                if (onVisibleChange) onVisibleChange(false)
              }
            },
            maskAttribute || {}
          )}
        >
          {Object.entries(ranges).map((item) => {
            let key = item[0]
            let range = item[1]
            if (typeof range === 'number') {
              return (
                <div
                  className="datepopover-option"
                  key={key}
                  onClick={() => showCustomDialog(range)}
                >
                  {locale('自定义时间', 'datepopover_custom_date')}
                </div>
              )
            }
            return (
              <div
                key={key}
                className="datepopover-option"
                onClick={(e) => handleChangeDate(e, range[0], range[1])}
              >
                {key}
              </div>
            )
          })}
        </Popover>

        {/* 自定义时间 */}
        <DateRange
          caption={caption}
          visible={rangeVisible}
          start={startDate}
          end={endDate}
          startInputDateProps={startInputDateProps}
          endInputDateProps={endInputDateProps}
          // 确定前校验
          onSubmitBefore={(e, values) => {
            if (!helper.isRange(values[0], values[1], range, rangeErrMsg)) {
              return false
            }
            return true
          }}
          onChange={handleChangeCustom}
          onVisibleChange={setRangeVisible}
        />
      </Fragment>
    )
  }
)

export default DateRangePopover
