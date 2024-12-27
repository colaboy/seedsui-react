import React, { useEffect } from 'react'
import { Row, Col } from 'seedsui-react'

export default () => {
  return (
    <>
      Each row has twenty-four columns
      <Row className="border-b" style={{ padding: '10px 0', marginLeft: '12px' }}>
        <Col span={8} className="color-sub">
          Customer Name:
        </Col>
        <Col span={16}>Ethan</Col>
        <Col span={8} className="color-sub">
          Age:
        </Col>
        <Col span={16}>Twenty-eight</Col>
      </Row>
    </>
  )
}
