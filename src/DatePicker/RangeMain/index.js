import React, { useEffect, useState } from 'react'
import defaultRanges from './defaultRanges'
import getActiveKey from './getActiveKey'
import validateBeforeChange from './validateBeforeChange'

import Selector from './../../Selector'
// 测试使用
// import Selector from 'seedsui-react/lib/Selector'
import CustomCombo from './CustomCombo'

// 日期快捷选择
export default function RangeMain({
  portal,
  // components props
  SelectorProps,
  DateProps,
  allowClear = 'exclusion-ricon',

  // Main: common
  value,
  onSelect,
  onBeforeChange,
  onChange,

  // Main: Picker Control properties
  defaultPickerValue,

  // Combo|Main: DatePicker Control properties
  titles,
  min,
  max,
  type = 'date', // year | quarter | month | date | time | datetime
  onError,
  ranges = defaultRanges
}) {
  // 自定义日期天数限制
  let daysLimit = null
  // 获取自定义项的key:
  let customKey = ''
  for (let key in ranges) {
    if (!Array.isArray(ranges[key])) {
      customKey = key
      daysLimit = ranges[key]
      break
    }
  }

  // 根据value获取选中项
  let [activeKey, setActiveKey] = useState('')

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
  async function handleClick(newActiveKey) {
    // 不允许清除
    if (!allowClear && !newActiveKey) {
      return
    }
    // 想要取消的选中项是自定义，则阻止此操作
    if (activeKey === customKey && !newActiveKey) {
      return
    }

    // 点击选项
    if (onSelect) {
      onSelect(ranges[newActiveKey], {
        ranges: ranges,
        activeKey: newActiveKey,
        setActiveKey: setActiveKey
      })
    }

    // 点击非自定义修改日期
    if (newActiveKey !== customKey) {
      handleChange(ranges[newActiveKey], newActiveKey)
    }
    // 点击自定义不修改日期
    else {
      activeKey = newActiveKey
      setActiveKey(newActiveKey)
    }
  }

  // 修改
  async function handleChange(newValue, newActiveKey) {
    if (!onChange) return
    // 修改提示
    let goOn = await validateBeforeChange(newValue, {
      type,
      min,
      max,
      onError,
      onBeforeChange,
      // RangeMain props
      ranges: ranges,
      activeKey: newActiveKey || activeKey,
      setActiveKey: setActiveKey
    })
    if (goOn === false) {
      return
    }
    // 修改值
    if (typeof goOn === 'object') {
      // eslint-disable-next-line
      newValue = goOn
    }

    // 修改选中项
    if (newActiveKey !== undefined) {
      activeKey = newActiveKey
      setActiveKey(newActiveKey)
    }

    onChange(newValue, {
      ranges: ranges,
      activeKey: activeKey,
      setActiveKey: setActiveKey
    })
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
          portal={portal}
          type={type}
          allowClear={allowClear}
          value={value}
          defaultPickerValue={defaultPickerValue}
          onChange={handleChange}
          onError={onError}
        />
      )}
    </>
  )
}
