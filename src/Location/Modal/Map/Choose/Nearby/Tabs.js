import React from 'react'
import Tabs from './../../../../../Tabs'

// 选项卡
function TabsComponent({ tab, onChange }) {
  return (
    <Tabs
      value={tab}
      onChange={onChange}
      list={[
        {
          name: '全部'
        },
        {
          name: '吃喝'
        },
        {
          name: '生活'
        },
        {
          name: '娱乐'
        },
        {
          name: '景点'
        },
        {
          name: '出行'
        },
        {
          name: '购物'
        },
        {
          name: '住宿'
        }
      ]}
      className="tabs-rect map-nearby-tabs"
    />
  )
}
export default TabsComponent
