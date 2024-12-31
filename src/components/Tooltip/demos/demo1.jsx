import React from 'react'
import { Tooltip } from 'seedsui-react'

export default () => {
  return (
    <>
      <Tooltip
        content={<p>123412341234</p>}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
      >
        <div style={{ margin: 100 }}>点击</div>
      </Tooltip>
    </>
  )
}
