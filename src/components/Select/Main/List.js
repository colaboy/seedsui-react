import React, { Fragment } from 'react'
import isChecked from './isChecked'
import addItem from './addItem'

import Item from './Item'

// List
const List = ({
  value,
  list,
  multiple,
  onBeforeChange,
  onChange,
  // 选中效果: checkbox | tick | corner
  checkedType = 'checkbox',
  // 选中位置: left | right
  checkedPosition = 'right',
  checkable,
  itemProps
}) => {
  // 获取单项
  function getItem(item, index) {
    return (
      <Item
        key={item.id ?? index}
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
  }

  return (
    <>
      {list.map((item, index) => {
        // 子子元素
        if (Array.isArray(item.children)) {
          return (
            <Fragment key={item.id ?? index}>
              <div className="select-group-headline">
                <div className="select-group-caption">{item.name}</div>
                {item.description && (
                  <div className="select-group-description">{item.description}</div>
                )}
              </div>
              <div className="select-group-options">
                {item.children.map((option, optionIndex) => {
                  return getItem(option, optionIndex)
                })}
              </div>
            </Fragment>
          )
        }
        // 子元素
        return getItem(item, index)
      })}
    </>
  )
}

export default List
