import React, { useRef, useState } from 'react'
import { Select } from 'seedsui-react'

export default () => {
  const selectRef = useRef(null)
  const [value, setValue] = useState([
    {
      id: '1',
      name: '选项1'
    }
  ])
  return (
    <>
      <Select.Main
        ref={selectRef}
        multiple={false}
        value={value}
        list={[
          {
            id: '1',
            name: '选项1'
          },
          {
            id: '2',
            name: '选项2'
          }
        ]}
        onChange={(newValue) => {
          console.log('onChange:', newValue)
          setValue(newValue)
        }}
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
      />
    </>
  )
}
