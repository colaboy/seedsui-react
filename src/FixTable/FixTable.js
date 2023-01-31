import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import useSyncCallback from './../useSyncCallback'
import Instance from './instance.js'

let updateSuccess = null

// 函数组件因为没有实例, 所以也没有ref, 必须通过forwardRef回调ref
const FixTable = forwardRef(
  (
    {
      // td如果想换行显示, 则需要在td里包裹一层div, 以方便计算div是宽度是否超出td, 超出则增加wrap换行class
      thead,
      tbody,
      tfoot,
      // 固定头
      frozenThead = false,
      // 固定底
      frozenTfoot = false,
      // 左右侧固定, 传入数组
      frozenLeft = [],
      frozenRight = [],
      // 滚动到底部刷新, 需要设置style高度才能工作
      onBottomRefresh,
      children,
      ...others
    },
    ref
  ) => {
    const [forceUpdate, setForceUpdate] = useState(null)

    const rootRef = useRef(null)
    const instance = useRef({
      getContainer: () => rootRef.current,
      update: handleUpdateRemove,
      updateContainerSize: handleUpdateContainerSize
    })
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    // 更新容器
    useEffect(() => {
      if (forceUpdate === 1 || !rootRef || !rootRef.current) return
      // console.log('更新容器', rootRef.current)
      // rootRef.current.scrollTop = 0
      // rootRef.current.scrollLeft = 0
      // 更新容器尺寸
      handleUpdateContainerSize()
    }, [forceUpdate]) // eslint-disable-line

    // 更新容器尺寸
    function handleUpdateContainerSize() {
      // 更新容器尺寸
      Instance.updateContainerSize(rootRef.current, frozenLeft, frozenRight)
      // 滚动修改左右滚动样式, 和底部加载
      Instance.onScroll(rootRef.current, onBottomRefresh)
    }

    // 用显隐强制更新
    function handleUpdateRemove(success) {
      updateSuccess = success
      setForceUpdate(1)
      handleUpdateRecovery()
    }
    const handleUpdateRecovery = useSyncCallback(() => {
      setForceUpdate(0)
      handleUpdateComplete()
    })
    const handleUpdateComplete = useSyncCallback(() => {
      if (typeof updateSuccess === 'function') updateSuccess(instance.current)
    })

    // 滚动修改左右滚动样式, 和底部加载
    function handleScroll(e) {
      Instance.onScroll(e.currentTarget, onBottomRefresh)
    }

    return (
      <div
        {...others}
        className={'fixtable' + (others.className ? ' ' + others.className : '')}
        onScroll={handleScroll}
        ref={rootRef}
      >
        {!tbody || forceUpdate === 1 ? null : (
          <>
            <table
              className={`fixtable-table${frozenThead ? ' frozen-thead' : ''}${
                frozenTfoot ? ' frozen-tfoot' : ''
              }`}
            >
              {thead}
              {tbody}
              {tfoot}
            </table>
            {children}
          </>
        )}
      </div>
    )
  }
)

export default FixTable
