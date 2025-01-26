import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import Signature from './Signature'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

// 手写签名
const Main = (
  {
    onBeforeChange,
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
    <div ref={rootRef} className="signature-main">
      {/* 绘制区域 */}
      <Signature ref={signatureRef} color={color} backgroundColor={backgroundColor} />
      {/* 按钮区域 */}
      <div className="signature-main-buttons">
        <div className="signature-main-button signature-main-button-cancel" onClick={onCancel}>
          <p>{LocaleUtil.locale('取消', 'SeedsUI_cancel')}</p>
        </div>
        <div className="flex-1"></div>
        <div
          className="signature-main-button signature-main-button-clear"
          onClick={() => {
            signatureRef?.current?.clear?.()
          }}
        >
          <p>{LocaleUtil.locale('清除', 'SeedsUI_clear')}</p>
        </div>
        <div
          className="signature-main-button signature-main-button-ok"
          onClick={async () => {
            let base64 = await signatureRef?.current?.getBase64?.()
            if (onBeforeChange) {
              let goOn = await onBeforeChange(base64)
              if (goOn === false) {
                return
              }
            }
            onChange?.(base64)
          }}
        >
          <p>{LocaleUtil.locale('确认', 'SeedsUI_confirm')}</p>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(Main)
