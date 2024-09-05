import React, { useRef, forwardRef, useImperativeHandle } from 'react'

// 测试使用
// import { locale, Button } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Button from './../../../Button'

const Result = forwardRef(({ retry, title, subTitle, extra, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div
      {...props}
      className={'map-result' + (props.className ? ' ' + props.className : '')}
      ref={rootRef}
    >
      <div className="map-result-title">{title}</div>
      <div className="map-result-subtitle">{subTitle}</div>
      {extra}
      {typeof retry === 'function' && (
        <Button className="map-result-button-retry primary" onClick={retry}>
          {locale('重试')}
        </Button>
      )}
    </div>
  )
})

export default Result
