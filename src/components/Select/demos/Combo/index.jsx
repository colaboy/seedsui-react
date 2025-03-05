import React, { useState, useRef } from 'react'
import _ from 'lodash'
import { Select, Checkbox, Modal } from 'seedsui-react'

const list = [
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
  },
  {
    id: '17',
    name: '选项17'
  },
  {
    id: '18',
    name: '选项18'
  },
  {
    id: '19',
    name: '选项19'
  },
  {
    id: '20',
    name: '选项20'
  },
  {
    id: '21',
    name: '选项21'
  }
]

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
        modalProps={{
          title: '选择',
          header: () => {
            return <p>列表头部扩展</p>
          },
          footer: () => {
            return <p>列表底部扩展</p>
          },
          mainProps: {
            checkbox: function ({ checked }) {
              return <Checkbox checked={checked} />
            },
            checkboxPosition: 'right'
          }
        }}
        // autoSize
        // animation="zoom"
        allowClear
        clear={({ triggerClear }) => {
          return !_.isEmpty(value) ? (
            <i className="input-clear" onClick={triggerClear} />
          ) : (
            <i className="right-icon shape-arrow-right sm"></i>
          )
        }}
        multiple={'tags'}
        placeholder="Please select"
        value={value}
        list={list}
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
          return new Promise((resolve) => {
            Modal.confirm({
              title: '你确定要修改吗？',
              content: `你确定要修改吗`,
              onOk() {
                resolve(true)
              },
              onCancel() {
                resolve(false)
              }
            })
          })
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        // disabled
      />
    </>
  )
}
