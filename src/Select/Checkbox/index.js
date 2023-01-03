import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Checkbox from './../../Checkbox'

const CheckboxGroup = forwardRef(
  (
    {
      multiple,
      // 单选是否允许取消选择
      allowClear,
      value,
      list,
      onBeforeChange,
      onChange,
      onVisibleChange, // checkbox没有此属性
      ...props
    },
    ref
  ) => {
    // 过滤非法数据
    list = list.filter((item) => {
      if (!item || (!item.id && !item.name)) return false
      return true
    })

    // 节点
    const rootRef = useRef(null)
    const instance = useRef({
      equalsItem: equals
    })
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    // 判断是否相同
    function equals(item1, item2) {
      if (item1.id && item2.id) {
        return item1.id === item2.id
      } else if (item1.name && item2.name) {
        return item1.name === item2.name
      } else {
        return false
      }
    }
    // 根据value判断此项是否为选中状态
    function getIsActive(item) {
      if (!Array.isArray(value) || !value.length) {
        return false
      }
      for (let activeItem of value) {
        if (equals(item, activeItem)) return true
        continue
      }
      return false
    }

    // 修改回调
    async function handleChange(checked, currentItem) {
      let newValue = null
      if (!multiple) {
        // 允许取消单选
        if (!checked && allowClear && Array.isArray(value) && value.length === 1) {
          newValue = []
        } else {
          newValue = [currentItem]
        }
      } else {
        newValue = Object.clone(value)
        if (checked) {
          newValue.push(currentItem)
        } else {
          newValue = newValue.filter((activeItem) => {
            if (equals(currentItem, activeItem)) return false
            return true
          })
        }
      }
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (!goOn) return
      }
      if (onChange) onChange(newValue)
    }

    return (
      <div
        ref={rootRef}
        {...props}
        className={`select-checkbox-group${props.className ? ' ' + props.className : ''}`}
      >
        {list.map((item, index) => {
          return (
            <div className={`select-checkbox-item`} key={index}>
              <Checkbox
                type={`${!multiple ? 'radio' : 'checkbox'}`}
                disabled={props.disabled}
                captionProps={{ caption: item.name }}
                checked={getIsActive(item)}
                onChange={(checked) => handleChange(checked, item, index)}
              />
            </div>
          )
        })}
      </div>
    )
  }
)

export default CheckboxGroup
