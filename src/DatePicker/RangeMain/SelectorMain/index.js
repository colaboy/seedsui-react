import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import _ from 'lodash'
import getCustomKey from './getCustomKey'
import getActiveOption from './getActiveOption'
import { validateRange } from './../../utils'

import Selector from './../../../Selector'
import CustomModal from './CustomModal'
// 测试使用
// import Selector from 'seedsui-react/lib/Selector'

// 日期快捷选择
function RangeMain(
  {
    portal,
    // components props
    SelectorProps,
    customDatePickerProps,
    allowClear,

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
    rangeLimit,
    type,
    onError,
    ranges,

    // Custom option config
    customModal = 'dates' // dates | picker
  },
  ref
) {
  // 获取自定义项的key，不是数组则为自定义项:
  let customKey = getCustomKey(ranges)

  // 根据value获取选中项
  let [activeKey, setActiveKey] = useState('')

  // 自定义选项弹窗
  let [customModalVisible, setCustomModalVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      // 获取选中项
      getActiveKey: () => {
        return activeKey
      },
      setActiveKey: (newActiveKey) => {
        setActiveKey(newActiveKey)
      }
    }
  })

  useEffect(() => {
    // 选中项为空
    if (_.isEmpty(value)) {
      if (activeKey !== customKey) {
        setActiveKey('')
      }
      return
    }

    // 如果选中项有多项，则优先使用当前选中项
    let newActive = getActiveOption(value, ranges, { currentActiveKey: activeKey })

    // 找到选中项
    if (newActive?.name) {
      setActiveKey(newActive.name)
    }
    // eslint-disable-next-line
  }, [value])

  // 修改
  async function handleChange(newValue, newActiveKey) {
    if (!onChange) return

    // eslint-disable-next-line
    if (newValue === undefined) newValue = null

    let goOn = await validateRange(newValue, {
      type,
      min,
      max,
      dateRangeLimit:
        typeof ranges[newActiveKey] === 'number' ? ranges[newActiveKey] : rangeLimit?.date,
      onError,
      onBeforeChange,
      ranges,
      activeKey: newActiveKey
    })
    if (goOn === false) return

    // 修改值
    if (Array.isArray(goOn) && goOn.length === 2) {
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
        activeKey: activeKey
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
          // 清空
          if (!newActiveKey) {
            handleChange(null, null)
            return
          }
          // 自定义
          if (newActiveKey === customKey) {
            setActiveKey(customKey)

            // 显示自定义弹窗
            customModal === 'picker' && setCustomModalVisible(true)
            return
          }
          // 其它快捷选择
          handleChange(ranges[newActiveKey], newActiveKey)
        }}
      />

      {/* 自定义选择独立一行显示 */}
      {customKey && titles?.custom && (
        <>
          {/* 标题 */}
          {typeof titles?.custom === 'string' ? (
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
              } else {
                // 显示自定义弹窗
                customModal === 'picker' && setCustomModalVisible(true)
              }
            }}
          />
        </>
      )}

      {/* 自定义区间: 文本框选择 */}
      {customKey && activeKey === customKey && (
        <CustomModal
          // customModal为picker时，需要控制显隐
          visible={customModalVisible}
          onVisibleChange={(datePickerVisible, options) => {
            customDatePickerProps?.onVisibleChange?.(datePickerVisible, options)
            setCustomModalVisible(datePickerVisible)
          }}
          customModal={customModal}
          customDatePickerProps={customDatePickerProps}
          portal={portal}
          type={type}
          allowClear={allowClear}
          value={value}
          defaultPickerValue={defaultPickerValue}
          onBeforeChange={async (newValue) => {
            let goOn = await validateRange(newValue, {
              type,
              min,
              max,
              dateRangeLimit: ranges[customKey] || rangeLimit?.date,
              onError,
              onBeforeChange,
              activeKey: customKey,
              ranges
            })
            return goOn
          }}
          onChange={(newValue) => {
            onChange &&
              onChange(newValue, {
                ranges: ranges,
                activeKey: customKey
              })
          }}
          onError={onError}
        />
      )}
    </>
  )
}

export default forwardRef(RangeMain)
