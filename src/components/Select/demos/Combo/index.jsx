import React, { useState, useRef } from 'react'
import { Select } from 'seedsui-react'

export default () => {
  const selectRef = useRef(null)
  const [value, setValue] = useState([
    {
      id: '选项1',
      name: '选项1'
    },
    {
      id: '选项2',
      name: '选项2'
    },
    {
      id: '分组-选项1',
      name: '分组-选项1'
    }
  ])
  return (
    <>
      <Select.Combo
        ref={selectRef}
        // autoSize
        // disabled="exclusion-ricon"
        // animation="zoom"
        // 自定义主体
        // MainComponent={CustomMain}
        riconProps={{
          className: 'icon shape-arrow-right sm'
        }}
        listExtraHeaderRender={() => {
          return <p>列表头部扩展</p>
        }}
        listExtraFooterRender={() => {
          return <p>列表底部扩展</p>
        }}
        allowClear="exclusion-ricon"
        // multiple={true}
        placeholder="Please select"
        value={value}
        list={[
          {
            avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
            id: '选项1',
            name: '选项1',
            description: '普通描述',
            content: '自定义内容'
          },
          {
            name: '这是分组的标题',
            // description: '分组描述',
            children: [
              {
                id: '分组-选项1',
                name: '分组-选项1',
                description: '分组内部描述'
              },
              {
                id: '分组-选项2',
                name: '分组-选项2'
              }
            ]
          },
          {
            id: '选项2',
            name: '选项2',
            content: '+86'
          },
          {
            id: '3',
            name: '选项5'
          },
          {
            id: '4',
            name: '选项5'
          },
          {
            id: '5',
            name: '选项5'
          },
          {
            id: '6',
            name: '选项6'
          },
          {
            id: '7',
            name: '选项7'
          },
          {
            id: '8',
            name: '选项8'
          },
          {
            id: '9',
            name: '选项9'
          },
          {
            id: '10',
            name: '选项10'
          },
          {
            id: '11',
            name: '选项11'
          },
          {
            id: '12',
            name: '选项12'
          },
          {
            id: '13',
            name: '选项13'
          },
          {
            id: '14',
            name: '选项14'
          },
          {
            id: '15',
            name: '选项15'
          },
          {
            id: '16',
            name: '选项16'
          }
        ]}
        multiple
        onChange={(newValue) => {
          console.log(selectRef)
          console.log('onChange:', newValue)
          setValue(newValue)
        }}
        // onSearch={({ keyword, list }) => {
        //   console.log('keyword:', keyword)
        //   return list
        // }}
        onBeforeChange={(newValue) => {
          console.log('修改前')
          // return new Promise((resolve) => {
          //   setTimeout(() => {
          //     resolve(true)
          //   }, 1000)
          // })
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        captionProps={{
          caption: '选择'
        }}
        // 搜索
        headerRender={() => {
          return (
            <input
              type="text"
              placeholder="搜索"
              onChange={(e) => {
                if (selectRef.current.rootDOM.timeout) {
                  window.clearTimeout(selectRef.current.rootDOM.timeout)
                }
                selectRef.current.rootDOM.timeout = window.setTimeout(() => {
                  selectRef?.current?.search && selectRef.current.search(e.target.value)
                }, 1000)
              }}
            />
          )
        }}
        // 选中效果: checkbox | tick | corner
        checkedType="tick"
        checkedPosition="left"
        // disabled
      >
        <span>
          {Array.isArray(value) && value.length ? value.map((item) => item.name).join(',') : ''}
        </span>
      </Select.Combo>
    </>
  )
}
