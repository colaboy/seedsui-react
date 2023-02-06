import React from 'react'
import { Button } from 'seedsui-react'

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
      <Button>(Default)</Button>
      <Button className="primary" style={buttonStyle}>
        primary
      </Button>
      <Button className="primary outline" style={buttonStyle}>
        primary outline
      </Button>

      <div style={titleStyle}>块级按钮</div>
      <Button className="primary flex" style={buttonStyle}>
        primary flex
      </Button>

      <div style={titleStyle}>按钮尺寸</div>
      <Button className="primary xs" style={buttonStyle}>
        primary xs
      </Button>
      <Button className="primary sm" style={buttonStyle}>
        primary sm
      </Button>
      <Button className="primary md" style={buttonStyle}>
        primary md
      </Button>
      <Button className="primary lg" style={buttonStyle}>
        primary lg
      </Button>
      <Button className="primary xl" style={buttonStyle}>
        primary xl
      </Button>

      <div style={titleStyle}>按钮颜色</div>
      <Button>(Default)</Button>
      <Button className="primary" style={buttonStyle}>
        primary
      </Button>
      <Button className="cancel" style={buttonStyle}>
        cancel
      </Button>
      <Button className="submit" style={buttonStyle}>
        submit
      </Button>
      <Button className="info" style={buttonStyle}>
        info
      </Button>
      <Button className="link" style={buttonStyle}>
        link
      </Button>
      <Button className="warn" style={buttonStyle}>
        warn
      </Button>
      <Button className="success" style={buttonStyle}>
        success
      </Button>
      <Button className="disabled" style={buttonStyle}>
        disabled
      </Button>
    </>
  )
}
