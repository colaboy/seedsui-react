import React, { useState } from 'react'
import { Actionsheet } from 'seedsui-react'

export default () => {
  const list = useState([
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ])
  const [value, setValue] = useState(null)
  return (
    <>
      <Actionsheet.Modal visible={true} value={value} list={list} onChange={setValue} />
    </>
  )
}
