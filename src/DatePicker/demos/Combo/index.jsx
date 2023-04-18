import React, { useState } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)

  return (
    <>
      <DatePicker.Combo
        placeholder="Please select"
        type="datetime"
        value={value}
        multiple={true}
        onChange={setValue}
        // captionProps={{
        //   caption: '选择日期'
        // }}
        ModalProps={{
          onVisibleChange: (visible) => {
            console.log('visible:', visible)
          }
        }}
      />
    </>
  )
}
