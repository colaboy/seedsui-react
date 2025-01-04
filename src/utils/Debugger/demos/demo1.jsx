import React, { useEffect } from 'react'
import { Layout, Debugger } from 'seedsui-react'

export default () => {
  useEffect(() => {
    // 留后门调试: 连续点击10次, 显示vconsole
    Debugger.addTrigger()
  }, [])

  return (
    <Layout className="full">
      <Layout.Main>左下角点击10次呼出暗门</Layout.Main>
    </Layout>
  )
}
