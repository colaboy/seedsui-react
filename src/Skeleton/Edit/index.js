import React from 'react'

import Layout from './../../Layout'
import Paragraph from './../components/Paragraph'

const Edit = ({ animated, ...props }) => {
  return (
    <Layout className="full" {...props}>
      <Layout.Main className="overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <Paragraph
            key={index}
            length={6}
            animated={animated}
            oddProps={{ style: { width: '73px' } }}
          />
        ))}
      </Layout.Main>
    </Layout>
  )
}

export default Edit
