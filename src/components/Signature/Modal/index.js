import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { createPortal } from 'react-dom'
import Main from './../Main'

// 内库使用-start
import Layout from './../../Layout'
// 内库使用-end

/* 测试使用-start
import { Layout } from 'seedsui-react'
测试使用-end */

// Modal
const Modal = forwardRef(
  (
    {
      portal,
      visible,
      value,
      onBeforeChange,
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
        safeArea
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
            onBeforeChange={onBeforeChange}
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
