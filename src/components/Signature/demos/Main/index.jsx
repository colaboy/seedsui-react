import React, { useRef, useState } from 'react'
import { Signature, Layout } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Header className="text-center">手写签名</Layout.Header>
      <Layout.Main className="bg-white">
        <Signature.Main
          onChange={(base64) => {
            console.log(base64)
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
