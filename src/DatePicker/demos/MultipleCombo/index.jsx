import React, { useState } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [mulValue, setMulValue] = useState([
    { type: 'date', id: 'start', name: 'Start', value: new Date('2009-09-09') },
    { type: 'date', id: 'middle', name: 'Middle', value: new Date('2019-09-09') },
    { type: 'date', id: 'end', name: 'End', value: new Date('2023-09-09') }
  ])

  return (
    <>
      <DatePicker.MultipleCombo
        placeholder="Please select MultipleCombo"
        value={mulValue}
        multiple={true}
        onChange={setMulValue}
        captionProps={{
          caption: '选择日期'
        }}
        ModalProps={{
          onVisibleChange: (visible) => {
            console.log('visible:', visible)
          }
        }}
      />
    </>
  )
}
