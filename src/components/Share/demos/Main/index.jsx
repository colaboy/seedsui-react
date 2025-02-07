import React from 'react'
import { Share, Layout } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Header className="text-center">Share To</Layout.Header>
      <Layout.Main className="bg-white">
        <Share.Main
          shareTo={{
            wechat: {
              title: '标题',
              description: '描述',
              imageUrl: 'https://res.waiqin365.com/d/seedsui/images/logo.png',
              url: 'https://www.baidu.com'
            },
            wecom: {
              title: '标题',
              description: '描述',
              imageUrl: 'https://res.waiqin365.com/d/seedsui/images/logo.png',
              url: 'https://www.baidu.com'
            },
            dingtalk: {
              title: '标题',
              description: '描述',
              imageUrl: 'https://res.waiqin365.com/d/seedsui/images/logo.png',
              url: 'https://www.baidu.com'
            },
            lark: {
              title: '标题',
              description: '描述',
              imageUrl: 'https://res.waiqin365.com/d/seedsui/images/logo.png',
              url: 'https://www.baidu.com'
            }
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
