import React, { useEffect } from 'react'
import { Bridge, Page, Header, Titlebar, Body } from 'seedsui-react'

export default () => {
  useEffect(() => {
    Bridge.ready(() => {
      // eslint-disable-next-line
      Bridge.invoke(
        'chooseImage',
        {
          scene: '1|2',
          count: 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          watermark: [],
          width: 1024,
          isSaveToAlbum: 1,
          isAI: 0,
          validate: 0,
          sceneValidate: 0,
          direction: String(0),
          realTimeRecognition: 0
        },
        () => {
          alert(1)
        }
      )
    })
    import('vconsole').then((VConsole) => {
      if (VConsole && VConsole.default) {
        new VConsole.default()
      } else {
        Bridge.showToast('打开调试模式失败', { mask: false })
      }
    })
  }, [])

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Page>
        <Header>
          <Titlebar caption="1" />
        </Header>
        <Body>页面</Body>
      </Page>
    </div>
  )
}
