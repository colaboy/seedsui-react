import React, { useEffect, useRef, useState } from 'react'
import { DatePicker } from 'seedsui-react'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(isoWeek)
dayjs.extend(advancedFormat)

export default () => {
  const date1Ref = useRef(null)
  const date2Ref = useRef(null)
  const [value, setValue] = useState(null)

  useEffect(() => {
    date1Ref.current.open()
  }, [])

  return (
    <>
      <DatePicker.WeekCombo
        ref={date1Ref}
        className="border-b"
        placeholder="Please select WeekCombo"
        type="datetime"
        allowClear
        // min={new Date()}
        // max={new Date()}
        // maskClosable={false}
        onBeforeOpen={() => {
          if (document.querySelector('.mask.active')) {
            date1Ref.current.close()
            date2Ref.current.close()
            return false
          }
          return true
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        modalProps={{
          maskProps: {
            style: {
              zIndex: 999
            }
          }
        }}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        value={value}
        defaultPickerValue={new Date('2022-08-22 00:00')}
      />
    </>
  )
}
