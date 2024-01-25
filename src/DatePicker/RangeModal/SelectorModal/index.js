import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import Modal from './../../../Modal'
import Selector from './../../../Selector'

// 测试使用
// import Modal from 'seedsui-react/lib/Modal'
import getCustomKey from './../../RangeMain/getCustomKey'
import RangeMain from './../../RangeMain'
import PickerModal from './../PickerModal'

// 快捷选择
const SelectorModal = function (
  {
    portal,
    // Combo
    getComboDOM,
    // Modal: display properties
    captionProps,
    submitProps,
    cancelProps,
    maskClosable,
    visible,
    onVisibleChange,

    // Main: common
    value,
    allowClear,
    onBeforeChange,
    onChange,

    // Main: Picker Control properties
    defaultPickerValue,

    // Combo|Main: DatePicker Control properties
    titles,
    titleFormatter,
    min,
    max,
    type,
    onError,
    ranges,
    modal,
    ...props
  },
  ref
) {
  // 获取自定义项的key，不是数组则为自定义项:
  let customKey = getCustomKey(ranges)

  // 区间弹窗选择
  const rangeMainRef = useRef(null)

  // 选中的key
  const activeKeyRef = useRef(null)

  // Picker选择控件
  let [pickerVisible, setPickerVisible] = useState(false)

  // 弹窗显示
  let ModaNode = Modal
  let modalProps = {
    sourceDOM: () => {
      let comboDOM = null
      if (typeof getComboDOM === 'function') {
        comboDOM = getComboDOM()
        if (typeof comboDOM?.getRootDOM === 'function') {
          comboDOM = comboDOM.getRootDOM()
        }
      }
      return comboDOM
    },
    animation: 'slideDown',
    className: 'datepicker-rangemodal-modal datepicker-rangemodal-modal-dropdown'
  }
  if (modal === 'picker') {
    ModaNode = Modal.Picker
    modalProps = {
      className: 'datepicker-rangemodal-modal datepicker-rangemodal-modal-picker'
    }
  }

  useImperativeHandle(ref, () => {
    return {
      // 获取选中项
      getActiveKey: () => {
        return activeKeyRef.current
      }
    }
  })

  // Filter custom range of ranges
  function filterCustomRange(ranges) {
    let newRanges = {}
    for (let n in ranges) {
      let range = ranges[n]
      if (Array.isArray(range)) {
        newRanges[n] = ranges[n]
      }
    }
    return newRanges
  }

  return (
    <>
      {/* 快捷选择 */}
      <ModaNode
        portal={portal}
        maskClosable={maskClosable}
        visible={visible}
        onVisibleChange={onVisibleChange}
        {...modalProps}
        {...props}
      >
        <div className="datepicker-rangemodal-main">
          <RangeMain
            ref={rangeMainRef}
            portal={portal}
            titles={titles}
            ranges={filterCustomRange(ranges)}
            value={value}
            allowClear={allowClear}
            type={type}
            min={min}
            max={max}
            onError={onError}
            onBeforeChange={onBeforeChange}
            onChange={(newValue, { activeKey }) => {
              activeKeyRef.current = activeKey

              // eslint-disable-next-line
              return new Promise(async (resolve) => {
                if (onChange) {
                  let goOn = await onChange(newValue)
                  resolve(goOn)
                  if (goOn === false) return
                }
                onVisibleChange && onVisibleChange(false)
              })
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
                value={null}
                list={[{ id: customKey, name: customKey }]}
                onChange={() => {
                  onVisibleChange && onVisibleChange(false)
                  setPickerVisible(true)
                }}
              />
            </>
          )}
        </div>
      </ModaNode>

      {/* 选择区间 */}
      <PickerModal
        captionProps={captionProps}
        submitProps={submitProps}
        cancelProps={cancelProps}
        portal={portal}
        value={value}
        defaultPickerValue={defaultPickerValue}
        type={type}
        onChange={(...params) => {
          // 选中自定义字段
          activeKeyRef.current = customKey
          // 重置快捷选择框内的选中项，使其显示时重新计算选中项
          rangeMainRef?.current?.setActiveKey?.(null)
          onChange && onChange(...params)
        }}
        visible={pickerVisible}
        onVisibleChange={setPickerVisible}
        {...props}
      />
    </>
  )
}

export default forwardRef(SelectorModal)
