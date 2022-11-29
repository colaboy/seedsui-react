import React from 'react'
import { Page } from 'seedsui-react'

const titleStyle = {
  padding: '12px 12px 8px',
  color: '#697b8c',
  fontSize: '14px',
  backgroundColor: 'rgba(250,251,252)'
}
export default () => {
  return (
    <div id="root" style={{ height: '300px', position: 'relative' }}>
      {/* 实际开发时，页面只需要写下面的代码即可，上面的div仅仅是为了方便文档预览 */}
      <Page>
        <div style={titleStyle}>页面</div>
      </Page>
    </div>
  )
}
