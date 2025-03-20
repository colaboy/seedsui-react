import React, { useRef, useState } from 'react'
import { Signature, Layout, Toast } from 'seedsui-react'

// Test safe area
// import { SafeArea } from 'seedsui-react'
// SafeArea.autoSafeArea({ debug: true })

export default () => {
  const [value, setValue] = useState(
    'https://colaboy.github.io/seedsui-react/assets/images/logo.png'
  )
  return (
    <Layout className="full">
      <Layout.Header className="text-center">手写签名</Layout.Header>
      <Layout.Main className="bg-white">
        <Signature.Combo
          // color="#000000"
          // backgroundColor="white"
          // disabled={true}
          value={value}
          modalProps={{
            safeArea: 'auto'
          }}
          onChange={(newVal) => {
            console.log(newVal)
            setValue(newVal)
          }}
          onBeforeChange={(newVal) => {
            if (!newVal) {
              Toast.show({
                content: '签名不能为空'
              })
              return false
            }
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
