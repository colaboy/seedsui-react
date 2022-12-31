// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'

import Head from './../../Picker/Modal/Head'
import DatePickerModal from './../Modal'
import Tabs from './../../Tabs'

import locale from './../../locale'
import DateComboUtils from './../Combo/Utils'

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
      console.log(newTabs)
      setTabs(newTabs)
      setActiveTab(newTabs[0])
    }, [value])

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
      console.error('MultipleModal: Wrong parameter with "value"!', value)
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
            // 为了启用确定按钮
            multiple={true}
            // caption
            cancelProps={cancelProps}
            submitProps={submitProps}
            // onSubmitClick={handleSubmitClick}
            // onCancelClick={handleCancelClick}
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
