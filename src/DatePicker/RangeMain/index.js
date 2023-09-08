import React, { useEffect, useState } from 'react'
import defaultRanges from './defaultRanges'
import getActiveKey from './getActiveKey'

import Selector from './../../Selector'
import CustomCombo from './CustomCombo'

// 日期快捷选择
export default function RangeMain({
  portal,
  // components props
  SelectorProps,
  DateProps,
  allowClear = 'exclusion-ricon',

  // Main properties
  titles,
  ranges = defaultRanges,
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
    // 点击选项
    if (onSelect) {
      onSelect(ranges[rangeKey], {
        ranges: ranges,
        activeKey: rangeKey,
        setActiveKey: setActiveKey
      })
    }

    // 自定义不修改日期
    if (rangeKey !== customKey) {
      if (onChange) {
        let goOn = await onChange(ranges[rangeKey])
        if (goOn === false) return
      }
    }

    setActiveKey(rangeKey)
  }

  // 将{key: value}转为[{id: key, name: value}]
  function getSelectorOptions() {
    let options = Object.entries(ranges).map(([name, value]) => {
      return { id: name, name: name, value: value }
    })
    // 独立显示自定义字段, 过滤到选项中
    if (titles?.custom) {
      options = options.filter((item) => {
        return item.id !== customKey
      })
    }
    return options
  }

  return (
    <>
      {/* 快捷选择: 标题 */}
      {typeof titles?.selector === 'string' ? (
        <p className="datepicker-selector-caption">{titles.selector}</p>
      ) : null}

      {/* 快捷选择 */}
      <Selector
        columns={3}
        {...SelectorProps}
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

      {/* 自定义选择独立一行显示 */}
      {titles?.custom && (
        <>
          {/* 标题 */}
          {typeof titles.custom === 'string' ? (
            <p className="datepicker-selector-caption">{titles.custom}</p>
          ) : null}
          {/* 按钮 */}
          <Selector
            columns={1}
            value={[{ id: activeKey }]}
            list={[{ id: customKey, name: customKey }]}
            onChange={() => {
              handleClick(customKey)
            }}
          />
        </>
      )}

      {/* 自定义区间: 文本框选择 */}
      {activeKey === customKey && (
        <CustomCombo
          DateProps={DateProps}
          allowClear={allowClear}
          portal={portal}
          type={type}
          value={value}
          defaultPickerValue={defaultPickerValue}
          onChange={(newValue) => {
            onChange && onChange(newValue)
          }}
        />
      )}
    </>
  )
}
