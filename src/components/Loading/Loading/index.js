import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import SpinFade from './../SpinFade'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-start */

const Loading = forwardRef(
  ({ portal, visible = true, maskProps = {}, icon, content, children, ...props }, ref) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => {
          return rootRef.current
        }
      }
    })

    // render icon
    function getIconNode() {
      if (typeof icon === 'function') {
        return icon()
      }
      if (React.isValidElement(icon)) {
        return icon
      }

      // Default Status
      return <SpinFade />
    }

    // 组合Node
    let Node = (
      <div
        {...maskProps}
        className={`loading-mask mask ${visible ? ' active' : ''}${
          maskProps.className ? ' ' + maskProps.className : ''
        }`}
        ref={rootRef}
      >
        {children !== undefined ? (
          children
        ) : (
          <div className="loading" {...props}>
            <div className="loading-icon">{getIconNode()}</div>
            <div className="loading-content">
              {content || `${LocaleUtil.locale('加载中', 'SeedsUI_refreshing')}...`}
            </div>
          </div>
        )}
      </div>
    )

    if (portal) {
      return createPortal(Node, portal)
    }
    return Node
  }
)

export default Loading
