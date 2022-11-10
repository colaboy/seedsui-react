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
    <div id="root" style={{ height: '300px' }}>
      <Page>
        <div style={titleStyle}>页面</div>
      </Page>
    </div>
  )
}
