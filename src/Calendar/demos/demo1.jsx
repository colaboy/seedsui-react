import React, { useRef, useState } from 'react'
import { Calendar } from 'seedsui-react'

export default () => {
  const calendarRef = useRef(null)
  const [data, setData] = useState([])
  const [value, setValue] = useState(new Date())

  function handleChange(newValue) {
    console.log('修改', newValue)
    setValue(newValue)
  }

  return (
    <>
      <Calendar
        type="week"
        // min={new Date()}
        ref={calendarRef}
        value={value}
        titleFormatter={(date, info) => {
          if (info.type === 'month') {
            return date.format('YYYY年MM月')
          }
          return date.format('YYYY年MM月DD日 周EE 第W周')
        }}
        dateRender={(date) => {
          return (
            <div className="calendar-date-num">
              {date.getDate()}
              {data[date.format('YYYY-MM-DD')] ? 'M' : ''}
            </div>
          )
        }}
        onChange={handleChange}
        onSlideChange={(...params) => {
          console.log('视图变化', ...params)
          setData({ '2024-04-10': '1' })
        }}
        onLoad={(...params) => {
          console.log('加载', ...params)
        }}
      />
      <div
        onClick={() => {
          calendarRef.current.slidePrevious()
        }}
      >
        上一页
      </div>
      <div
        onClick={() => {
          calendarRef.current.slideNext()
        }}
      >
        下一页
      </div>
      <div
        onClick={() => {
          calendarRef.current.slideExpand()
        }}
      >
        展开
      </div>
      <div
        onClick={() => {
          calendarRef.current.slideCollapse()
        }}
      >
        收缩
      </div>
    </>
  )
}
