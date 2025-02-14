import React, { useRef, useState } from 'react'
import { Layout, List, Checkbox, Button } from 'seedsui-react'
import Wrapper from './Wrapper'

export default () => {
  const checkboxRef = useRef(null)
  const [list, setList] = useState([
    {
      image: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '1',
      name: '1',
      description: 'description',
      note: 'note',
      content: 'content',
      action: () => {
        return <Button>action</Button>
      }
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '2',
      name: '2',
      description: 'description',
      content: 'content',
      action: () => {
        return <Button>action</Button>
      }
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '3',
      name: '3',
      description: 'description',
      content: 'content'
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '4',
      name: '4',
      description: 'description',
      content: 'content'
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '5',
      name: '5',
      description: 'description',
      content: 'content'
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '6',
      name: '6',
      description: 'description',
      content: 'content'
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '7',
      name: '7',
      description: 'description',
      content: 'content'
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '8',
      name: '8',
      description: 'description',
      content: 'content'
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '9',
      name: '9',
      description: 'description',
      content: 'content'
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      id: '10',
      name: '10',
      description: 'description',
      content: 'content'
    }
  ])
  const [value, setValue] = useState(null)

  return (
    <Layout className="full">
      <Layout.Main>
        <List
          ref={checkboxRef}
          allowClear
          multiple={false}
          value={value}
          list={list}
          onChange={(newValue) => {
            console.log('onChange:', newValue)
            setValue(newValue)
          }}
          // Item 配置
          layout="vertical"
          checkbox={({ checked }) => {
            return <Checkbox checked={checked} />
          }}
          // true: 默认Card包裹Item
          wrapper={true}
          // wrapper={Wrapper}
          // wrapper={function ({ children }) {
          //   return <div className="list-wrapper-custom">{children}</div>
          // }}
        />
      </Layout.Main>
    </Layout>
  )
}
