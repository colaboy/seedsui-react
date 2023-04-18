import React, { useState } from 'react'
import { Actionsheet } from 'seedsui-react'

export default () => {
  const list = [
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ]
  const [value, setValue] = useState(null)
  return (
    <>
      <Actionsheet.Combo
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
