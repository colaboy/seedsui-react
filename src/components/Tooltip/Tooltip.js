import React, { forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react'
import Popup from './Popup'
import updateContainerPosition from './api/updateContainerPosition'

const Tooltip = forwardRef(
  (
    {
      // 动画
      animation = 'slideDownLeft',
      style,
      getChildrenDOM,
      children,
      onVisibleChange,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const childrenRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    // 非受控显隐
    let [visible, setVisible] = useState(null)

    // 受控显隐时, 需要更新容器位置
    useEffect(() => {
      if (visible) {
        updatePosition()
      }
      if (visible === null) return
      typeof onVisibleChange === 'function' && onVisibleChange(visible)
    }, [visible]) // eslint-disable-line

    // 更新位置
    function updatePosition(source) {
      // 源元素
      let sourceDOM = source
      if (!sourceDOM) {
        let childrenDOM = childrenRef.current
        if (typeof getChildrenDOM === 'function') {
          childrenDOM = getChildrenDOM()
          if (typeof childrenDOM?.getRootDOM === 'function') {
            childrenDOM = childrenDOM.getRootDOM()
          }
        }
        sourceDOM = childrenDOM
      }

      // 位移元素
      let targetDOM =
        rootRef?.current?.children && rootRef?.current?.children[0]
          ? rootRef?.current?.children[0]
          : null

      if (sourceDOM && targetDOM) {
        // 没有自定义位置时生效
        if (!style?.left && !style?.top && !style?.right && !style?.bottom) {
          updateContainerPosition({
            source: sourceDOM,
            target: targetDOM,
            animation: animation,
            offset: {
              top: 8,
              bottom: 8
            }
          })
        }
      }
    }

    // 非受控显隐, 为子元素增加点击事件显隐
    let newChildren = React.Children.toArray(children)
    if (newChildren.length === 1) {
      newChildren = React.cloneElement(children, {
        ref: childrenRef,
        onClick: (e) => {
          // 没有自定义位置时生效
          if (!style?.left && !style?.top && !style?.right && !style?.bottom) {
            updatePosition(e.currentTarget)
          }
          setVisible(!visible)
        }
      })
    } else {
      newChildren = children
    }

    return (
      <>
        <Popup
          animation={animation}
          style={style}
          visible={typeof visible === 'boolean' ? visible : visible}
          onVisibleChange={(newVisible) => {
            if (!newVisible) {
              setVisible(newVisible)
            }
          }}
          {...props}
          ref={rootRef}
        />
        {newChildren}
      </>
    )
  }
)

export default Tooltip
