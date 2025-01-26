import React from 'react'
import { Chat } from 'seedsui-react'

export default () => {
  return (
    <>
      <Chat title="11">1000</Chat>
      <Chat title="11" className="right">
        1000
      </Chat>
    </>
  )
}
