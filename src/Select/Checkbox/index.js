import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Checkbox from './../../Checkbox'

const CheckboxGroup = forwardRef(
  (
    {
      // common
      value,
      list,
      multiple,
      onBeforeChange,
      onChange,

      // checkbox
      allowClear,

      // 过滤没有的的属性
      onVisibleChange,
      ...props
    },
    ref
  ) => {
    // 过滤非法数据
    // eslint-disable-next-line
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
      let newValue = []
      if (!multiple) {
        // 允许取消单选
        if (!checked && allowClear && Array.isArray(value) && value.length === 1) {
          newValue = []
        } else {
          newValue = [currentItem]
        }
      } else {
        // eslint-disable-next-line
        if (!Array.isArray(value)) value = []
        if (checked) {
          newValue.push(...value, currentItem)
        } else {
          newValue = value.filter((activeItem) => {
            if (equals(currentItem, activeItem)) return false
            return true
          })
        }
      }
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (goOn === false) return
      }
      if (onChange) onChange(newValue)
    }

    return (
      <div
        {...props}
        className={`select-checkbox-group${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        {list.map((item, index) => {
          return (
            <div className={`select-checkbox-item`} key={index}>
              <Checkbox
                type={`${!multiple ? 'radio' : 'checkbox'}`}
                disabled={props?.disabled}
                readOnly={props?.readOnly}
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
