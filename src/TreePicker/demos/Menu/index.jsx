import React, { useState, useEffect } from 'react'
import { TreePicker, Badge } from 'seedsui-react'
import treeData from './../data.js'

export default () => {
  const [badge, setBadge] = useState(null)
  const [value, setValue] = useState([{ name: '和平区', parentid: '120000', id: '120101' }])
  useEffect(() => {
    setTimeout(() => {
      setBadge({
        110000: 'asbc'
      })
    }, 2000)
  }, [])
  return (
    <>
      <TreePicker.Menu
        // searchProps={{
        //   value: '大东',
        //   visible: true
        // }}
        itemRender={(item, { keyword }) => {
          if (badge && badge[item.id]) {
            return (
              <div className="treepicker-menu-item-caption">
                {item.name}
                <Badge maxLength={3}>{badge[item.id]}</Badge>
              </div>
            )
          }
          return false
        }}
        value={value}
        multiple={true}
        list={treeData}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(newValue)
        }}
        onExpand={(newValue) => {
          console.log('onExpand:', newValue)
        }}
        onCollapse={(newValue) => {
          console.log('onCollapse:', newValue)
        }}
      />
    </>
  )
}
