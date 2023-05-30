// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'

import Head from './../../Picker/Modal/Head'
import DatePickerModal from './../Modal'
import Tabs from './../../Tabs'

// import locale from './../../locale'
import { getDateDisplayValue } from './../utils'
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
      if (!visible || !Array.isArray(value) || !value[0] || !value[0].id) {
        // 动画执行完成后再重置
        setTimeout(() => {
          setTabs(null)
          setActiveTab(null)
        }, 300)
        return
      }
      // 构建tabs, 将value的[{type: 'date', id: 'start', name: '开始时间', value: new Date()}]]加入sndcaption
      let newTabs = value.map((tab) => {
        return {
          ...tab,
          value: tab.value || new Date(),
          sndcaption: getDateDisplayValue({
            type: tab.type || type,
            value: tab.value || new Date()
          })
        }
      })
      setTabs(newTabs)
      setActiveTab(newTabs[0])
    }, [visible])

    // 点击确认
    async function handleSubmitClick() {
      if (submitProps.onClick) submitProps.onClick()

      // 校验选择是否合法
      for (let tab of tabs) {
        let newValue = DateModalUtils.validateDate(tab.value, {
          type: tab.type || type,
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
      console.warn(
        "DatePicker.MultipleModal: Wrong parameter with \"value\"! You need to correct to [{type: 'date', id: 'start', name: '开始时间', value: new Date()}]]",
        value
      )
      return null
    }
    return createPortal(
      <div
        {...maskProps}
        className={`mask picker-mask${maskProps.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
        onClick={handleMaskClick}
        ref={rootRef}
      >
        <div
          {...props}
          className={`picker${props.className ? ' ' + props.className : ''}${
            visible ? ' active' : ''
          }`}
        >
          {tabs && (
            <>
              {/* 头 */}
              <Head
                captionProps={captionProps}
                cancelProps={cancelProps}
                submitProps={submitProps}
                onSubmitClick={handleSubmitClick}
                onCancelClick={handleCancelClick}
              />
              <Tabs className="picker-tabs" list={tabs} value={activeTab} onChange={setActiveTab} />
              {tabs.map((tab, index) => {
                // 主体内容(wrapper)是否显示
                let contentVisible = tab.id === activeTab.id
                if (!contentVisible) return null
                return (
                  <DatePickerModal
                    key={tab.id || index}
                    type={tab.type || 'date'}
                    value={tab.value}
                    visible={visible}
                    // 传入wrapper将只渲染内容(wrapper)
                    wrapper
                    onChange={(date) => {
                      tab.value = date
                      tab.sndcaption = getDateDisplayValue({
                        type: tab.type || type,
                        value: tab.value
                      })
                      handleDateChange(tab)
                    }}
                  />
                )
              })}
            </>
          )}
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
