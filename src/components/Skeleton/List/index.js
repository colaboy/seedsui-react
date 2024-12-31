import React from 'react'

import Layout from './../../Layout'
import Paragraph from './../components/Paragraph'

const List = ({ animated, ...props }) => {
  return (
    <Layout className="full" {...props}>
      <Layout.Main className="overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <Paragraph key={index} length={2} animated={animated} />
        ))}
      </Layout.Main>
    </Layout>
  )
}

export default List
