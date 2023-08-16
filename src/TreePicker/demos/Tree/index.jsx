import React, { useEffect, useRef, useState } from 'react'
import treeData from './../simpleData.js'
// import treeData from './../data.js'
import { Input, TreePicker, HighlightKeyword, locale } from 'seedsui-react'

export default () => {
  const [data, setData] = useState(treeData)
  const [value, setValue] = useState([{ id: '11111', name: 'test' }])

  // 搜索
  const treeRef = useRef(null)

  return (
    <>
      <Input.Text
        type="search"
        placeholder={locale('搜索', 'input_search_placeholder')}
        onChange={(keyword) => {
          if (window.timeout) window.clearTimeout(window.timeout)
          window.timeout = setTimeout(() => {
            treeRef.current.search(keyword)
          }, 500)
        }}
        className="treepicker-search-input"
        allowClear={true}
      />
      <TreePicker.Tree
        ref={treeRef}
        placeholder="Please select"
        value={value}
        list={data}
        multiple={true}
        // 仅允许选中末级
        onlyLeafCheck
        // 不级联
        checkStrictly={'children'}
        // 保留不在树结构中的value
        preserveValue
        // 启用半选, 将会返回半选节点
        enableHalfChecked
        // checkable={false}
        // itemRender={(item, { keyword }) => {
        //   return (
        //     <div className="flex flex-middle">
        //       {item.isLeaf && (
        //         <img
        //           className="size36"
        //           src="https://image-test.waiqin365.com/imobii_portal/images/icon/default-face-small.png"
        //           alt=""
        //           style={{ borderRadius: '100%', marginRight: '4px' }}
        //         />
        //       )}
        //       <HighlightKeyword text={item.name} keyword={keyword} />
        //     </div>
        //   )
        // }}
        onChange={(newValue) => {
          console.log('checked:', newValue)
          setValue(newValue)
        }}
        onSelect={(item) => {
          console.log('select:', item)
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        loadData={(node) => {
          return new Promise((resolve) => {
            if (!node.children) {
              data.setDeepTreeNodeProp(node.id, (item) => {
                item.isLoaded = true
                item.children = [
                  {
                    isLoaded: true,
                    parentid: node.id,
                    id: '1',
                    name: '1111111'
                  }
                ]
              })

              console.log('展开')
              setData([...data])
            }

            resolve(null)
          })
        }}
      />
    </>
  )
}
