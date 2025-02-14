import React, { useState } from 'react'
import { Layout, List } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <Layout className="full">
      <Layout.Header className="text-center">List.Main</Layout.Header>
      <List.Main
        pagination
        // allowClear
        multiple
        checkbox
        value={value}
        loadList={({ page, action }) => {
          console.log({ page, action })
          return new Promise((resolve) => {
            // 第一页就报错
            // console.log('获取数据失败')
            // resolve('error')
            // return

            // 无更多数据了
            if (page > 2) {
              setTimeout(() => {
                // 无更多数据了
                // resolve([])
                // 接口报错
                console.log('获取数据失败')
                resolve('error')
              }, 2000)
              return
            }

            // 模拟接口返回列表
            let list = []
            for (let i = 0; i < 20; i++) {
              list.push({ id: `${page}-${i}`, name: `${page}页 第${i} 条` })
            }
            setTimeout(() => {
              console.log('获取数据成功')
              resolve(list)
            }, 2000)
          })
        }}
        onChange={(value) => {
          console.log(value)
          setValue(value)
        }}
      />
    </Layout>
  )
}
