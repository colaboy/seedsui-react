import React, { forwardRef, useRef } from 'react'

const ListItem = forwardRef(
  (
    {
      optionProps,
      // 选中列表
      list,
      value,
      // 修改
      onSelect,
      ...props
    },
    ref
  ) => {
    return (
      <div
        {...props}
        className={`picker-main cascader${props?.className ? ' ' + props.className : ''}`}
        ref={ref}
      >
        {Array.isArray(list) &&
          list.map((item, index) => {
            return (
              <div
                key={index}
                {...optionProps}
                className={`cascader-modal-option${
                  optionProps.className ? ' ' + optionProps.className : ''
                }${
                  value?.some((selected) => {
                    return selected.id === item.id
                  })
                    ? ' active'
                    : ''
                }`}
                data-index={index}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(item)
                }}
              >
                <p className="cascader-modal-option-caption">{item.name}</p>
                <i className="cascader-modal-option-icon"></i>
              </div>
            )
          })}
      </div>
    )
  }
)

export default ListItem
