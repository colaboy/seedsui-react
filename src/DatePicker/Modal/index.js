// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import locale from './../../locale'
import Head from './../../Picker/Modal/Head'
import Instance from './instance.js'
import Utils from './Utils'

const Modal = forwardRef(
  (
    {
      // 通用属性
      portal,
      getComboDOM,
      maskClosable = true,
      value,
      list, // {year: [], quarter: [], month: [], day: [], hour: [], minute: []}

      onBeforeChange,
      onChange,

      visible = false,
      onVisibleChange,

      maskProps = {},
      submitProps = {},
      cancelProps = {},

      // 定制属性
      type = 'date', // year | quarter | month | date | time | datetime
      min,
      max,

      onError,
      ...props
    },
    ref
  ) => {
    if (!['year', 'quarter', 'month', 'date', 'time', 'datetime'].includes(type)) {
      console.error('SeedsUI-DatePicker:type类型不正确')
      type = 'date'
    }
    // 节点
    const rootRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    useEffect(() => {
      initInstance()
    }, []) // eslint-disable-line

    useEffect(() => {
      if (instance.current) {
        if (visible) {
          handleUpdate()
          instance.current.show()
        } else {
          instance.current.hide()
        }
      }
    }, [visible]) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onClickSubmit = handleSubmitClick
      instance.current.params.onClickCancel = handleCancelClick
      instance.current.params.onClickMask = handleMaskClick
      instance.current.params.onScrollEnd = handleScrollEnd
    }

    // 点击确认
    async function handleSubmitClick(e) {
      // 获取选中项
      let newValue = e.getActiveDate(e.activeOptions)
      var activeKeys = e.activeOptions.map(function (n, i, a) {
        return n['id']
      })
      e.setDefaultsByKeys(activeKeys)
      if (submitProps.onClick) submitProps.onClick(e)

      newValue = Utils.validateDate(newValue, {
        type: type,
        min: min,
        max: max,
        onError: onError
      })
      if (newValue === false) return
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (!goOn) return
      }
      // 触发onChange事件
      if (onChange) onChange(newValue)
      if (onVisibleChange) onVisibleChange(false)
    }
    function handleCancelClick(e) {
      if (cancelProps.onClick) cancelProps.onClick(e)
      if (onVisibleChange) onVisibleChange(false)
    }
    function handleMaskClick(e) {
      if (maskProps.onClick) maskProps.onClick(e)

      if (maskClosable && onVisibleChange) onVisibleChange(false)
    }
    function handleScrollEnd(e) {
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
    }

    function handleUpdate() {
      instance.current.updateParams({
        viewType: type,
        yyUnit: locale('', 'picker_unit_year'),
        QQUnit: locale('', 'picker_unit_quarter'),
        MMUnit: locale('', 'picker_unit_month'),
        ddUnit: locale('', 'picker_unit_date'),
        hhUnit: locale('', 'picker_unit_hour'),
        mmUnit: locale('', 'picker_unit_minute')
      })
      const def = Utils.getDefaults(value)
      instance.current.setDefaults(def)
      instance.current.update()
      // 是否显示标题
      if (instance.current.headerTitle) {
        instance.current.headerTitle.innerHTML = instance.current.getActiveWeekText()
      }
    }

    function initInstance() {
      if (!rootRef || !rootRef.current) return
      var data = Utils.getData(list)
      var def = Utils.getDefaults(value)
      // render数据
      instance.current = new Instance({
        mask: rootRef.current,
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
        onClickMask: handleMaskClick,
        onClickCancel: handleCancelClick,
        onClickSubmit: handleSubmitClick,
        onScrollEnd: handleScrollEnd,
        onHid: (e) => {},
        yyUnit: locale('', 'picker_unit_year'), // 年
        QQUnit: locale('', 'picker_unit_quarter'), // 季
        MMUnit: locale('', 'picker_unit_month'), // 月
        ddUnit: locale('', 'picker_unit_date'), // 日
        hhUnit: locale('', 'picker_unit_hour'), // 时
        mmUnit: locale('', 'picker_unit_minute') // 分
      })
      if (visible && instance) {
        setTimeout(function () {
          instance.current.show()
        }, 10)
      }
    }
    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { onClick, ...otherProps } = props
      return { ...otherProps }
    }

    // 剔除掉onClick事件, 因为在instance时已经回调了
    const otherMaskProps = filterProps(maskProps)
    const otherSubmitProps = filterProps(submitProps)
    const otherCancelProps = filterProps(cancelProps)
    return createPortal(
      <div
        ref={rootRef}
        {...otherMaskProps}
        className={`mask picker-mask${
          otherMaskProps.className ? ' ' + otherMaskProps.className : ''
        }`}
      >
        <div {...props} className={`picker${props.className ? ' ' + props.className : ''}`}>
          {/* 头 */}
          <Head
            // 为了启用确定按钮
            multiple={true}
            // caption
            cancelProps={otherCancelProps}
            submitProps={otherSubmitProps}
          />
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

export default React.memo(Modal, (prevProps, nextProps) => {
  if (nextProps.visible === prevProps.visible) return true
  return false
})
