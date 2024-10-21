import React from 'react'
import { Layout } from 'seedsui-react'

const list = []
for (let i = 0; i < 100; i++) {
  list.push({
    id: i,
    name: '测试数据' + i
  })
}

export default () => {
  function handleTopRefresh() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('自定义提示')
      }, 1000)
    })
  }
  function handleBottomRefresh() {
    console.log('底部加载')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  }
  return (
    // <div id="root" style={{ height: '300px', position: 'relative' }}>
    <Layout safeArea className="full">
      <Layout.Header style={{ height: 50, backgroundColor: 'white' }}>Header</Layout.Header>
      <Layout.Main onTopRefresh={handleTopRefresh} onBottomRefresh={handleBottomRefresh}>
        {list.map((item, index) => {
          return <div key={index}>{item.name}</div>
        })}
      </Layout.Main>
      <Layout.Footer style={{ height: 50, backgroundColor: 'white' }}>Footer</Layout.Footer>
    </Layout>
    // </div>
  )
}
