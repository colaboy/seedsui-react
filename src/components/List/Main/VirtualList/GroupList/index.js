import React, { useMemo, forwardRef } from 'react'
import _ from 'lodash'
import { GroupedVirtuoso } from 'react-virtuoso'
import GroupTitle from './../../../GroupTitle'

// 分组列表
const GroupList = forwardRef(({ list, itemContent, Scroller }, ref) => {
  // 每组的数据个数
  const groupCounts = useMemo(() => {
    return list.map((item) => item.children.length)
  }, [])

  const items = useMemo(() => {
    return _.flatten(list.map((item) => item.children))
  }, [])

  console.log('groupCounts:', groupCounts)

  function groupContent(index) {
    console.log('groupContent:', index)
    return <div>Group {index}</div>
  }

  return (
    <GroupedVirtuoso
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
      onScroll={(e) => {
        e.stopPropagation()
      }}
    />
  )
})

export default GroupList
