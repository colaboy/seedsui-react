import React, { useEffect, useRef, useState } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const date1Ref = useRef(null)
  const date2Ref = useRef(null)
  const [rangeValue, setRangeValue] = useState([new Date('2009-09-09'), new Date('2019-09-09')])
  const [icon, setIcon] = useState('1')

  useEffect(() => {
    // date2Ref.current.open()
  }, [])

  return (
    <>
      <DatePicker.RangeCombo
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
        ModalProps={{
          onVisibleChange: (visible) => {
            console.log('visible:', visible)
          }
        }}
        onChange={setRangeValue}
        onError={(err) => console.log(err)}
        value={rangeValue}
        captionProps={{
          caption: '选择日期'
        }}
      />
      <DatePicker.RangeCombo
        ref={date2Ref}
        // ranges={{
        //   ['最近30天']: [new Date().prevDate(29), new Date()],
        //   ['自定义时间']: null
        // }}
        placeholder="请选择RangeCombo"
        ModalProps={{
          onVisibleChange: (visible) => {
            console.log('visible2:', visible)
            if (visible) {
              setIcon('2')
            } else {
              setIcon('1')
            }
          }
        }}
        // 自定义渲染
        comboRender={(val, { displayValue }) => {
          return icon + (displayValue || '自定义区间')
        }}
        // maskClosable={false}
        value={rangeValue}
        onChange={(newRangeValue) => {
          console.log(newRangeValue)
          setRangeValue(newRangeValue)
        }}
        captionProps={{
          caption: '选择日期'
        }}
      />
    </>
  )
}
