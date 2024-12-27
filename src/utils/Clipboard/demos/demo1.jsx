import React from 'react'
import { Clipboard, Toast } from 'seedsui-react'

export default () => {
  function handleClick() {
    Clipboard.copy('https://colaboy.github.io/seedsui-react/', {
      success: () => {
        Toast.show({ content: 'Copy to clipboard success!' })
      }
    })
  }
  return (
    <>
      <div onClick={handleClick}>Copy to clipboard</div>
    </>
  )
}
