import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Checkbox from '../Checkbox'

// Checkbox-Group
const CheckboxGroup = forwardRef(
  (
    {
      icon,
      iconPosition = 'left',

      allowClear,
      multiple,
      value,
      list,

      readOnly,
      disabled,

      children,
      onChange,
      ...props
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => {
          return rootRef.current
        }
      }
    })

    return (
      <div
        {...props}
        disabled={disabled}
        readOnly={readOnly}
        className={`checkbox-group${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        {Array.isArray(list) && list.length
          ? list.map((item) => {
              if (!item?.id) return null
              return (
                <Checkbox
                  key={item.id}
                  icon={icon}
                  iconPosition={iconPosition}
                  checked={value?.findIndex?.((valueItem) => valueItem?.id === item.id) >= 0}
                  onChange={(checked) => {
                    let newValue = null
                    // 多选
                    if (multiple !== false) {
                      if (!checked) {
                        newValue = value.filter((valueItem) => valueItem?.id !== item.id)
                      } else {
                        newValue = [...(value || []), item]
                      }
                    }
                    // 单选
                    else {
                      if (!checked) {
                        allowClear ? (newValue = null) : (newValue = [item])
                      } else {
                        newValue = [item]
                      }
                    }
                    onChange && onChange(newValue)
                  }}
                >
                  {item.name || ''}
                </Checkbox>
              )
            })
          : null}
      </div>
    )
  }
)

export default CheckboxGroup
