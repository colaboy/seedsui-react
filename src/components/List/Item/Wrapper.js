import React from 'react'

// 内库使用-start
import Card from './../../Card'
// 内库使用-end

/* 测试使用-start
import { Card } from 'seedsui-react'
测试使用-end */

const Wrapper = ({ children }) => {
  return <Card className="list-item-wrapper">{children}</Card>
}

export default Wrapper
