import React, { forwardRef } from 'react'
// 测试使用
// import { Notice } from 'seedsui-react'
// 内库使用
import Notice from './../../Notice'

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
        className={`picker-main${props?.className ? ' ' + props.className : ''}`}
        ref={ref}
      >
        {typeof list === 'string' && <Notice caption={list} />}
        {Array.isArray(list) &&
          list.map((item, index) => {
            return (
              <div
                key={index}
                {...optionProps}
                className={`cascader-option${
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
                <p className="cascader-option-caption">{item.name}</p>
                <i className="cascader-option-icon"></i>
              </div>
            )
          })}
      </div>
    )
  }
)

export default ListItem
