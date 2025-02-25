import React, { useMemo, forwardRef } from 'react'
import { GroupedVirtuoso } from 'react-virtuoso'
import getItemIndex from './getItemIndex'
import GroupTitle from './../../../GroupTitle'

// 分组列表
const GroupList = forwardRef(({ list, itemContent, Scroller }, ref) => {
  // 每组的数据个数
  const groupCounts = useMemo(() => {
    return list.map((item) => item.children.length)
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
      itemContent={(index, groupIndex) => {
        let item = list[groupIndex].children[index]
        let itemIndex = getItemIndex(groupCounts, groupIndex, index)
        return itemContent(itemIndex, item)
      }}
    />
  )
})

export default GroupList
