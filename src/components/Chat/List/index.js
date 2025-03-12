import React, { Fragment, forwardRef, useRef, useImperativeHandle } from 'react'
import getSpaceDates from './getSpaceDates'
import Item from './../Item'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'seedsui-react'
测试使用-end */

// List
const List = (
  {
    // 时间间隔, 单位 ms, 默认1分钟
    timeSpace = 60000,
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
      content: '自定义内容',
      time: new Date()
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

  // 时间分栏
  let dates = []

  return (
    <div className="chat-list" ref={rootRef}>
      {list.map((item, index) => {
        let bar = null
        if (item.time) {
          let spaceDates = getSpaceDates(item.time, dates, timeSpace)
          dates = spaceDates.dates
          // 超过时间间隔，则显示时间分栏
          if (spaceDates.isOverTime) {
            bar = (
              <div className={`chat-divider-time`}>
                {DateUtil.format(item.time, 'YYYY-MM-DD hh:mm')}
              </div>
            )
          }
        }

        return (
          <Fragment key={index}>
            {bar}
            {getItemNode(item, index)}
          </Fragment>
        )
      })}
    </div>
  )
}

export default forwardRef(List)
