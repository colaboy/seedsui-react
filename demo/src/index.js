import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapUtil,
  Button,
  InputDate,
  DatePopover
} from '../../src'

import zhCN from '../../src/locale/zh_CN'
import enUS from '../../src/locale/en_US'
import Context from '../../src/Context'
import helper from '../../src/DatePopover/helper'

function Demo() {
  
const [locale, setLocale] = useState(enUS)

function handleZh () {
  setLocale(zhCN)
}
function handleEn () {
  setLocale(enUS)
}



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
  return (
    <Page>
      <Header>
        <Titlebar caption="标题" />
      </Header>
      <Container>
        <input type="button" value="英文" onClick={handleEn}/>
        <input type="button" value="中文" onClick={handleZh}/>
        <Context
          portal={document.getElementById('demo')}
          locale={locale}
        >
          <InputDate/>
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
        </Context>
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
