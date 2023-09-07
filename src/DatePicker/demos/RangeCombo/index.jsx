import React, { useEffect, useRef, useState } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const date1Ref = useRef(null)
  const date2Ref = useRef(null)
  const [rangeValue, setRangeValue] = useState()
  const [icon, setIcon] = useState('1')

  useEffect(() => {
    // date2Ref.current.open()
  }, [])

  return (
    <>
      {/* <DatePicker.RangeCombo
        ref={date1Ref}
        ranges={null}
        className="border-b"
        placeholder="Please select RangeCombo"
        type="datetime"
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
        ModalProps={{
          maskProps: {
            style: {
              zIndex: 999
            }
          }
        }}
        onChange={setRangeValue}
        onError={(err) => console.log(err)}
        value={rangeValue}
        defaultPickerValue={[new Date('2022-08-22 00:00'), new Date('2022-09-22 12:12')]}
        captionProps={{
          caption: '选择日期'
        }}
      /> */}
      <DatePicker.RangeCombo
        ref={date2Ref}
        // ranges={{
        //   ['最近30天']: [new Date().prevDate(29), new Date()],
        //   ['自定义时间']: null
        // }}
        // modal="picker"
        placeholder="请选择RangeCombo"
        onVisibleChange={(visible) => {
          console.log('visible2:', visible)
          if (visible) {
            setIcon('2')
          } else {
            setIcon('1')
          }
        }}
        ModalProps={{
          maskProps: {
            style: {
              zIndex: 999
            }
          }
        }}
        // 自定义渲染
        comboRender={({ displayValue }) => {
          return icon + (displayValue || '自定义区间')
        }}
        // maskClosable={false}
        value={rangeValue}
        defaultPickerValue={[new Date('2022-08-22 00:00'), new Date('2022-09-22 12:12')]}
        onChange={(newRangeValue) => {
          console.log(newRangeValue)
          setRangeValue(newRangeValue)
        }}
        onBeforeChange={(newValue) => {
          console.log('onBeforeChange:', newValue)
          return true
        }}
        captionProps={{
          caption: '选择日期'
        }}
      />
    </>
  )
}
