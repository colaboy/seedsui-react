// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import locale from './../../locale'
import Head from './../../Picker/Modal/Head'
import Instance from './instance.js'
import Utils from './Utils'

const Modal = forwardRef(
  (
    {
      // 通用属性
      portal, // {wrapper: true(只显示wrapper的内容)}
      getComboDOM,
      maskClosable = true,
      value,
      list, // {year: [], quarter: [], month: [], day: [], hour: [], minute: []}

      onBeforeChange,
      onChange,

      visible = false,
      onVisibleChange,

      maskProps = {},
      wrapperProps = {},
      captionProps = {},
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
    // 标题
    let [title, setTitle] = useState('')
    // 节点
    const rootRef = useRef(null)
    const wrapperRef = useRef(null)
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
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (instance.current) {
        if (visible) {
          handleUpdate()
        }
      }
      // 显示时触发onVisibleChange
      if (visible) {
        if (onVisibleChange) onVisibleChange(visible)
      }
      // eslint-disable-next-line
    }, [visible])

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onScrollEnd = handleScrollEnd
    }

    // 点击确认
    async function handleSubmitClick() {
      let s = instance.current
      // 获取选中项
      let newValue = s.getActiveDate(s.activeOptions)
      var activeKeys = s.activeOptions.map(function (n, i, a) {
        return n['id']
      })
      s.setDefaultsByKeys(activeKeys)
      if (submitProps.onClick) submitProps.onClick(s)

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
    function handleCancelClick() {
      if (cancelProps.onClick) cancelProps.onClick()
      if (onVisibleChange) onVisibleChange(false)
    }
    function handleMaskClick(e) {
      if (!e.target.classList.contains('mask')) return
      let s = instance.current
      if (maskProps.onClick) maskProps.onClick(s)

      if (maskClosable && onVisibleChange) onVisibleChange(false)
    }
    function handleScrollEnd() {
      let s = instance.current
      // 根据月份算日
      if (
        (s.params.viewType === 'date' || s.params.viewType === 'datetime') &&
        (s.activeSlot.index === 0 || s.activeSlot.index === 1)
      ) {
        var year = s.activeOptions[0]['id']
        var month = s.activeOptions[1]['id']
        var defaultDay = s.activeOptions[2]['id']
        s.updateDays(year, month, defaultDay) // 更新总天数
      }
      // 是否显示标题
      title = s.getActiveWeekText()
      setTitle(title)

      // 如果只渲染wrapper则意味没有头部所以需要触发onChange
      if (Object.prototype.toString.call(portal) === '[object Object]' && portal.wrapper) {
        handleSubmitClick()
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
      title = instance.current.getActiveWeekText()
      setTitle(title)
    }

    function initInstance() {
      if (!wrapperRef || !wrapperRef.current) return
      var data = Utils.getData(list)
      var def = Utils.getDefaults(value)
      // render数据
      instance.current = new Instance({
        wrapper: wrapperRef.current,
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
        onScrollEnd: handleScrollEnd,
        yyUnit: locale('', 'picker_unit_year'), // 年
        QQUnit: locale('', 'picker_unit_quarter'), // 季
        MMUnit: locale('', 'picker_unit_month'), // 月
        ddUnit: locale('', 'picker_unit_date'), // 日
        hhUnit: locale('', 'picker_unit_hour'), // 时
        mmUnit: locale('', 'picker_unit_minute') // 分
      })
    }
    // 主体内容
    const ContentDOM = (
      <div
        {...wrapperProps}
        className={`picker-wrapper${wrapperProps.className ? ' ' + wrapperProps.className : ''}`}
        ref={wrapperRef}
      >
        <div className="picker-layer">
          <div className="picker-layer-frame"></div>
        </div>
        <div className="picker-slotbox"></div>
      </div>
    )

    // 只渲染主体
    if (Object.prototype.toString.call(portal) === '[object Object]' && portal.wrapper) {
      return ContentDOM
    }

    // 渲染完整体
    return createPortal(
      <div
        ref={rootRef}
        {...maskProps}
        className={`mask picker-mask${maskProps.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
        onClick={handleMaskClick}
      >
        <div
          {...props}
          className={`picker${props.className ? ' ' + props.className : ''}${
            visible ? ' active' : ''
          }`}
        >
          {/* 头 */}
          <Head
            // 标题
            captionProps={Object({ caption: title }, captionProps)}
            // 按钮
            cancelProps={cancelProps}
            submitProps={submitProps}
            onSubmitClick={handleSubmitClick}
            onCancelClick={handleCancelClick}
          />
          {ContentDOM}
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default React.memo(Modal, (prevProps, nextProps) => {
  if (
    nextProps.visible === prevProps.visible &&
    // 当只显示wrapper时, 仅会使用wrapperProps来控制显隐
    JSON.stringify(nextProps.wrapperProps) === JSON.stringify(prevProps.wrapperProps)
  ) {
    return true
  }
  return false
})
