import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import defaultRanges from './defaultRanges'
import getCustomKey from './getCustomKey'
import getActiveKey from './getActiveKey'
import validateValue from './validateValue'

import Selector from './../../Selector'
// 测试使用
// import Selector from 'seedsui-react/lib/Selector'
import CustomCombo from './CustomCombo'

// 日期快捷选择
function RangeMain(
  {
    portal,
    // components props
    SelectorProps,
    DateProps,
    allowClear = 'exclusion-ricon',

    // Main: common
    value,
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
  },
  ref
) {
  // 获取自定义项的key，不是数组则为自定义项:
  let customKey = getCustomKey(ranges)

  // 根据value获取选中项
  let [activeKey, setActiveKey] = useState('')

  useImperativeHandle(ref, () => {
    return {
      // rootDOM: mainRef.current,
      // getRootDOM: () => mainRef.current,
      // 获取选中项
      getActiveKey: () => {
        return activeKey
      }
    }
  })

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

    // 找到选中项
    if (newActiveKey) {
      setActiveKey(newActiveKey)
    }
    // 找不到选中项，则选中自定义
    else {
      setActiveKey(customKey)
    }
    // eslint-disable-next-line
  }, [value])

  // 修改
  async function handleChange(newValue, newActiveKey) {
    if (!onChange) return

    // eslint-disable-next-line
    if (newValue === undefined) newValue = null

    // 外部传入的校验
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(newValue, {
        ranges: ranges,
        activeKey: activeKey,
        setActiveKey: setActiveKey
      })
      if (goOn === false) {
        return
      }
    }

    // 值合法性校验
    let goOn = await validateValue(newValue, {
      type,
      min,
      max,
      // 只有自定义时间段才有天数校验
      daysLimit: typeof ranges[newActiveKey] === 'number' ? ranges[newActiveKey] : null,
      onError
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

    onChange &&
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
        allowClear={allowClear}
        {...SelectorProps}
        value={[{ id: activeKey }]}
        list={getSelectorOptions()}
        onChange={(newValue) => {
          let newActiveKey = newValue?.[0]?.id || ''
          handleChange(ranges[newActiveKey], newActiveKey)
        }}
      />

      {/* 自定义选择独立一行显示 */}
      {customKey && (
        <>
          {/* 标题 */}
          {typeof titles.custom === 'string' ? (
            <p className="datepicker-selector-caption">{titles.custom}</p>
          ) : null}
          {/* 按钮 */}
          <Selector
            columns={1}
            allowClear={allowClear}
            {...SelectorProps}
            value={[{ id: activeKey }]}
            list={[{ id: customKey, name: customKey }]}
            onChange={(newValue) => {
              // 点击自定义不调用onChange，只修改activeKey
              let newActiveKey = newValue?.[0]?.id || ''
              setActiveKey(newActiveKey)

              // 取消选择清空值
              if (!newActiveKey) {
                handleChange(ranges[newActiveKey], newActiveKey)
              }
            }}
          />

          {/* 自定义区间: 文本框选择 */}
          {activeKey === customKey && (
            <CustomCombo
              DateProps={DateProps}
              portal={portal}
              type={type}
              allowClear={allowClear}
              value={value}
              defaultPickerValue={defaultPickerValue}
              onChange={(newValue) => handleChange(newValue, customKey)}
              onError={onError}
            />
          )}
        </>
      )}
    </>
  )
}

export default forwardRef(RangeMain)
