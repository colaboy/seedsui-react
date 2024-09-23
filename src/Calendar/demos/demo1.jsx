import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'
import DateUtil from '../../DateUtil'
import { Calendar } from 'seedsui-react'
import weekOfYear from 'dayjs/plugin/weekOfYear'

// 加载插件
dayjs.extend(weekOfYear)

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
      {/* <Calendar
        titleFormatter={(date, info) => {
          if (info.type === 'month') {
            return date.format('YYYY年MM月')
          }
          return date.format('YYYY年MM月DD日 周EE 第W周')
        }}
        onLoad={(...params) => {
          console.log('加载', ...params)
        }}
      /> */}
      <Calendar
        // type="week"
        // min={new Date()}
        ref={calendarRef}
        weekStart="Monday"
        // selectionMode="range"
        value={value}
        titleFormatter={(date, info) => {
          if (info.type === 'month') {
            return DateUtil.formatDate(date, 'YYYY年MM月')
          }
          // debugger
          // DateUtil.formatDate(date, 'YYYY年MM月DD日 周d 第W周')
          let week = dayjs().week()
          return DateUtil.formatDate(date, `YYYY年MM月DD日 d 第${week}周`)
        }}
        dateRender={(date) => {
          return (
            <div className="calendar-date-num">
              {date.getDate()}
              {data[DateUtil.formatDate(date, 'YYYY-MM-DD')] ? 'M' : ''}
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
