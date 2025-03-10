import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { CanvasUtil, preventDefault } from './utils'

// 手写签名
const Signature = (
  {
    color = '#000',
    backgroundColor,
    lineWidth = 3,
    quality = 0.92,
    suffix = 'png',
    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    ...props
  },
  ref
) => {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const isDrewRef = useRef(false)
  // canvas坐标信息
  let clientRectRef = useRef(null)
  // 触摸信息
  let touchesRef = useRef({
    beginX: 0,
    beginY: 0,
    endX: 0,
    endY: 0
  })

  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      getBase64: async () => {
        if (CanvasUtil.isBlank(canvasRef.current)) {
          return null
        }
        let base64 = CanvasUtil.toBase64(canvasRef.current, { suffix, quality })

        // 旋转90度后返回
        base64 = await CanvasUtil.rotateBase64(base64, { backgroundColor })
        return base64
      },
      clear: () => {
        CanvasUtil.clear(canvasRef.current)
        isDrewRef.current = false
      }
    }
  })

  useEffect(() => {
    updateContainer()
    canvasRef.current.ctx = canvasRef.current.getContext('2d')
    // eslint-disable-next-line
  }, [])

  function updateContainer() {
    let width = rootRef.current.clientWidth
    let height = rootRef.current.clientHeight
    if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
      canvasRef.current.width = width
      canvasRef.current.height = height
    }
  }

  function handleTouchStart(e) {
    e.stopPropagation()
    // 解决拖动时影响document弹性
    e.currentTarget.addEventListener('touchmove', preventDefault, false)

    // 防止尺寸变化
    updateContainer()
    // console.log(
    //   'updateContainer',
    //   canvasRef.current.width,
    //   rootRef.current.clientWidth,
    //   canvasRef.current.height,
    //   rootRef.current.clientHeight
    // )

    // 防止下层还有焦点
    window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
    canvasRef.current.ctx.strokeStyle = color
    canvasRef.current.ctx.lineWidth = lineWidth
    clientRectRef.current = canvasRef.current.getBoundingClientRect()
    canvasRef.current.ctx.beginPath()
    canvasRef.current.ctx.moveTo(
      e.changedTouches[0].clientX - clientRectRef.current.left,
      e.changedTouches[0].clientY - clientRectRef.current.top
    )
    touchesRef.beginX = e.changedTouches[0].clientX - clientRectRef.current.left
    touchesRef.beginY = e.changedTouches[0].clientY - clientRectRef.current.top
  }
  function handleTouchMove(e) {
    e.stopPropagation()
    canvasRef.current.ctx.lineTo(
      e.changedTouches[0].clientX - clientRectRef.current.left,
      e.changedTouches[0].clientY - clientRectRef.current.top
    )
    touchesRef.endX = e.changedTouches[0].clientX - clientRectRef.current.left
    touchesRef.endY = e.changedTouches[0].clientY - clientRectRef.current.top
    canvasRef.current.ctx.stroke()
    // 标识是否绘制过
    isDrewRef.current = true
  }
  function handleTouchEnd(e) {
    // 解除对move时的弹性对当前div的锁定
    e.currentTarget.removeEventListener('touchmove', preventDefault, false)
  }

  return (
    <div className="signature-main-canvas" ref={rootRef} {...props}>
      <canvas
        ref={canvasRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        Canvas画板
      </canvas>
    </div>
  )
}

export default forwardRef(Signature)
