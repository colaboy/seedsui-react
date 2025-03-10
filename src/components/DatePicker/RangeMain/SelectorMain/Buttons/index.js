import React from 'react'
import getCustomRangeId from './../getCustomRangeId'
import getSelectorOptions from './getSelectorOptions'

// 内库使用-start
import Selector from './../../../../Selector'
// 内库使用-end

/* 测试使用-start
import { Selector } from 'seedsui-react'
测试使用-end */

// 日期快捷选择
function Buttons({
  // Main properties
  value,
  type,
  onChange,

  rangeId,
  ranges,
  titles,
  selectorProps,
  allowClear
}) {
  // 获取自定义项的key，不是数组则为自定义项:
  let customRangeId = getCustomRangeId(ranges)

  return (
    <>
      {/* 快捷选择: 标题 */}
      {typeof titles?.selector === 'string' ? (
        <p className="datepicker-selector-title">{titles.selector}</p>
      ) : null}

      {/* 快捷选择 */}
      <Selector
        columns={3}
        allowClear={allowClear}
        {...selectorProps}
        value={[{ id: rangeId }]}
        list={getSelectorOptions(ranges, (item) => {
          if (!titles?.custom) {
            return true
          }
          // 过滤自定义选择, 放置到下行
          return item.id !== customRangeId
        })}
        onChange={(newRange) => {
          let newRangeId = newRange?.[0]?.id || ''
          let newValue =
            newRangeId && Array.isArray(ranges[newRangeId]) && ranges[newRangeId].length === 2
              ? ranges[newRangeId]
              : value

          onChange &&
            onChange(newValue, {
              rangeId: newRangeId,
              ranges: ranges
            })
        }}
      />

      {/* 自定义选择独立一行显示 */}
      {customRangeId && titles?.custom && (
        <>
          {/* 标题 */}
          {typeof titles?.custom === 'string' ? (
            <p className="datepicker-selector-title">{titles.custom}</p>
          ) : null}
          {/* 按钮 */}
          <Selector
            columns={1}
            allowClear={allowClear}
            {...selectorProps}
            value={[{ id: rangeId }]}
            list={[{ id: customRangeId, name: customRangeId }]}
            onChange={(newRange) => {
              let newRangeId = newRange?.[0]?.id || ''
              let newValue =
                newRangeId && Array.isArray(ranges[newRangeId]) && ranges[newRangeId].length === 2
                  ? ranges[newRangeId]
                  : value

              onChange &&
                onChange(newValue, {
                  rangeId: newRangeId,
                  ranges: ranges
                })
            }}
          />
        </>
      )}
    </>
  )
}

export default Buttons
