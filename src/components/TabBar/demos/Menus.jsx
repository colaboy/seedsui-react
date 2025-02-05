import React, { useState } from 'react'
import { Layout, Divider, TabBar } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState({ name: 'Vegetable', id: 'Vegetable' })

  function handleChange(value) {
    setValue(value)
  }
  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>OverFlow</Divider>
        <TabBar.Menus
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
        <TabBar.Menus
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
        <TabBar.Menus
          list={[
            {
              icon: <i className="tabbar-menus-tab-icon seeds-icon-file-text"></i>,
              id: 'Fruit'
            },
            {
              icon: <i className="tabbar-menus-tab-icon seeds-icon-file-text"></i>,
              id: 'Vegetable'
            },
            {
              icon: ({ checked }) =>
                checked ? (
                  <i className="tabbar-menus-tab-icon seeds-icon-close"></i>
                ) : (
                  <i className="tabbar-menus-tab-icon seeds-icon-plus"></i>
                ),
              id: 'Animal'
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Children</Divider>
        <TabBar.Menus
          list={[
            {
              icon: <i className="seeds-icon-file-text"></i>,
              id: 'Fruit',
              name: 'Fruit',
              description: 'description',
              content: 'content'
            },
            {
              icon: <i className="seeds-icon-file-text"></i>,
              id: 'Vegetable',
              name: 'Vegetable',
              description: 'description',
              content: 'content'
            },
            {
              icon: <i className="seeds-icon-file-text"></i>,
              id: 'Animal',
              name: 'Animal',
              description: 'description',
              content: 'content'
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
