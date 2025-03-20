import React, { useState, useEffect } from 'react'
import { QRCode } from 'seedsui-react'

const Logo = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '50px',
  height: '50px',
  marginLeft: '-25px',
  marginTop: '-25px'
}
export default () => {
  const [url, setUrl] = useState('')
  useEffect(() => {
    setTimeout(() => {
      setUrl('abc')
    }, 1000)
  }, [])
  return (
    <>
      <QRCode text={url} style={{ width: '300px', height: '300px' }}>
        <img
          style={Logo}
          alt=""
          src="https://colaboy.github.io/seedsui-react/assets/images/logo.png"
        />
      </QRCode>
    </>
  )
}
