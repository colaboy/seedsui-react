import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import _ from 'lodash'
import getCustomKey from './getCustomKey'
import getActiveOption from './getActiveOption'

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
    allowClear,

    // Main: common
    value,
    onChange,

    // Combo|Main: DatePicker Control properties
    min,
    max,
    disabledStart,
    disabledEnd,
    type,
    ranges,
    titles,
    customModal = 'dates', // dates | picker
    DatePickerModalProps,
    ...props
  },
  ref
) {
  // 获取自定义项的key，不是数组则为自定义项:
  let customKey = getCustomKey(ranges)

  // 根据value获取选中项
  let [activeKey, setActiveKey] = useState('')

  // 自定义选项弹窗
  let [customModalVisible, setCustomModalVisible] = useState(false)

  const mainRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: mainRef.current,
      getRootDOM: () => mainRef.current,
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

    // 修改选中项
    if (newActiveKey !== undefined) {
      activeKey = newActiveKey
      setActiveKey(newActiveKey)
    }

    onChange &&
      onChange(newValue, {
        ranges: ranges,
        activeKey: activeKey,
        // 点击快捷选择直接关闭弹窗
        close: Array.isArray(ranges[newActiveKey]) ? true : null
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
    <div
      {...props}
      className={`datepicker-selector${props.className ? ' ' + props.className : ''}`}
      ref={mainRef}
    >
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
            setCustomModalVisible(datePickerVisible)
          }}
          customModal={customModal}
          DatePickerModalProps={DatePickerModalProps}
          portal={portal}
          type={type}
          allowClear={allowClear}
          value={value}
          // min={min}
          // max={max}
          disabledStart={disabledStart}
          disabledEnd={disabledEnd}
          onChange={(newValue) => {
            onChange &&
              onChange(newValue, {
                ranges: ranges,
                activeKey: customKey
              })
          }}
        />
      )}
    </div>
  )
}

export default forwardRef(RangeMain)
