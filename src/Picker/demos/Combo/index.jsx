import React, { useEffect, useRef, useState } from 'react'
import { Picker } from 'seedsui-react'

export default () => {
  const pickerRef = useRef(null)
  const list = [
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ]
  const [value, setValue] = useState([{ id: '1', name: '1' }])
  useEffect(() => {
    console.log('pickerRef:', pickerRef)
    setTimeout(() => {
      setValue([{ id: '2', name: '2' }])
    }, 5000)
  }, [])
  return (
    <>
      <Picker.Combo
        ref={pickerRef}
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
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
      />
    </>
  )
}
