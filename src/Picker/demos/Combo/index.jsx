import React, { useEffect, useRef, useState } from 'react'
import { Picker } from 'seedsui-react'

export default () => {
  const pickerRef = useRef(null)
  const list = [
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ]
  const [value, setValue] = useState(null)
  useEffect(() => {
    // pickerRef.current.open()
    setTimeout(() => {
      console.log('pickerRef:', pickerRef)
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
        onChange={(newValue) => {
          console.log('onChange:', newValue)
          setValue(newValue)
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
      />
    </>
  )
}
