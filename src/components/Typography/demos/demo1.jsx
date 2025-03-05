import React from 'react'
import { Layout, Typography } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        {Typography.getDisplayValue([
          { id: 'option1', name: 'Option1' },
          { id: 'option2', name: 'Option2' }
        ])}
      </Layout.Main>
    </Layout>
  )
}
