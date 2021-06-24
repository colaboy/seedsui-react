import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapUtil,
  Timeline,
  Button,
  Actionsheet,
  DatePopover,
  DateType
} from '../../src'

import helper from '../../src/DatePopover/helper'

function Demo() {
  const [dateTypeValue, setDateTypeValue] = useState('')
  const [dateTypeIndex, setDateTypeIndex] = useState(0)
  function handleDateType(e, value, selected, index) {
    setDateTypeValue(value)
    setDateTypeIndex(index)
  }

  // 日期快捷选择弹窗
  const [dateDisplay, setDateDisplay] = useState(helper.getDateName('2020-01-01', '2020-01-08'))
  const [startDate, setStartDate] = useState('2020-01-01')
  const [endDate, setEndDate] = useState('2020-01-08')
  const [datePopoverShow, setDatePopoverShow] = useState(false)
  function handleDateChange(e, value, date) {
    console.log(e, value, date)
    setStartDate(date.startDate)
    setEndDate(date.endDate)
    setDateDisplay(value)
  }
  const [show, setShow] = useState(false)
  function handleChange(e, value, selected, index) {
    console.log(e, value, selected, index)
  }
  function onShow() {
    setShow(true)
  }
  function onHide() {
    setShow(false)
  }
  return (
    <Page>
      <Header>
        <Titlebar caption="标题" />
      </Header>
      <Container>
        <DateType
          // listVisible={false}
          list={[
            // { type: 'month', id: 'month', name: '月' },
            // { type: 'month', id: 'month', name: '月' },
            // { type: 'month', id: 'month', name: '月' },
            { type: 'month', id: 'month', name: '月' },
            { type: 'month', id: 'month', name: '月' }
          ]}
          value={dateTypeValue}
          activeIndex={dateTypeIndex}
          onChange={handleDateType}
        />

        <div className="example-title">日期快捷选择弹窗</div>
        <Button
          className="lg"
          style={{ margin: '0 12px' }}
          onClick={() => setDatePopoverShow(true)}
        >
          {dateDisplay}
        </Button>
        <DatePopover
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          show={datePopoverShow}
          onHide={() => setDatePopoverShow(false)}
          top={50}
        />
        <input type="button" value="显示" onClick={onShow} />
        <Actionsheet
          show={show}
          list={[{ name: '菜单1' }, { name: '菜单2' }]}
          onChange={handleChange}
          // cancelAttribute={{
          //   onClick: onHide
          // }}
          // maskAttribute={{
          //   onClick: onHide
          // }}
        />
      </Container>
    </Page>
  )
}

Bridge.ready(() => {
  // render(<Demo />, document.querySelector('#demo'))
  // 加载百度地图js库
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      render(<Demo />, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
})
