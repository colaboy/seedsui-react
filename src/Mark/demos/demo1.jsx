import React from 'react'
import { Mark } from 'seedsui-react'

const titleStyle = {
  padding: '12px 12px 8px',
  color: '#697b8c',
  fontSize: '14px',
  backgroundColor: 'rgba(250,251,252)'
}
const buttonStyle = {
  margin: '8px'
}
export default () => {
  return (
    <>
      <div style={titleStyle}>填充模式</div>
      <Mark className="primary" style={buttonStyle}>
        primary
      </Mark>
      <Mark className="primary outline" style={buttonStyle}>
        primary outline
      </Mark>

      <div style={titleStyle}>标记颜色</div>
      <Mark className="primary" style={buttonStyle}>
        primary
      </Mark>
      <Mark className="cancel" style={buttonStyle}>
        cancel
      </Mark>
      <Mark className="info" style={buttonStyle}>
        info
      </Mark>
      <Mark className="link" style={buttonStyle}>
        link
      </Mark>
      <Mark className="warn" style={buttonStyle}>
        warn
      </Mark>
      <Mark className="success" style={buttonStyle}>
        success
      </Mark>
      <Mark className="disabled" style={buttonStyle}>
        disabled
      </Mark>
    </>
  )
}
