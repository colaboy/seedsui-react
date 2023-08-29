import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { formatList } from './../utils'
import isChecked from './isChecked'
import addItem from './addItem'

import NoData from './../../NoData'
import Item from './Item'

// Main
const Main = forwardRef(
  (
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

      // Main: render
      checkedType = 'checkbox', // 选中效果: checkbox | tick | corner
      checkedPosition = 'right', // 选中位置: left | right
      checkable,
      headerRender,
      footerRender,
      listRender,
      listHeaderRender,
      listFooterRender,
      listExtraHeaderRender,
      listExtraFooterRender,
      itemRender,
      itemContentRender,
      itemProps,
      checkboxProps,

      ...props
    },
    ref
  ) => {
    // 过滤非法数据
    // eslint-disable-next-line
    list = formatList(list)

    // 节点
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current
      }
    })

    return (
      <div {...props} className="select-modal-wrapper" ref={mainRef}>
        {Object.isEmptyObject(list) && <NoData />}
        {list.map((item, index) => {
          return (
            <Item
              key={index}
              item={item}
              index={index}
              // 选中效果: checkbox | tick | corner
              checkedType={checkedType}
              // 选中位置: left | right
              checkedPosition={checkedPosition}
              {...itemProps}
              disabled={item.disabled}
              checked={isChecked(item, value)}
              checkable={checkable}
              onClick={async (e) => {
                let newValue = addItem(item, value, multiple)
                if (typeof onBeforeChange === 'function') {
                  let goOn = await onBeforeChange(newValue)
                  if (goOn === false) return
                }
                onChange && onChange(newValue)
              }}
            />
          )
        })}
      </div>
    )
  }
)

export default Main
