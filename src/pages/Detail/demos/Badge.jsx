import React from 'react'
import { Layout, Badge } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <Badge maxLength={2} ellipsis={'+'}>
          1000
        </Badge>
      </Layout.Main>
    </Layout>
  )
}
