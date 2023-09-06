import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react'

import DatePickerMain from './../Main'
import Tabs from './../../Tabs'

// import locale from './../../locale'
import { getDateDisplayValue, validateDate } from './../utils'

// 日期多选弹框
const MultipleMain = (
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

    // Main: DatePicker Control properties
    defaultPickerValue,
    type = 'date', // year | quarter | month | date | time | datetime
    min,
    max,
    onError,

    ...props
  },
  ref
) => {
  // 节点
  const mainRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: mainRef.current,
      getRootDOM: () => mainRef.current,
      getValue: () => {
        return tabs
      }
    }
  })

  // 选中tab
  let [tabs, setTabs] = useState(null)
  let [activeTab, setActiveTab] = useState(null)
  useEffect(() => {
    if (!Array.isArray(value) || !value.length) {
      return
    }
    // 构建tabs, 将value的[{type: 'date', id: 'start', name: '开始时间', value: new Date()}]]加入sndcaption
    tabs = value.map((tab) => {
      return {
        ...tab,
        value: tab.value || tab.defaultPickerValue || new Date(),
        sndcaption: getDateDisplayValue({
          type: tab.type || type,
          value: tab.value || tab.defaultPickerValue || new Date()
        })
      }
    })
    setTabs(tabs)

    if (!activeTab) {
      setActiveTab(tabs[0])
    }
  }, [value])

  // 隐藏时, 清空选中项
  useEffect(() => {
    if (!visible) {
      setTabs(null)
      setActiveTab(null)
    }
  }, [visible])

  // 选择日期
  function handleDateChange(newTab) {
    // 更新tab
    tabs = tabs.map((tab) => {
      if (tab === newTab.id) return newTab
      return tab
    })

    // 触发onChange事件
    if (onChange) onChange(tabs)
    // 更新tabs
    setTabs(tabs)
  }

  return (
    <div ref={mainRef} {...props}>
      {Array.isArray(tabs) && tabs.length ? (
        <>
          <Tabs className="picker-tabs" list={tabs} value={activeTab} onChange={setActiveTab} />
          {tabs.map((tab, index) => {
            // 主体内容(wrapper)是否显示
            let contentVisible = tab?.id === activeTab?.id
            if (!contentVisible) return null
            return (
              <DatePickerMain
                key={tab.id || index}
                type={tab.type || 'date'}
                value={tab.value}
                defaultPickerValue={tab.defaultPickerValue}
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
      ) : null}
    </div>
  )
}

export default forwardRef(MultipleMain)
