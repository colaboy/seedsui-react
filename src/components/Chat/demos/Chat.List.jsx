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
              position: 'left'
            },
            {
              avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
              id: '2',
              name: '2',
              content: 'content',
              position: 'right'
            }
          ]}
        />
      </Layout.Main>
    </Layout>
  )
}
