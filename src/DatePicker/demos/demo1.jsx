import React, { useState, useRef } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)
  const [icon, setIcon] = useState('1')
  const [rangeValue, setRangeValue] = useState([new Date('2009-09-09'), new Date('2019-09-09')])
  const [mulValue, setMulValue] = useState([
    { type: 'date', id: 'start', name: 'Start', value: new Date('2009-09-09') },
    { type: 'date', id: 'middle', name: 'Middle', value: new Date('2019-09-09') },
    { type: 'date', id: 'end', name: 'End', value: new Date('2023-09-09') }
  ])

  return (
    <>
      <DatePicker.Combo
        placeholder="Please select"
        type="datetime"
        value={value}
        multiple={true}
        onChange={setValue}
      />
      <DatePicker.MultipleCombo
        placeholder="Please select MultipleCombo"
        value={mulValue}
        multiple={true}
        onChange={setMulValue}
      />
      <DatePicker.RangeCombo
        ranges={null}
        className="border-b"
        placeholder="Please select RangeCombo"
        type="datetime"
        // min={new Date()}
        // max={new Date()}
        // maskClosable={false}
        onChange={setRangeValue}
        onError={(err) => console.log(err)}
        value={rangeValue}
      />
      <DatePicker.RangeCombo
        ranges={{
          ['最近30天']: [new Date().prevDate(30), new Date()],
          ['自定义时间']: null
        }}
        placeholder="请选择RangeCombo"
        ModalProps={{
          onVisibleChange: (visible) => {
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
      />
      <DatePicker.Types
        value={{
          type: 'date',
          id: 'date',
          name: '日',
          value: new Date()
        }}
        onChange={(...params) => console.log(...params)}
        // TabsProps={{ className: 'hide' }}
        contentProps={{ className: 'flex flex-right' }}
      />
    </>
  )
}
