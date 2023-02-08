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
      <Mark className="cancel" style={buttonStyle}>
        cancel
      </Mark>
      <Mark className="submit" style={buttonStyle}>
        submit
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

      <div style={titleStyle}>线框模式</div>
      <Mark className="primary outline" style={buttonStyle}>
        primary
      </Mark>
      <Mark className="cancel outline" style={buttonStyle}>
        cancel
      </Mark>
      <Mark className="submit outline" style={buttonStyle}>
        submit
      </Mark>
      <Mark className="info outline" style={buttonStyle}>
        info
      </Mark>
      <Mark className="link outline" style={buttonStyle}>
        link
      </Mark>
      <Mark className="warn outline" style={buttonStyle}>
        warn
      </Mark>
      <Mark className="success outline" style={buttonStyle}>
        success
      </Mark>
      <Mark className="disabled outline" style={buttonStyle}>
        disabled
      </Mark>
    </>
  )
}
