// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Combo from './../../Picker/Combo'
import Modal from './../RangeModal'
import Utils from './Utils'
import locale from './../../locale'

const RangeCombo = forwardRef(
  (
    {
      // 自定义弹框属性
      // 分割线
      separator,
      // 标题
      caption,
      min,
      max,
      type, // year | quarter | month | date | time | datetime
      format,

      // 天数限制
      daysLimit,
      // 是否显示别名
      enableAlias = true,
      // 范围
      ranges = {
        [locale('今天', 'datepicker-tooltip_today')]: [new Date(), new Date()],
        [locale('昨天', 'datepicker-tooltip_yesterday')]: [
          new Date().prevDate(),
          new Date().prevDate()
        ],
        [locale('本月', 'datepicker-tooltip_this_month')]: [
          new Date().firstMonthDate(),
          new Date()
        ],
        [locale('上月', 'datepicker-tooltip_last_month')]: [
          new Date().prevMonth().firstMonthDate(),
          new Date().prevMonth().lastMonthDate()
        ],
        [locale('最近7天', 'datepicker-tooltip_last_days', ['7'])]: [
          new Date().prevDate(6),
          new Date()
        ],
        [locale('最近30天', 'datepicker-tooltip_last_days', ['30'])]: [
          new Date().prevDate(29),
          new Date()
        ],
        [locale('自定义时间', 'datepicker-tooltip_custom_date')]: {
          [locale('自定义时间', 'datepicker-tooltip_custom_date')]: null
        }
      },
      onError,
      ModalProps = {},

      // 其它标准属性
      value,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM,
        modalDOM: rootRef?.current?.modalDOM,
        instance: instance.current,
        getRootDOM: rootRef?.current?.getRootDOM,
        getModalDOM: rootRef?.current?.getModalDOM,
        getInstance: () => instance.current
      }
    })

    // 实例化
    instance.current = {
      getDisplayValue: function (value) {
        return Utils.getDisplayValue({
          // 用于显示别名
          ranges: enableAlias ? ranges : null,
          // 按日期类型显示
          type: type,
          // 按自定义格式显示
          format: format,
          // 分割符
          separator: separator,
          value: value
        })
      }
    }
    // 显示值
    let displayValue = instance.current.getDisplayValue(value)

    return (
      <Combo
        value={displayValue}
        ModalComponent={Modal}
        ModalProps={{
          separator: separator,
          caption: caption,
          value: value,
          min: min,
          max: max,
          type: type,
          ranges: ranges,
          daysLimit: daysLimit,
          onError: onError,
          ...ModalProps
        }}
        {...props}
        ref={rootRef}
      />
    )
  }
)

export default RangeCombo
