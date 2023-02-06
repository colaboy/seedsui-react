import React, { useState, useEffect } from 'react'
import { Layout, Toast } from 'seedsui-react'

export default () => {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      Toast.show({
        content: 'abc',
        onVisibleChange: (visible) => {
          console.log('visible:', visible)
        }
      })
    }, 5000)
  }, [])

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Toast</Layout.Header>
      <Layout.Main className="bg-white">
        <Toast
          visible={visible}
          onVisibleChange={(visible) => {
            setVisible(visible)
          }}
        >
          弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容
        </Toast>
      </Layout.Main>
    </Layout>
  )
}
