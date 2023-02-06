import React, { useEffect, useState } from 'react'
import { Toast } from 'seedsui-react'

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
    <>
      <Toast
        visible={visible}
        onVisibleChange={(visible) => {
          setVisible(visible)
        }}
      >
        弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容
      </Toast>
    </>
  )
}
