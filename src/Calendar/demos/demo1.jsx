import React, { useRef, useState } from 'react'

// 内库使用
import { Layout, Calendar } from 'seedsui-react'
import DateUtil from '../../DateUtil'

// 测试使用
// import Calendar from 'library/components/Calendar'
// import { Layout, DateUtil } from 'seedsui-react'

const selectionMode = 'range' // range
const weekStart = 'Monday' // Monday

export default () => {
  const calendarRef = useRef(null)
  const [data, setData] = useState([])
  const [value, setValue] = useState()

  function handleChange(newValue) {
    console.log('修改', newValue)
    // 设置一周的数据
    // if (Array.isArray(newValue) && newValue.length === 2) {
    //   let weekDates = Calendar.getWeekDates(newValue[0], weekStart)
    //   if (Calendar.isDisabledDate(weekDates[0], { min: new Date() })) {
    //     console.log('禁止访问' + DateUtil.format(weekDates[0], 'YYYY年MM月DD日') + '前的日期')
    //     return
    //   }
    //   // eslint-disable-next-line
    //   newValue = [weekDates[0], weekDates[6]]
    // }
    setValue(newValue)
  }

  return (
    <Layout className="full">
      <Layout.Main
        onTopRefresh={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true)
            }, 2000)
          })
        }}
      >
        <Calendar
          type="week"
          // min={new Date()}
          // max={new Date('2024-12-17')}
          ref={calendarRef}
          weekStart={weekStart}
          // selectionMode={selectionMode}
          value={value}
          // titleFormatter="YYYY-MM-DD W周"
          titleFormatter={(date, info) => {
            // if (Array.isArray(value) && value.length === 2) {
            //   return DateUtil.format(value[0], 'YYYY-W周')
            // }
            if (info.type === 'month') {
              return DateUtil.format(date, 'YYYY年MM月')
            }
            return DateUtil.format(date, `YYYY年MM月DD日 d 第W周`)
          }}
          dateRender={(date) => {
            return (
              <div className="calendar-date-num">
                {date.getDate()}
                {data[DateUtil.format(date, 'YYYY-MM-DD')] ? 'M' : ''}
              </div>
            )
          }}
          onChange={handleChange}
          onSlideChange={(drawDate, { action, type, monthDates }) => {
            console.log('视图变化:', action, type)
            setData({ '2024-04-10': '1' })
          }}
          onLoad={(drawDate, { action, type, monthDates }) => {
            console.log('日历初始化', action, type)
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
      </Layout.Main>
    </Layout>
  )
}
