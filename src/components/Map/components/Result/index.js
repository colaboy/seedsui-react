import React, { useRef, forwardRef, useImperativeHandle } from 'react'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Button from './../../../Button'
// 内库使用-end

// 测试使用-start
// import { LocaleUtil, Button } from 'seedsui-react'
// 测试使用-end

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
          {LocaleUtil.locale('重试', 'SeedsUI_retry')}
        </Button>
      )}
    </div>
  )
})

export default Result
