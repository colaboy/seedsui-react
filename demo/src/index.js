import React from 'react'
import { render } from 'react-dom'
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapUtil,
  Timeline
} from '../../src'

function Demo() {
  const timeList = [
    {content: <div style={{height: '100px'}}>内容</div>, active: true},
    {content: <div style={{height: '100px'}}>内容2</div>}
  ]
  return (
    <Page>
      <Header>
        <Titlebar caption="标题" />
      </Header>
      <Container>
        <div style={{height: '100px'}}></div>
        <Timeline lineCross={false} list={timeList} style={{padding: '0 0 0 18px'}}/>
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
      render(<Demo/>, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
})
