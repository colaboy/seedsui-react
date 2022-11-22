import React, { useRef, useState } from 'react'
import { Calendar } from 'seedsui-react'

export default () => {
  const calendarRef = useRef(null)
  const [value, setValue] = useState(new Date())

  function handleRenderCellDOM(date) {
    return `<div><p>${date.getDate()}</p></div>`
  }
  function handleChange(newValue) {
    console.log('修改', newValue)
    setValue(newValue)
  }
  function handleError(err) {
    console.log(err.errMsg)
  }
  function showMonth() {
    calendarRef.current.showMonth()
    // let instance = calendarRef?.current?.getInstance()
    // instance.showMonth()
  }
  function showWeek() {
    calendarRef.current.showWeek()
    // let instance = calendarRef?.current?.getInstance()
    // instance.showWeek()
  }
  function showToday() {
    calendarRef.current.jumpTo('today')
    // let instance = calendarRef?.current?.getInstance()
    // instance.setDate(new Date())
  }
  function showReset() {
    calendarRef.current.jumpTo('default')
    // let instance = calendarRef?.current?.getInstance()
    // instance.setDefaultDate()
  }
  function showCustom() {
    calendarRef.current.jumpTo(new Date('1988,08,22'))
    // let instance = calendarRef?.current?.getInstance()
    // instance.setDate(new Date('1988,08,22'))
  }
  function handleNext() {
    let instance = calendarRef?.current?.getInstance()
    if (instance) {
      instance.slideXToNext()
    }
  }
  function handlePrev() {
    let instance = calendarRef?.current?.getInstance()
    if (instance) {
      instance.slideXToPrev()
    }
  }
  return (
    <>
      <Calendar
        cellHeight={40}
        type="week"
        ref={calendarRef}
        value={value}
        titleFormat="YYYY年MM月DD日 周EE 第W周"
        prevHTML="<" // 左箭头
        nextHTML=">" // 右箭头
        renderCellDOM={handleRenderCellDOM}
        onChange={handleChange}
        onError={handleError}
        min={new Date()} // 禁用今天以前的日期
        // max={new Date('2022,06,27')} // 禁用今天以前的日期
      />
      <a style={{ margin: '8px' }} className="button lg bg-1" onClick={showMonth}>
        月
      </a>
      <a style={{ margin: '8px' }} className="button lg bg-2" onClick={showWeek}>
        周
      </a>
      <a style={{ margin: '8px' }} className="button lg bg-3" onClick={showToday}>
        今天
      </a>
      <a style={{ margin: '8px' }} className="button lg bg-4" onClick={showReset}>
        默认日期
      </a>
      <a style={{ margin: '8px' }} className="button lg bg-4" onClick={showCustom}>
        1988-08-22
      </a>
      <a style={{ margin: '8px' }} className="button lg bg-4" onClick={handlePrev}>
        上一页
      </a>
      <a style={{ margin: '8px' }} className="button lg bg-4" onClick={handleNext}>
        下一页
      </a>
    </>
  )
}
