import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { createPortal } from 'react-dom'
import Main from './../Main'
import { Layout } from 'seedsui-react'

// Modal
const Modal = forwardRef(
  (
    {
      portal,
      visible,
      value,
      onChange,
      onVisibleChange,

      // 绘画配置
      color,
      backgroundColor,

      // 页面属性
      pageProps = {}
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM || rootRef?.current,
        getRootDOM: rootRef?.current?.getRootDOM
          ? rootRef?.current?.getRootDOM
          : () => rootRef.current
      }
    })

    let Node = (
      <Layout
        ref={rootRef}
        // 显示在其它page前面渲染
        style={{ zIndex: document.querySelectorAll('layout').length + 5 }}
        {...pageProps}
        className={`full bg-white${pageProps?.className ? ' ' + pageProps.className : ''}${
          visible === true ? '' : ' hide'
        }`}
      >
        {visible && (
          <Main
            value={value}
            onChange={onChange}
            onCancel={() => {
              onVisibleChange && onVisibleChange(false)
            }}
            // 绘画配置
            color={color}
            backgroundColor={backgroundColor}
          />
        )}
      </Layout>
    )

    if (portal) {
      return createPortal(Node, portal)
    }
    return Node
  }
)

export default Modal
