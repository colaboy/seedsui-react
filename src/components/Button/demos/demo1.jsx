import React from 'react'

import { Layout, Divider, Button } from 'seedsui-react'

const buttonStyle = {
  margin: 'var(--space-s)'
}

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>Fill Mode</Divider>
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

        <Divider>Out line mode</Divider>
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
        <br />

        <Divider>Size</Divider>
        <Button className="primary flex" style={buttonStyle}>
          primary flex
        </Button>

        <Button className="primary xs" style={buttonStyle}>
          primary xs
        </Button>
        <Button className="primary s" style={buttonStyle}>
          primary s
        </Button>
        <Button className="primary m" style={buttonStyle}>
          primary m
        </Button>
        <Button className="primary l" style={buttonStyle}>
          primary l
        </Button>
        <Button className="primary xl" style={buttonStyle}>
          primary xl
        </Button>
        <br />

        <Divider>Color</Divider>
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
      </Layout.Main>
    </Layout>
  )
}
