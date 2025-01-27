import React, { forwardRef, useRef, useImperativeHandle } from 'react'

import Item from './../Item'

// List
const List = (
  {
    value,
    list,
    /*
    {
      checkbox: ({ checked }) => { return null },
      checkboxPosition: 'left',
      position: 'left',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '选项1',
      name: '选项1',
      content: '自定义内容'
    }
    */
    // Item 配置项
    checkbox,
    checkboxPosition,
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
        itemData={item}
        checkbox={item.checkbox || checkbox}
        checkboxPosition={item.checkboxPosition || checkboxPosition}
        position={item.position}
        avatar={item.avatar}
        author={item.name}
        content={item.content}
        checked={value?.findIndex?.((valueItem) => valueItem?.id === item.id) >= 0}
        onChange={(checked) => {
          let newValue = null
          if (!checked) {
            newValue = value.filter((valueItem) => valueItem?.id !== item.id)
          } else {
            newValue = [...(value || []), item]
          }
          onChange && onChange(newValue)
        }}
      />
    )
  }

  return (
    <div className="chat-list" ref={rootRef}>
      {list.map((item, index) => {
        return getItemNode(item, index)
      })}
    </div>
  )
}

export default forwardRef(List)
