import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapUtil,
  InputDate
} from '../../src'

import zhCN from '../../src/locale/zh_CN'
import enUS from '../../src/locale/en_US'
import Context from '../../src/Context'

function Demo() {
  const [locale, setLocale] = useState(zhCN)
  const [language, setLanguage] = useState('zh_CN')

  function handleZh () {
    setLocale(zhCN)
    setLanguage('zh_CN')
  }
  function handleEn () {
    setLocale(enUS)
    setLanguage('en_US')
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
          language={language}
          locale={locale}
        >
          <InputDate type="datetime"/>
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
