import React, { forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react'
import Popup from './Popup'
import Utils from './Utils'

const Tooltip = forwardRef(
  (
    {
      animation = 'slideDownLeft',
      style,
      getChildrenDOM,
      children,
      visible,
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
    let [autoVisible, setAutoVisible] = useState(false)

    // 受控显隐时, 需要更新容器位置
    useEffect(() => {
      let childrenDOM = childrenRef.current
      if (typeof getChildrenDOM === 'function') {
        childrenDOM = getChildrenDOM()
        if (typeof childrenDOM?.getRootDOM === 'function') {
          childrenDOM = childrenDOM.getRootDOM()
        }
      }
      if (visible && childrenDOM) {
        Utils.updateContainerPosition({
          source: rootRef.current,
          target: childrenDOM,
          style: style,
          animation: animation
        })
      }
    }, [visible]) // eslint-disable-line

    // 非受控显隐, 为子元素增加点击事件显隐
    let newChildren = React.Children.toArray(children)
    if (newChildren.length === 1) {
      newChildren = React.cloneElement(children, {
        ref: childrenRef,
        onClick: (e) => {
          Utils.updateContainerPosition({
            source: rootRef.current,
            target: e.currentTarget,
            style: style,
            animation: animation
          })
          if (typeof visible !== 'boolean') {
            setAutoVisible(!autoVisible)
          }
        }
      })
    } else {
      newChildren = children
    }

    // 点击遮罩隐藏
    function handleVisibleChange(newVisible) {
      if (typeof visible !== 'boolean') {
        setAutoVisible(newVisible)
      }
      if (typeof onVisibleChange === 'function') {
        onVisibleChange(newVisible)
      }
    }
    return (
      <>
        <Popup
          ref={rootRef}
          animation={animation}
          style={style}
          visible={typeof visible === 'boolean' ? visible : autoVisible}
          onVisibleChange={handleVisibleChange}
          {...props}
        />
        {newChildren}
      </>
    )
  }
)

export default Tooltip
