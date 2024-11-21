import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import Main from './../Main'
import formatValue from './formatValue'
import getActiveTab from './getActiveTab'

// 内库使用
import locale from './../../locale'
import DateUtil from './../../DateUtil'
import Tabs from './../../Tabs'

// 测试使用
// import { locale, DateUtil, Tabs } from 'seedsui-react'

// 日期多选
function MultipleMain(
  {
    visible = true,

    // Main fixed properties
    value,
    type = 'date', // year | quarter | month | date | time | datetime | week
    min,
    max,
    allowClear,
    onChange
  },
  ref
) {
  // 格式化数据
  let tabsRef = useRef(null)
  tabsRef.current = formatValue(value, type)
  let [activeTab, setActiveTab] = useState(null)

  // Expose tools
  const mainRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: mainRef.current,
      getRootDOM: () => mainRef.current,
      // 获取标题
      getTitle: () => {
        let title = locale('选择日期', 'SeedsUI_placeholder_select')
        return title
      },
      getValue: () => {
        return tabsRef.current
      }
    }
  })

  useEffect(() => {
    if (activeTab) return
    setActiveTab(getActiveTab(tabsRef.current))
    // eslint-disable-next-line
  }, [value])

  return (
    <div ref={mainRef} className="picker-multiple-main">
      {Array.isArray(tabsRef.current) && tabsRef.current.length ? (
        <>
          <Tabs
            className="picker-tabs"
            list={tabsRef.current}
            value={activeTab}
            onChange={setActiveTab}
          />
          {tabsRef.current.map((tab, index) => {
            // 主体内容(wrapper)是否显示
            let contentVisible = tab?.id === activeTab?.id
            if (!contentVisible) return null
            return (
              <Main
                key={tab.id || index}
                value={tab.value}
                type={type}
                min={min}
                max={max}
                onChange={(date) => {
                  tab.value = date
                  tab.sndcaption = DateUtil.format(tab.value, type)
                  onChange && onChange(tabsRef.current)
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
