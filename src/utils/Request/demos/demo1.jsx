import React from 'react'
import { Request, Toast } from 'seedsui-react'

export default () => {
  function handleClick() {
    Request.post('https://colaboy.github.io/seedsui-react/', {
      success: () => {
        Toast.show({ content: 'Copy to clipboard success!' })
      }
    })
  }
  return (
    <>
      <div onClick={handleClick}>Click to request</div>
    </>
  )
}
