import React, { useRef, useState, useEffect } from 'react'
import { Input, TreePicker, Badge, locale } from 'seedsui-react'
import treeData from './../data.js'

export default () => {
  const [badge, setBadge] = useState(null)
  const [value, setValue] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      setBadge({
        110000: 'asbc'
      })
    }, 2000)
  }, [])

  // 搜索
  const treeRef = useRef(null)

  return (
    <>
      <Input.Text
        type="search"
        placeholder={LocaleUtil.text('搜索', 'input_search_placeholder')}
        onChange={(keyword) => {
          if (window.timeout) window.clearTimeout(window.timeout)
          window.timeout = setTimeout(() => {
            treeRef.current.search(keyword)
          }, 500)
        }}
        className="treepicker-search-input"
        allowClear={true}
      />
      <TreePicker.Menu
        ref={treeRef}
        // style={{ backgroundColor: '#ccc' }}
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
