import React from 'react'
import { Card } from 'seedsui-react'

const Wrapper = ({ children }) => {
  return <Card className="list-wrapper-custom">{children}</Card>
}

export default Wrapper
