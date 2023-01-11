// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'

import Head from './../../Picker/Modal/Head'
import DatePickerModal from './../Modal'
import Tabs from './../../Tabs'

// import locale from './../../locale'
import DateComboUtils from './../Combo/Utils'
import DateModalUtils from './../Modal/Utils'

const MultipleModal = forwardRef(
  (
    {
      // 通用属性
      portal, // 支持{mask: MaskNode}
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
    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    // 选中tab
    const [tabs, setTabs] = useState(null)
    const [activeTab, setActiveTab] = useState(null)

    useEffect(() => {
      if (!Array.isArray(value) || !value[0] || !value[0].id) return
      // 格式化value
      let newTabs = value.map((tab) => {
        return {
          ...tab,
          sndcaption: DateComboUtils.getDisplayValue({
            type: type,
            value: tab.value
          })
        }
      })
      setTabs(newTabs)
      setActiveTab(newTabs[0])
    }, [value])

    // 点击确认
    async function handleSubmitClick() {
      if (submitProps.onClick) submitProps.onClick()

      // 校验选择是否合法
      for (let tab of tabs) {
        let newValue = DateModalUtils.validateDate(tab.value, {
          type: type,
          min: min,
          max: max,
          onError: onError
        })
        if (newValue === false) return
        tab.value = newValue
      }

      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(tabs)
        if (!goOn) return
      }
      // 触发onChange事件
      if (onChange) onChange(tabs)
      if (onVisibleChange) onVisibleChange(false)
    }
    function handleCancelClick() {
      if (cancelProps.onClick) cancelProps.onClick()
      if (onVisibleChange) onVisibleChange(false)
    }

    // 点击遮罩
    function handleMaskClick(e) {
      if (!e.target.classList.contains('mask')) return
      if (maskProps.onClick) maskProps.onClick()
      if (maskClosable && onVisibleChange) onVisibleChange(false)
    }

    // 选择日期
    function handleDateChange(newTab) {
      let newTabList = tabs.map((tab) => {
        if (tab === newTab.id) return newTab
        return tab
      })
      setTabs(newTabList)
    }

    if (!value) {
      console.error(
        'DatePicker.MultipleModal: Wrong parameter with "value"! You need correct to [new Date(), new Date()]',
        value
      )
      return null
    }
    if (!tabs) return null
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
            cancelProps={cancelProps}
            submitProps={submitProps}
            onSubmitClick={handleSubmitClick}
            onCancelClick={handleCancelClick}
          />
          <Tabs className="picker-tabs" list={tabs} value={activeTab} onChange={setActiveTab} />
          {tabs.map((tab, index) => {
            let wrapperVisible = tab.id === activeTab.id
            return (
              <DatePickerModal
                key={tab.id || index}
                type={tab.type || 'date'}
                value={tab.value}
                visible={visible}
                portal={{ wrapper: true }}
                onChange={(date) => {
                  tab.value = date
                  tab.sndcaption = DateComboUtils.getDisplayValue({
                    type: type,
                    value: tab.value
                  })
                  handleDateChange(tab)
                }}
                wrapperProps={Object.assign({}, wrapperProps, {
                  className: `${wrapperProps.className || ''}${wrapperVisible ? '' : ' hide'}`
                })}
              />
            )
          })}
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default React.memo(MultipleModal, (prevProps, nextProps) => {
  if (nextProps.visible === prevProps.visible) return true
  return false
})
