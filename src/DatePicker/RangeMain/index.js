import React, { useEffect, useState } from 'react'
import locale from './../../locale'
import getActiveKey from './getActiveKey'

import Selector from './../../Selector'
import CustomCombo from './CustomCombo'

// 日期快捷选择
export default function RangeMain({
  portal,
  // components props
  selectorProps,
  dateProps,
  customProps,
  allowClear = 'exclusion-ricon',

  // Main properties
  ranges = {
    [locale('今日')]: [new Date(), new Date()],
    [locale('昨日')]: [new Date().prevDate(), new Date().prevDate()],
    [locale('近7日')]: [new Date().prevDate(6), new Date()],
    [locale('近30日')]: [new Date().prevDate(29), new Date()],
    [locale('近90日')]: [new Date().prevDate(89), new Date()],
    [locale('本周')]: [new Date().monday(), new Date()],
    [locale('本月')]: [new Date().firstMonthDate(), new Date()],
    [locale('上月')]: [
      new Date().prevMonth().firstMonthDate(),
      new Date().prevMonth().lastMonthDate()
    ],
    [locale('本季度')]: [new Date().firstQuarterDate(), new Date()],
    [locale('今年')]: [new Date().firstYearDate(), new Date().lastYearDate()],
    [locale('自定义')]: 0
  },
  type = 'date',
  value,
  defaultPickerValue,
  onChange,
  onSelect
}) {
  // 获取自定义项的key:
  let customKey = ''
  for (let key in ranges) {
    if (!Array.isArray(ranges[key])) {
      customKey = key
      break
    }
  }

  // 根据value获取选中项
  const [activeKey, setActiveKey] = useState('')

  useEffect(() => {
    // 选中项为空
    if (Object.isEmptyObject(value)) {
      setActiveKey('')
      return
    }

    // 如果选中是自定义，则优先使用自定义字段
    if (activeKey === customKey) {
      return
    }

    // 如果选中项有多项，则优先使用当前选中项
    let newActiveKey = getActiveKey(value, ranges, { currentActiveKey: activeKey })

    // 初始未点击任何按钮，选中列表中对应项或者自定义
    if (!activeKey) {
      setActiveKey(newActiveKey || customKey)
    }
    // 找到选中项时设置选中项
    else if (newActiveKey && newActiveKey === activeKey) {
      setActiveKey(newActiveKey)
    }
    // 找不到选中项，则选中自定义
    else {
      setActiveKey(customKey)
    }
    // eslint-disable-next-line
  }, [value])

  // 点击快捷选择
  async function handleClick(rangeKey) {
    setActiveKey(rangeKey)

    // 点击选项
    if (onSelect)
      onSelect(ranges[rangeKey], {
        ranges: ranges,
        activeKey: rangeKey,
        setActiveKey: setActiveKey
      })
    // 自定义不修改日期
    if (rangeKey === customKey) {
      return
    }
    if (onChange) onChange(ranges[rangeKey])
  }

  // 将{key: value}转为[{id: key, name: value}]
  function getSelectorOptions() {
    return Object.entries(ranges).map(([name, value]) => ({ id: name, name: name, value: value }))
  }

  return (
    <>
      {/* 快捷选择 */}
      <Selector
        columns={3}
        {...selectorProps}
        value={[{ id: activeKey }]}
        list={getSelectorOptions()}
        onChange={(value) => {
          // 点击选中项清空
          if (activeKey === value?.[0]?.id) {
            handleClick('')
            return
          }
          // 点击非选中项
          if (value?.[0]?.id) {
            handleClick(value?.[0]?.id)
          } else {
            handleClick('')
          }
        }}
      />

      {/* 自定义区间: 文本框选择 */}
      {activeKey === customKey && (
        <CustomCombo
          dateProps={dateProps}
          customProps={customProps}
          allowClear={allowClear}
          portal={portal}
          type={type}
          value={value}
          defaultPickerValue={defaultPickerValue}
          onChange={onChange}
        />
      )}
    </>
  )
}
