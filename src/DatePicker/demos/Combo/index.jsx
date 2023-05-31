import React, { useState } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)

  return (
    <>
      <DatePicker.Combo
        placeholder="Please select"
        defaultPickerValue={new Date('2022-08-22 00:00')}
        type="datetime"
        value={value}
        multiple={true}
        onChange={setValue}
        // captionProps={{
        //   caption: '选择日期'
        // }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
      />
    </>
  )
}
