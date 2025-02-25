import React, { useMemo, useRef, forwardRef } from 'react'
import _ from 'lodash'
import { GroupedVirtuoso } from 'react-virtuoso'
import GroupTitle from './../../../GroupTitle'

// 分组列表
const GroupList = forwardRef(({ list, itemContent, Scroller, Footer }, ref) => {
  const rootRef = useRef(null)

  // 每组的数据个数: [1000, 10, ...]
  const groupCounts = useMemo(() => {
    return list.map((item) => item.children.length)
  }, [])

  // 拉平所有children的数据
  const items = useMemo(() => {
    return _.flatten(list.map((item) => item.children))
  }, [])

  return (
    <GroupedVirtuoso
      ref={rootRef}
      style={{ flex: 1 }}
      groupCounts={groupCounts}
      groupContent={(groupIndex) => {
        let group = list[groupIndex]
        return (
          <GroupTitle
            anchor={group.anchor}
            title={group.name}
            description={group.description}
            elementProps={group.elementProps}
          />
        )
      }}
      itemContent={(index) => {
        let item = items[index]
        return itemContent(index, item)
      }}
      components={{
        Scroller: Scroller,
        Footer: Footer
      }}
    />
  )
})

export default GroupList
