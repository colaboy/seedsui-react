import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import locale from './../../locale'
import Signature from './Signature'

// 手写签名
const Main = (
  {
    onChange,
    onCancel,
    // 绘画配置
    color,
    backgroundColor
  },
  ref
) => {
  const rootRef = useRef(null)
  // 签名
  const signatureRef = useRef(null)

  // 外部调用
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      getBase64: signatureRef?.current?.getBase64,
      clear: signatureRef?.current?.clear
    }
  })

  return (
    <div ref={rootRef} className="signature">
      {/* 绘制区域 */}
      <Signature ref={signatureRef} color={color} backgroundColor={backgroundColor} />
      {/* 按钮区域 */}
      <div className="signature-buttons">
        <div className="signature-button signature-button-cancel" onClick={onCancel}>
          <p>{locale('取消')}</p>
        </div>
        <div className="flex-1"></div>
        <div
          className="signature-button signature-button-clear"
          onClick={() => {
            signatureRef?.current?.clear?.()
          }}
        >
          <p>{locale('清除')}</p>
        </div>
        <div
          className="signature-button signature-button-submit"
          onClick={async () => {
            let base64 = await signatureRef?.current?.getBase64?.()
            onChange?.(base64)
          }}
        >
          <p>{locale('确认')}</p>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(Main)
