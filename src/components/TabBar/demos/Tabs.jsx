import React, { useState } from 'react'
import { Layout, Divider, TabBar } from 'seedsui-react'

export default () => {
  const list = [
    {
      id: 'Fruit',
      name: 'Fruit'
    },
    { id: 'Vegetable', name: 'Vegetable' },
    { id: 'Animal', name: 'Animal' }
  ]
  const [value, setValue] = useState({ name: 'Vegetable', id: 'Vegetable' })

  function handleChange(value) {
    setValue(value)
  }
  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>OverFlow</Divider>
        <TabBar.Tabs
          list={[
            {
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              id: 'Vegetable',
              name: 'Vegetable Vegetable Vegetable Vegetable Vegetable Vegetable Vegetable Vegetable '
            },
            { id: 'Animal', name: 'Animal' }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Disabled</Divider>
        <TabBar.Tabs
          list={[
            {
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              id: 'Vegetable',
              name: 'Vegetable',
              disabled: true
            },
            { id: 'Animal', name: 'Animal' }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Icon</Divider>
        <TabBar.Tabs
          list={[
            {
              icon: <i className="icon-file-text"></i>,
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              icon: <i className="icon-file-text"></i>,
              id: 'Vegetable',
              name: 'Vegetable'
            },
            { icon: <i className="icon-file-text"></i>, id: 'Animal', name: 'Animal' }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Children</Divider>
        <TabBar.Tabs
          list={[
            {
              icon: <i className="icon-file-text"></i>,
              id: 'Fruit',
              name: 'Fruit',
              description: 'description',
              context: 'context'
            },
            {
              icon: <i className="icon-file-text"></i>,
              id: 'Vegetable',
              name: 'Vegetable',
              description: 'description',
              context: 'context'
            },
            {
              icon: <i className="icon-file-text"></i>,
              id: 'Animal',
              name: 'Animal',
              description: 'description',
              context: 'context'
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
