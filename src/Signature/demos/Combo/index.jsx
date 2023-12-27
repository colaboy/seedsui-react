import React, { useRef, useState } from 'react'
import { Signature, Layout } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <Layout className="full">
      <Layout.Header className="text-center">手写签名</Layout.Header>
      <Layout.Main className="bg-white">
        <Signature.Combo
          color="#000000"
          backgroundColor="transparent"
          value={value}
          onChange={(newVal) => {
            console.log(newVal)
            setValue(newVal)
          }}
          onBeforeChange={(newVal) => {
            if (!newVal) return false
          }}
          // portal={document.body}
        />
      </Layout.Main>
    </Layout>
  )
}
