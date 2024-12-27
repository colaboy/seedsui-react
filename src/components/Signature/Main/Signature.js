import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { rotateBase64 } from './utils'
import Instance from './instance.js'

// 手写签名
const Signature = (
  {
    color = '#000',
    backgroundColor = '#fff',
    lineWidth = 3,
    quality = 0.92,
    suffix = 'png',
    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    ...props
  },
  ref
) => {
  const rootRef = useRef(null)
  const instanceRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      getBase64: async () => {
        if (instanceRef?.current?.isBlank?.()) {
          return null
        }
        let base64 = instanceRef?.current?.getBase64?.()

        // 旋转90度后返回
        base64 = await rotateBase64(base64, { backgroundColor })
        return base64
      },
      clear: () => {
        instanceRef?.current?.clear?.()
      }
    }
  })

  useEffect(() => {
    if (instanceRef.current) {
      let s = instanceRef.current
      let params = {}
      if (s.params.strokeStyle !== color) {
        params.strokeStyle = color
      }
      if (s.params.lineWidth !== lineWidth) {
        params.lineWidth = lineWidth
      }
      if (s.params.quality !== quality) {
        params.quality = quality
      }
      if (s.params.suffix !== suffix) {
        params.suffix = suffix
      }
      if (Object.getOwnPropertyNames(params) && Object.getOwnPropertyNames(params).length) {
        s.updateParams(params)
      }

      updateContainer()
    }
    // eslint-disable-next-line
  }, [color, lineWidth, quality, suffix])

  useEffect(() => {
    instanceRef.current = new Instance(rootRef.current.querySelector('canvas'), {
      strokeStyle: color,
      lineWidth: lineWidth,
      quality: quality,
      suffix: suffix
    })

    updateContainer()
    // eslint-disable-next-line
  }, [])

  function updateContainer() {
    let width = rootRef.current.clientWidth
    let height = rootRef.current.clientHeight
    instanceRef.current.width = width
    instanceRef.current.height = height

    rootRef.current.querySelector('canvas').width = width
    rootRef.current.querySelector('canvas').height = height
  }

  return (
    <div className="signature-main-canvas" ref={rootRef} {...props}>
      <canvas>Canvas画板</canvas>
    </div>
  )
}

export default forwardRef(Signature)
