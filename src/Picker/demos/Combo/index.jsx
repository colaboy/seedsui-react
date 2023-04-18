import React, { useState } from 'react'
import { Picker } from 'seedsui-react'

export default () => {
  const list = [
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ]
  const [value, setValue] = useState(null)
  return (
    <>
      <Picker.Combo
        allowClear
        // ModalProps={{
        //   captionProps: {
        //     caption: '标题'
        //   },
        //   cancelProps: {
        //     visible: false
        //   },
        //   submitProps: {
        //     visible: false
        //   }
        // }}
        placeholder="Please select"
        value={value}
        list={list}
        onChange={setValue}
        ModalProps={{
          onVisibleChange: (visible) => {
            console.log('visible:', visible)
          }
        }}
      />
    </>
  )
}
