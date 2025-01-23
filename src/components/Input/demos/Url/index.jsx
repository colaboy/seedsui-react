import React, { useEffect, useState, useRef } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const inputUrlRef = useRef(null)

  useEffect(() => {
    console.log(inputUrlRef.current)
  }, [])

  return (
    <>
      <Input.Url
        ref={inputUrlRef}
        readOnly
        placeholder="Input"
        value="www.baidu.com/"
        rightIcon={<div>click left area will copy link</div>}
      />
    </>
  )
}
