// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useEffect, useRef, useContext, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import Instance from './instance.js'
import Context from '../Context/instance.js'

/**
 * @deprecated since version 5.2.8
 * use DatePicker instead
 */
const PickerDate = forwardRef(
  (
    {
      portal,
      data, // {year: [], quarter: [], month: [], day: [], hour: [], minute: []}
      params = {}, // 设置实例化参数
      split = '-',
      timeSplit = ':',

      type = 'date', // year | quarter | month | date | time | datetime
      show = false,
      value, // '2018-02-26'
      selected, // [{id: '', name: ''}]

      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {},

      onError,
      onScrollEnd,
      ...others
    },
    ref
  ) => {
    const refEl = useRef(null)
    useImperativeHandle(ref, () => {
      return refEl.current
    })
    const instance = useRef(null)
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }

    useEffect(() => {
      initInstance()
    }, []) // eslint-disable-line

    useEffect(() => {
      if (instance.current) {
        if (show) {
          handleUpdate()
          instance.current.show()
        } else {
          instance.current.hide()
        }
      }
      // eslint-disable-next-line
    }, [show])

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onClickSubmit = clickSubmit
      instance.current.params.onClickCancel = clickCancel
      instance.current.params.onClickMask = clickMask
      instance.current.params.onScrollEnd = scrollEnd
    }
    function clickSubmit(e) {
      // 获取选中项
      e.activeText = e.getActiveText(e.activeOptions)
      var activeKeys = e.activeOptions.map(function (n, i, a) {
        return n['id']
      })
      e.setDefaultsByKeys(activeKeys)
      // Callback
      const value = e.activeText
      const options = e.activeOptions
      if (submitAttribute.onClick) submitAttribute.onClick(e, value, options)
    }
    function clickCancel(e) {
      if (cancelAttribute.onClick) cancelAttribute.onClick(e)
    }
    function clickMask(e) {
      if (maskAttribute.onClick) maskAttribute.onClick(e)
    }
    function scrollEnd(e) {
      // 根据月份算日
      if (
        (e.params.viewType === 'date' || e.params.viewType === 'datetime') &&
        (e.activeSlot.index === 0 || e.activeSlot.index === 1)
      ) {
        var year = e.activeOptions[0]['id']
        var month = e.activeOptions[1]['id']
        var defaultDay = e.activeOptions[2]['id']
        e.updateDays(year, month, defaultDay) // 更新总天数
      }
      // 是否显示标题
      if (e.headerTitle) {
        e.headerTitle.innerHTML = e.getActiveWeekText()
      }
      // Callback
      if (onScrollEnd) onScrollEnd(e)
    }

    function handleUpdate() {
      instance.current.updateParams({
        viewType: type,
        yyUnit: locale('', 'SeedsUI_picker_unit_year'),
        QQUnit: locale('', 'SeedsUI_picker_unit_quarter'),
        MMUnit: locale('', 'SeedsUI_picker_unit_month'),
        ddUnit: locale('', 'SeedsUI_picker_unit_day'),
        hhUnit: locale('', 'SeedsUI_picker_unit_hour'),
        mmUnit: locale('', 'SeedsUI_picker_unit_minute')
      })
      const def = getDefault()
      instance.current.setDefaults(def)
      instance.current.update()
      // 是否显示标题
      if (instance.current.headerTitle) {
        instance.current.headerTitle.innerHTML = instance.current.getActiveWeekText()
      }
    }
    function getDefault() {
      var defaultValue = value
      if (selected && selected.length) {
        defaultValue = selected.map((item) => {
          return item.id
        })
        defaultValue = defaultValue.join(split)
      }
      var now = new Date()
      var nowYear = now.getFullYear()
      var nowQuarter = now.quarter()
      var nowMonth = now.getMonth() + 1
      var nowDate = now.getDate()
      var nowHour = now.getHours()
      var nowMinute = now.getMinutes()
      var defaultYear = nowYear
      var defaultQuarter = nowQuarter
      var defaultMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth
      var defaultDay = nowDate < 10 ? '0' + nowDate : nowDate
      var defaultHour = nowHour < 10 ? '0' + nowHour : nowHour
      var defaultMinute = nowMinute < 10 ? '0' + nowMinute : nowMinute
      // 默认值
      if (type === 'year') {
        // 如果不是合法的日期格式
        if (!defaultValue || !defaultValue.isYear()) {
          if (onError)
            onError({
              errMsg: `${locale('无效的日期格式', 'SeedsUI_dateformat_error')}, YYYY-MM-DD`
            })
        } else {
          defaultYear = defaultValue
        }
      } else if (type === 'quarter') {
        // 如果不是合法的日期格式
        if (!defaultValue || !defaultValue.isQuarter(split)) {
          if (onError)
            onError({
              errMsg: `${locale('无效的日期格式', 'SeedsUI_dateformat_error')}, YYYY-MM-DD`
            })
        } else {
          let quarterValues = defaultValue.split(split)
          defaultYear = quarterValues[0]
          defaultQuarter = quarterValues[1]
        }
      } else if (type === 'month') {
        // 如果不是合法的日期格式
        if (!defaultValue || !defaultValue.isMonth(split)) {
          if (onError)
            onError({
              errMsg: `${locale('无效的日期格式', 'SeedsUI_dateformat_error')}, YYYY-MM-DD`
            })
        } else {
          let monthValues = defaultValue.split(split)
          defaultYear = monthValues[0]
          defaultMonth = monthValues[1]
        }
      } else if (type === 'date') {
        // 如果不是合法的日期格式
        if (!defaultValue || !defaultValue.isDate(split)) {
          if (onError)
            onError({ errMsg: `${locale('无效的日期格式', 'SeedsUI_dateformat_error')}` })
        } else {
          let dateValues = defaultValue.split(split)
          defaultYear = dateValues[0]
          defaultMonth = dateValues[1]
          defaultDay = dateValues[2] || '01'
        }
      } else if (type === 'datetime') {
        // 如果不是合法的日期格式
        if (!defaultValue || !defaultValue.isDateTime(split, timeSplit)) {
          if (onError)
            onError({
              errMsg: `${locale('无效的日期格式', 'SeedsUI_dateformat_error')}, YYYY-MM-DD hh:mm`
            })
        } else {
          let values = defaultValue.split(' ')
          let dateValues = values[0].split(split || '-')
          let timeValues = values[1].split(timeSplit || ':')
          defaultYear = dateValues[0]
          defaultMonth = dateValues[1]
          defaultDay = dateValues[2]
          defaultHour = timeValues[0]
          defaultMinute = timeValues[1]
        }
      } else if (type === 'time') {
        // 如果不是合法的日期格式
        if (!defaultValue || !defaultValue.isTime(timeSplit)) {
          if (onError)
            onError({
              errMsg: `${locale('无效的日期格式', 'SeedsUI_dateformat_error')}, hh${
                timeSplit || ':'
              }mm`
            })
        } else {
          let timeValues = defaultValue.split(timeSplit || ':')
          defaultHour = timeValues[0]
          defaultMinute = timeValues[1]
        }
      }
      return {
        year: defaultYear,
        quarter: defaultQuarter,
        month: defaultMonth,
        day: defaultDay,
        hour: defaultHour,
        minute: defaultMinute
      }
    }
    function getData() {
      // 自定义数据
      var yearsData = null
      var quartersData = null
      var monthsData = null
      var daysData = null
      var hoursData = null
      var minutesData = null
      if (data) {
        if (data.year) {
          yearsData = data.year.map((n) => {
            return {
              id: '' + n,
              name: '' + n + locale('', 'SeedsUI_picker_unit_year') // 年
            }
          })
        }
        if (data.quarter) {
          quartersData = data.quarter.map((n) => {
            return {
              id: '' + n,
              name: '' + n + locale('', 'SeedsUI_picker_unit_quarter') // 季
            }
          })
        }
        if (data.month) {
          monthsData = data.month.map((n) => {
            return {
              id: '' + n,
              name: '' + n + locale('', 'SeedsUI_picker_unit_month') // 月
            }
          })
        }
        if (data.day) {
          daysData = data.day.map((n) => {
            return {
              id: '' + n,
              name: '' + n + locale('', 'SeedsUI_picker_unit_day') // 日
            }
          })
        }
        if (data.hour) {
          hoursData = data.hour.map((n) => {
            return {
              id: '' + n,
              name: '' + n + locale('', 'SeedsUI_picker_unit_hour') // 时
            }
          })
        }
        if (data.minute) {
          minutesData = data.minute.map((n) => {
            return {
              id: '' + n,
              name: '' + n + locale('', 'SeedsUI_picker_unit_minute') // 分
            }
          })
        }
      }
      return {
        yearsData: yearsData,
        quartersData: quartersData,
        monthsData: monthsData,
        daysData: daysData,
        hoursData: hoursData,
        minutesData: minutesData
      }
    }
    function initInstance() {
      if (!refEl || !refEl.current) return
      var data = getData()
      var def = getDefault()
      // render数据
      instance.current = new Instance({
        mask: refEl.current,
        ...params,
        split: split,
        timeSplit: timeSplit,
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
        onClickMask: clickMask,
        onClickCancel: clickCancel,
        onClickSubmit: clickSubmit,
        onScrollEnd: scrollEnd,
        onHid: (e) => {},
        yyUnit: locale('', 'SeedsUI_picker_unit_year'), // 年
        QQUnit: locale('', 'SeedsUI_picker_unit_quarter'), // 季
        MMUnit: locale('', 'SeedsUI_picker_unit_month'), // 月
        ddUnit: locale('', 'SeedsUI_picker_unit_day'), // 日
        hhUnit: locale('', 'SeedsUI_picker_unit_hour'), // 时
        mmUnit: locale('', 'SeedsUI_picker_unit_minute') // 分
      })
      if (show && instance) {
        setTimeout(function () {
          instance.current.show()
        }, 10)
      }
    }
    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { caption, onClick, ...otherProps } = props
      return { ...otherProps }
    }

    // 剔除掉onClick事件, 因为在instance时已经回调了
    const otherMaskAttribute = filterProps(maskAttribute)
    const otherSubmitAttribute = filterProps(submitAttribute)
    const otherCancelAttribute = filterProps(cancelAttribute)
    return createPortal(
      <div
        ref={refEl}
        {...otherMaskAttribute}
        className={`mask picker-mask${
          otherMaskAttribute.className ? ' ' + otherMaskAttribute.className : ''
        }`}
      >
        <div {...others} className={`picker${others.className ? ' ' + others.className : ''}`}>
          <div className="picker-header">
            <a
              {...otherCancelAttribute}
              className={`picker-cancel${
                cancelAttribute.className ? ' ' + cancelAttribute.className : ''
              }`}
            >
              {cancelAttribute.caption || locale('取消', 'SeedsUI_cancel')}
            </a>
            <div className="picker-header-title"></div>
            <a
              {...otherSubmitAttribute}
              className={`picker-submit${
                submitAttribute.className ? ' ' + submitAttribute.className : ''
              }`}
            >
              {submitAttribute.caption || locale('完成', 'SeedsUI_finish')}
            </a>
          </div>
          <div className="picker-wrapper">
            <div className="picker-layer">
              <div className="picker-layer-frame"></div>
            </div>
            <div className="picker-slotbox"></div>
          </div>
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default React.memo(PickerDate, (prevProps, nextProps) => {
  if (nextProps.show === prevProps.show) return true
  return false
})
