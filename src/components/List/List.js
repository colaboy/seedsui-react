import React, { Fragment, forwardRef, useRef, useImperativeHandle } from 'react'

import Item from './Item'

// List
const List = (
  {
    allowClear,
    multiple,
    value,
    list,
    /*
    // Group
    {
      name: '',
      children: ...
    },
    // No Group
    {
      leftIcon: '',
      rightIcon: '',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '选项1',
      name: '选项1',
      description: '普通描述',
      content: '自定义内容',
      action: ''
    }
    */
    leftIcon,
    rightIcon,
    onChange
  },
  ref
) => {
  // Expose
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => {
        return rootRef.current
      }
    }
  })

  // 获取单项
  function getItemNode(item, index) {
    return (
      <Item
        key={item.id ?? index}
        disabled={item.disabled}
        leftIcon={leftIcon || item.leftIcon}
        rightIcon={rightIcon || item.rightIcon}
        avatar={item.avatar}
        title={item.name}
        description={item.description}
        content={item.content}
        action={item.action}
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
      />
    )
  }

  return (
    <div className="list" ref={rootRef}>
      {list.map((item, index) => {
        // 渲染分组列表
        if (Array.isArray(item.children)) {
          return (
            <Fragment key={item.id ?? index}>
              <div className="list-headline">
                <div className="list-title">{item.name}</div>
                {item.description && <div className="list-description">{item.description}</div>}
              </div>
              <div className="list-options">
                {item.children.map((option, optionIndex) => {
                  return getItemNode(option, optionIndex)
                })}
              </div>
            </Fragment>
          )
        }

        // 渲染列表
        return getItemNode(item, index)
      })}
    </div>
  )
}

export default forwardRef(List)
