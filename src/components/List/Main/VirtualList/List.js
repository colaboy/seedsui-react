import React, { forwardRef } from 'react'
import { Virtuoso } from 'react-virtuoso'

// 普通列表
const List = forwardRef(({ list, itemContent, Scroller }, ref) => {
  return (
    <Virtuoso
      ref={ref}
      style={{ height: 400 }}
      data={list}
      itemContent={(_, item) => itemContent && itemContent(item)}
      components={{
        // 指定自定义滚动容器
        Scroller: Scroller
      }}
    />
  )
})

export default List
