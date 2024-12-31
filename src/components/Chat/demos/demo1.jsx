import React from 'react'
import { Chat } from 'seedsui-react'

export default () => {
  return (
    <>
      <Chat caption="11">1000</Chat>
      <Chat caption="11" className="right">
        1000
      </Chat>
    </>
  )
}
