import React, { forwardRef } from 'react'
import Checkbox from './../Checkbox'
import Radio from './../Radio'

const SelectGroup = forwardRef(
  (
    {
      checkboxGroupAttribute = {},
      // Input
      onClick,
      onChange,

      // Picker
      multiple = false,
      list = [], // [{id: '', name: ''}]
      selected,
      value,
      pickerProps = {},
      ...others
    },
    ref
  ) => {
    // 过滤非法数据
    list = list.filter((item) => {
      if (!item || !item.name) return false
      return true
    })

    // 构建选中项
    let selectedMap = {}
    function updateSelectedMap() {
      for (let item of list) {
        if (selected && selected.length) {
          // selected匹配选中项
          for (let selectedItem of selected) {
            if (
              (item.id !== undefined && item.id === selectedItem.id) ||
              item.name === selectedItem.name
            ) {
              selectedMap[item.id || item.name] = item
            }
          }
        } else if (value) {
          let selectedValues = [value]
          if (multiple) {
            selectedValues = value.split(pickerProps.split || ',')
          }
          // value匹配选中项
          if (selectedValues.indexOf(item.name) !== -1) {
            selectedMap[item.id || item.name] = item
          }
        }
      }
    }
    updateSelectedMap()
    // 判断是否选中
    function isSelected(currentItem) {
      if (selectedMap[currentItem.id || currentItem.name]) return true
      return false
    }
    // 点击事件
    function clickHandler(checked, item, index) {
      let e = {
        target: null
      }
      if (!others.readOnly) {
        // 非只读时才能修改选中值
        if (multiple) {
          // 多选
          if (selectedMap[item.id || item.name]) {
            delete selectedMap[item.id || item.name]
          } else {
            selectedMap[item.id || item.name] = item
          }
        } else {
          // 单选
          selectedMap = {
            [item.id || item.name]: item
          }
        }
      }
      // 构建value
      let value = []
      for (let selectedMapPropertyName in selectedMap) {
        value.push(selectedMap[selectedMapPropertyName].name)
      }
      value = value.join(pickerProps.split || ',')

      if (!others.readOnly && onChange) onChange(e, value, Object.values(selectedMap))
      if (onClick) onClick(e, value)
    }
    return (
      <div
        ref={ref}
        id={others.id ? others.id : ''}
        {...checkboxGroupAttribute}
        className={`inputselect-checkbox-group${others.className ? ' ' + others.className : ''}`}
      >
        {list.map((item, index) => {
          return (
            <div className={`inputselect-checkbox-item`} key={index}>
              {multiple && (
                <Checkbox
                  disabled={others.disabled}
                  captionProps={{ caption: item.name }}
                  checked={isSelected(item)}
                  onChange={(checked) => clickHandler(checked, item, index)}
                />
              )}
              {!multiple && (
                <Radio
                  disabled={others.disabled}
                  captionProps={{ caption: item.name }}
                  checked={isSelected(item)}
                  onChange={(checked) => clickHandler(checked, item, index)}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }
)

export default SelectGroup
