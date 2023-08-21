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
      <Button style={buttonStyle}>default</Button>
      <Button className="disabled" style={buttonStyle}>
        default disabled
      </Button>
      <br />
      <Button className="primary" style={buttonStyle}>
        primary
      </Button>
      <Button className="primary disabled" style={buttonStyle}>
        primary disabled
      </Button>
      <br />
      <Button className="link" style={buttonStyle}>
        link
      </Button>
      <Button className="link disabled" style={buttonStyle}>
        link disabled
      </Button>
      <br />
      <Button className="warning" style={buttonStyle}>
        warning
      </Button>
      <Button className="warning disabled" style={buttonStyle}>
        warning disabled
      </Button>
      <br />
      <Button className="danger" style={buttonStyle}>
        danger
      </Button>
      <Button className="danger disabled" style={buttonStyle}>
        danger disabled
      </Button>
      <br />
      <Button className="success" style={buttonStyle}>
        success
      </Button>
      <Button className="success disabled" style={buttonStyle}>
        success disabled
      </Button>

      <div style={titleStyle}>边框模式</div>
      <Button className="outline" style={buttonStyle}>
        default outline
      </Button>
      <Button className="outline disabled" style={buttonStyle}>
        default disabled
      </Button>
      <br />
      <Button className="primary outline" style={buttonStyle}>
        primary
      </Button>
      <Button className="primary outline disabled" style={buttonStyle}>
        primary disabled
      </Button>
      <br />
      <Button className="link outline" style={buttonStyle}>
        link
      </Button>
      <Button className="link outline disabled" style={buttonStyle}>
        link disabled
      </Button>
      <br />
      <Button className="warning outline" style={buttonStyle}>
        warning
      </Button>
      <Button className="warning outline disabled" style={buttonStyle}>
        warning disabled
      </Button>
      <br />
      <Button className="danger outline" style={buttonStyle}>
        danger
      </Button>
      <Button className="danger outline disabled" style={buttonStyle}>
        danger disabled
      </Button>
      <br />
      <Button className="success outline" style={buttonStyle}>
        success
      </Button>
      <Button className="success outline disabled" style={buttonStyle}>
        success disabled
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
      <Button style={buttonStyle}>default</Button>
      <Button className="primary" style={buttonStyle}>
        primary
      </Button>
      <Button className="link" style={buttonStyle}>
        link
      </Button>
      <Button className="warning" style={buttonStyle}>
        warning
      </Button>
      <Button className="danger" style={buttonStyle}>
        danger
      </Button>
      <Button className="success" style={buttonStyle}>
        success
      </Button>
    </>
  )
}
