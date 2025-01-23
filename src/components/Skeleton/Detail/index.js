import React from 'react'

import Layout from './../../Layout'
import Paragraph from './../components/Paragraph'
import TabBar from './../components/TabBar'

const Detail = ({ animated, ...props }) => {
  return (
    <Layout className="full" {...props}>
      <Layout.Main className="overflow-hidden">
        <Paragraph
          titleProps={{
            style: {
              width: '90px',
              height: '18px',
              marginBottom: '2px'
            }
          }}
          itemProps={{
            style: {
              height: '14px',
              margin: '6px 0 0 0'
            }
          }}
          avatarProps={{}}
        />
        <TabBar />
        {Array.from({ length: 2 }).map((_, index) => (
          <Paragraph
            key={index}
            length={10}
            animated={animated}
            oddProps={{ style: { width: '73px' } }}
          />
        ))}
      </Layout.Main>
    </Layout>
  )
}

export default Detail
