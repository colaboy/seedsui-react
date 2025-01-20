import React, { useRef, useState } from 'react'
import treeData from './../simpleData.js'
// import treeData from './../data.js'
import { ArrayUtil, Input, TreePicker, Layout, LocaleUtil } from 'seedsui-react'

export default () => {
  const [data, setData] = useState(treeData)
  const [value, setValue] = useState([
    {
      name: '北京市',
      id: '110000',
      parentid: '-1'
    }
  ])

  // 搜索
  const treeRef = useRef(null)

  return (
    <Layout className="full">
      <Layout.Header>
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
      </Layout.Header>
      <Layout.Main>
        <TreePicker.Tree
          ref={treeRef}
          placeholder="Please select"
          value={value}
          list={data}
          multiple={true}
          // 仅允许选中末级
          // onlyLeafCheck={(item) => {
          //   if (item.id === '110106') return true
          //   return false
          // }}
          onlyLeafCheck={true}
          // 级联 true: 不级联, false: 级联, children: 子级不级联父级
          // checkStrictly={'children'}
          // 定义选中项回填的方式: leaf仅显示所有末级节点; parent仅显示父级节点
          showCheckedStrategy="leaf"
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
          loadData={(node) => {
            return new Promise((resolve) => {
              // 假设西城区有子节点
              if (node?.id !== '110102') {
                resolve(null)
                return
              }
              if (!node.children) {
                ArrayUtil.setDeepTreeNode(data, node.id, (item) => {
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
      </Layout.Main>
    </Layout>
  )
}
