import React from 'react'
import { Layout, Chat } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <Chat.List
          list={[
            {
              avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
              id: '1',
              name: '1',
              content: 'content',
              position: 'left',
              time: new Date()
            },
            {
              avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
              id: '2',
              name: '张三',
              content: 'content',
              position: 'right',
              time: new Date()
            },
            {
              avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
              id: '3',
              name: '张三',
              content: 'content',
              position: 'right',
              time: new Date('2025-08-08')
            }
          ]}
        />
      </Layout.Main>
    </Layout>
  )
}
