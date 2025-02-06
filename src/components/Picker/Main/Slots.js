import React, { useRef, forwardRef } from 'react'
import getTranslateValue from './utils/getTranslateValue'
import preventDefault from './utils/preventDefault'

// 内库使用
import MathUtil from './../../../utils/MathUtil'

// 测试使用
// import { MathUtil } from 'seedsui-react'

let Lists = forwardRef(
  (
    {
      lists,
      cellHeight = 44,
      // 拖动结束返回项数
      onDragEnd
    },
    ref
  ) => {
    let touchesRef = useRef({
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      endX: 0,
      endY: 0,
      startTimeStamp: 0,
      duration: 0,
      diffX: 0,
      diffY: 0,
      posY: 0,
      currentPosY: 0,
      direction: null
    })

    const slotRef = useRef({
      slotDOM: null,
      slotIndex: null,
      slotHeight: null
    })

    // 触摸事件
    function handleTouchStart(e) {
      e.stopPropagation()
      // 解决拖动时影响document弹性
      e.currentTarget.addEventListener('touchmove', preventDefault, false)

      slotRef.current.slotDOM = e.target
      slotRef.current.slotIndex = slotRef.current.slotDOM.getAttribute('slotindex')
      slotRef.current.slotHeight = (lists[slotRef.current.slotIndex].length - 1) * cellHeight

      touchesRef.current.startX = e.clientX || e.touches[0].clientX
      touchesRef.current.startY = e.clientY || e.touches[0].clientY
      touchesRef.current.posY = Number(
        getTranslateValue(slotRef.current.slotDOM.style.transform) || 0
      )

      // 清除动画
      slotRef.current.slotDOM.style.webkitTransitionDuration = 0

      // 记录点击时间
      touchesRef.current.startTimeStamp = e.timeStamp
    }
    function handleTouchMove(e) {
      e.stopPropagation()

      touchesRef.current.currentY = e.clientY || e.touches[0].clientY
      touchesRef.current.diffY = touchesRef.current.startY - touchesRef.current.currentY
      touchesRef.current.currentPosY = touchesRef.current.posY - touchesRef.current.diffY

      if (slotRef?.current?.slotDOM) {
        slotRef.current.slotDOM.style.webkitTransform = `translateY(${touchesRef.current.currentPosY}px)`
      }
    }
    function handleTouchEnd(e) {
      e.stopPropagation()
      // 解除对move时的弹性对当前div的锁定
      e.currentTarget.removeEventListener('touchmove', preventDefault, false)

      touchesRef.current.endX = e.clientX || e.changedTouches[0].clientX
      touchesRef.current.endY = e.clientY || e.changedTouches[0].clientY
      touchesRef.current.diffX = touchesRef.current.startX - touchesRef.current.endX
      touchesRef.current.diffY = touchesRef.current.startY - touchesRef.current.endY
      // 判断是否是tap
      if (Math.abs(touchesRef.current.diffX) < 6 && Math.abs(touchesRef.current.diffY) < 6) {
        return
      }

      // 计算拖动时间
      touchesRef.current.duration = e.timeStamp - touchesRef.current.startTimeStamp

      // 惯性值计算
      let inertia = MathUtil.inertia({
        cellSize: cellHeight,
        distance: touchesRef.current.diffY,
        duration: touchesRef.current.duration,
        currentPosition: touchesRef.current.currentPosY,
        minPosition: 0,
        maxPosition: slotRef.current.slotHeight
      })

      // 如果touchesRef.current.diffY为负数, 则向上拉动, translateY向上为负数
      let position = -inertia.position

      // 滚动到指定位置
      slotRef.current.slotDOM.style.webkitTransitionDuration = inertia.duration + 'ms'
      slotRef.current.slotDOM.posY = position
      slotRef.current.slotDOM.style.webkitTransform = `translateY(${position}px)`

      // 更新值
      onDragEnd &&
        onDragEnd({
          slotIndex: slotRef.current.slotIndex,
          rowIndex: inertia.index
        })
    }

    return (
      <div
        ref={ref}
        className="picker-slotbox"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {(lists || []).map((list, index) => {
          return (
            <ul
              key={index}
              // 槽数
              slotindex={index}
              className="picker-slot text-center"
            >
              {(list || []).map((item, itemIndex) => {
                return <li key={item.id || itemIndex}>{item.name}</li>
              })}
            </ul>
          )
        })}
      </div>
    )
  }
)

export default Lists
