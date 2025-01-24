import React from 'react'
import { Layout, Mark, Divider } from 'seedsui-react'

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
    <Layout className="full">
      <Layout.Main>
        <Divider>Fill Mode</Divider>
        <Mark className="default" style={buttonStyle}>
          default
        </Mark>
        <Mark className="primary" style={buttonStyle}>
          primary
        </Mark>
        <Mark className="link" style={buttonStyle}>
          link
        </Mark>
        <Mark className="warning" style={buttonStyle}>
          warning
        </Mark>
        <Mark className="danger" style={buttonStyle}>
          danger
        </Mark>
        <Mark className="success" style={buttonStyle}>
          success
        </Mark>

        <Divider>Outline</Divider>
        <Mark className="default outline" style={buttonStyle}>
          default outline
        </Mark>
        <Mark className="primary outline" style={buttonStyle}>
          primary outline
        </Mark>
        <Mark className="link outline" style={buttonStyle}>
          link outline
        </Mark>
        <Mark className="warning outline" style={buttonStyle}>
          warning outline
        </Mark>
        <Mark className="danger outline" style={buttonStyle}>
          danger outline
        </Mark>
        <Mark className="success outline" style={buttonStyle}>
          success outline
        </Mark>

        <Divider>light-outline</Divider>
        <Mark className="default light-outline" style={buttonStyle}>
          default light-outline
        </Mark>
        <Mark className="primary light-outline" style={buttonStyle}>
          primary light-outline
        </Mark>
        <Mark className="link light-outline" style={buttonStyle}>
          link light-outline
        </Mark>
        <Mark className="warning light-outline" style={buttonStyle}>
          warning light-outline
        </Mark>
        <Mark className="danger light-outline" style={buttonStyle}>
          danger light-outline
        </Mark>
        <Mark className="success light-outline" style={buttonStyle}>
          success light-outline
        </Mark>
      </Layout.Main>
    </Layout>
  )
}
