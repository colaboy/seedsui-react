import React, { useEffect } from 'react'
import { Bridge, Page, Header, Titlebar, Body } from 'seedsui-react'
// import dh from './dinghuo-sdk'

export default () => {
  useEffect(() => {
    Bridge.ready(() => {
      wq.startRecord({
        duration: 5,
        success: function (res) {
          alert(res.errMsg)
        },
        fail: function (res) {
          alert(res.errMsg)
        }
      })
      // eslint-disable-next-line
      wq.trigger('onVoiceRecordEnd', {
        complete: function (res) {
          alert('onVoiceRecordEnd:' + JSON.stringify(res))
        }
      })

      wq.trigger('onShow', {
        complete: function (res) {
          alert('onShow:' + JSON.stringify(res))
        }
      })
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
