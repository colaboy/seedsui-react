import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance.js'

// 生成二维码
const QRCode = forwardRef(({ style, text, children, ...props }, ref) => {
  // 节点
  const rootRef = useRef(null)
  const instance = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      instance: instance.current,
      getRootDOM: () => rootRef.current,
      getInstance: () => instance.current
    }
  })

  useEffect(() => {
    if (instance.current) return
    instance.current = new Instance(rootRef.current, {
      text: text || '',
      width: Object.getUnitNum(style?.width || 230),
      height: Object.getUnitNum(style?.width || 230),
      colorDark: style?.color || '#000000',
      colorLight: style?.backgroundColor || '#ffffff',
      correctLevel: Instance.CorrectLevel.M // L,M,Q,H
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!instance.current || !text) return
    const width = Object.getUnitNum(style?.width || 0)
    const height = Object.getUnitNum(style?.height || 0)
    const color = style?.color
    const backgroundColor = style?.backgroundColor
    if (width) instance.current._htOption.width = width
    if (height) instance.current._htOption.height = height
    if (color) instance.current._htOption.colorDark = color
    if (backgroundColor) instance.current._htOption.colorLight = backgroundColor
    instance.current.makeCode(text)
    // eslint-disable-next-line
  }, [text])

  if (!text) return null
  return (
    <span
      style={style}
      {...props}
      className={`qrcode${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      {children}
    </span>
  )
})

export default QRCode
