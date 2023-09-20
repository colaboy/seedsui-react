import React, { useState, useRef } from 'react'
import { Select } from 'seedsui-react'
import CustomMain from './CustomMain'

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
        MainComponent={CustomMain}
        ModalProps={{ style: { height: '200px' } }}
        captionProps={{
          caption: '打回原因'
        }}
        allowClear="exclusion-ricon"
        riconProps={{
          className: 'icon shape-arrow-right sm'
        }}
        placeholder="自定义主体"
      />

      <Select.Combo
        ref={selectRef}
        // autoSize
        // disabled="exclusion-ricon"
        // animation="zoom"
        // 自定义主体
        MainComponent={CustomMain}
        ModalProps={{ style: { height: '200px' } }}
        listExtraHeaderRender={() => {
          return <p>列表头部扩展</p>
        }}
        allowClear="exclusion-ricon"
        multiple={true}
        riconProps={{
          className: 'icon shape-arrow-right sm'
        }}
        placeholder="Please select"
        value={value}
        list={[
          {
            id: '选项1',
            name: '选项1'
          },
          {
            id: '选项2',
            name: '选项2'
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
            id: '1',
            name: '选项1'
          },
          {
            id: '2',
            name: '选项2'
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
          }
        ]}
        // multiple={false}
        onChange={(newValue) => {
          console.log('onChange:', newValue)
          setValue(newValue)
        }}
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
        checkedType="checkbox"
        checkedPosition="right"
      />
    </>
  )
}
