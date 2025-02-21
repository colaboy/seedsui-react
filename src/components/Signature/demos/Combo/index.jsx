import React, { useRef, useState } from 'react'
import { Signature, Layout, Toast } from 'seedsui-react'

// Test safe area
// import { SafeArea } from 'seedsui-react'
// SafeArea.autoSafeArea({ debug: true })

export default () => {
  const [value, setValue] = useState(
    'https://image-test.waiqin365.com/6069734652819592543/blog/201912/819415708498937580.png?x-oss-process=style/zk320'
  )
  return (
    <Layout className="full">
      <Layout.Header className="text-center">手写签名</Layout.Header>
      <Layout.Main className="bg-white">
        <Signature.Combo
          color="#000000"
          backgroundColor="white"
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
