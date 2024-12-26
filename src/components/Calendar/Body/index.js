import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { isSelectedDate, isDisabledDate, getTranslateValue } from './../utils'
import preventDefault from './../utils/preventDefault'
import Toggle from './../Toggle'

// 内库使用-start
import DateUtil from './../../DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'seedsui-react'
测试使用-end */

const threshold = 50

// 日历
const Body = forwardRef(
  (
    {
      cellHeight,
      pages,

      value,
      min, // 禁用之前日期
      max, // 禁用之后日期
      draggable,
      // 单个日期渲染
      dateRender,
      // Event: click date
      onChange,
      // Event: view change
      onSlideX,
      onSlideY
    },
    ref
  ) => {
    // 容器
    const rootRef = useRef(null)
    const bodyXRef = useRef(null)
    const bodyYRef = useRef(null)

    // 触摸信息
    let touchesRef = useRef({
      startX: 0,
      startY: 0,
      // 拖动方向: 'vertical|horizontal'
      direction: 0
    })

    // Expose Methods
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    useEffect(() => {
      bodyXRef.current = rootRef.current.querySelector('.calendar-body-x')
      bodyYRef.current = rootRef.current.querySelector('.calendar-body-y')
    }, [])

    /* --------------------
    Events handle
    -------------------- */
    function handleTouchStart(e) {
      e.stopPropagation()
      // 解决拖动时影响document弹性
      e.currentTarget.addEventListener('touchmove', preventDefault, false)
      touchesRef.current.startX = e.touches[0].clientX
      touchesRef.current.startY = e.touches[0].clientY
    }
    function handleTouchMove(e) {
      e.stopPropagation()
      let currentX = e.touches[0].clientX
      let currentY = e.touches[0].clientY
      let diffX = touchesRef.current.startX - currentX
      let diffY = touchesRef.current.startY - currentY

      // 判断拉动方向
      if (touchesRef.current.direction === 0) {
        touchesRef.current.direction = Math.abs(diffX) > Math.abs(diffY) ? 'horizontal' : 'vertical'
      }
      // 禁止上下拖动
      if (
        draggable?.includes('horizontal') === false &&
        touchesRef.current.direction === 'horizontal'
      ) {
        touchesRef.current.direction = null
      }
      // 禁止左右拖动
      if (
        draggable?.includes('vertical') === false &&
        touchesRef.current.direction === 'vertical'
      ) {
        touchesRef.current.direction = null
      }

      // 左右拉动
      if (touchesRef.current.direction === 'horizontal') {
        // bodyX的位置
        let translateX = bodyXRef.current.getAttribute('data-translateX')
        if (!translateX) {
          translateX = getTranslateValue(bodyXRef.current.style.transform)
          translateX && bodyXRef.current.setAttribute('data-translateX', translateX)
        }

        let moveX = translateX - diffX
        bodyXRef.current.style.transform = 'translateX(' + moveX + 'px)'
      }
      // 上下拉动
      else if (touchesRef.current.direction === 'vertical') {
        // body的高度
        let height = rootRef.current.getAttribute('data-height')
        if (!height) {
          height = rootRef.current.clientHeight
          height && rootRef.current.setAttribute('data-height', height)
        }

        let moveY = height - diffY
        // 边缘禁止拉动
        if (moveY < 40 || moveY > 240) {
          return
        }
        // 上下拉动
        rootRef.current.style.height = moveY + 'px'

        // 跟随上下移动
        let initTranslateY = bodyYRef.current.getAttribute('data-translateY')
        if (!initTranslateY) {
          initTranslateY = getTranslateValue(bodyYRef.current.style.transform)
          bodyYRef.current.setAttribute('data-translateY', initTranslateY)
        }
        let translateY = Number(initTranslateY) + moveY - cellHeight
        if (translateY < 0) {
          bodyYRef.current.style.transform = `translateY(${translateY}px)`
        }
      }
    }
    async function handleTouchEnd(e) {
      e.stopPropagation()
      // 解除对move时的弹性对当前div的锁定
      e.currentTarget.removeEventListener('touchmove', preventDefault, false)

      let endX = e.clientX || e.changedTouches[0].clientX
      let endY = e.clientY || e.changedTouches[0].clientY
      let diffX = touchesRef.current.startX - endX
      let diffY = touchesRef.current.startY - endY
      let direction = touchesRef.current.direction

      // 清空滑动方向
      touchesRef.current.direction = 0

      // 左右滑动
      if (direction === 'horizontal') {
        // 滑动动作过小，则还原
        if (Math.abs(diffX) < threshold) {
          onSlideX && onSlideX('')
          return
        }

        // 下一页
        if (diffX > 0) {
          onSlideX && onSlideX('next')
        }
        // 上一页
        else {
          onSlideX && onSlideX('previous')
        }
      }
      // 上下滑动
      else if (direction === 'vertical') {
        // 滑动动作过小，则还原
        if (Math.abs(diffY) < threshold) {
          onSlideY && onSlideY('')
          return
        }
        // 展开
        if (diffY < 0) {
          onSlideY && onSlideY('expand')
        }
        // 收缩
        else {
          onSlideY && onSlideY('collapse')
        }
      }
    }

    // 若视窗大小变化, 需要更新x轴的位置
    function handleResize() {
      let width = rootRef.current?.parentNode?.clientWidth
      if (!width) return

      let bodyX = rootRef.current.querySelector('.calendar-body-x')
      let translatex = bodyX.getAttribute('data-translatex')
      if (Number(translatex)) return

      bodyX.style.transform = `translateX(-${width}px)`
      bodyX.setAttribute('data-translatex', `-${width}`)

      console.log(`Calendar: 更新x轴位移-${width}`)
    }
    requestAnimationFrame(handleResize)

    return (
      <>
        <div
          ref={rootRef}
          className="calendar-body"
          style={{ height: cellHeight * 6 }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="calendar-body-y">
            <div className="calendar-body-x">
              {/* 3页 */}
              {(pages || []).map((page, pageIndex) => {
                return (
                  <div className="calendar-page" key={pageIndex}>
                    {/* 6行 */}
                    {page.map((row, rowIndex) => {
                      return (
                        <div className="calendar-row" key={rowIndex}>
                          {/* 7列 */}
                          {row.map((date, dateIndex) => {
                            let isSelected = isSelectedDate(date, value)
                            let selectedClassNames = []
                            if (isSelected?.includes('selected')) {
                              selectedClassNames.push('calendar-date-selected')
                            }
                            if (isSelected?.includes('selected-start')) {
                              selectedClassNames.push('calendar-date-selected-start')
                            }
                            if (isSelected?.includes('selected-end')) {
                              selectedClassNames.push('calendar-date-selected-end')
                            }
                            selectedClassNames = selectedClassNames.join(' ')

                            return (
                              <div
                                key={dateIndex}
                                className={`calendar-date ${
                                  date.isCurrent
                                    ? 'calendar-date-in-view'
                                    : 'calendar-date-out-view'
                                }${
                                  DateUtil.compare(new Date(), date) === 0
                                    ? ' calendar-date-today'
                                    : ''
                                }${selectedClassNames ? ' ' + selectedClassNames : ''}${
                                  isDisabledDate(date, { min, max })
                                    ? ' calendar-date-disabled'
                                    : ''
                                }`}
                                style={{ height: cellHeight + 'px' }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onChange && onChange(date)
                                }}
                              >
                                {typeof dateRender === 'function' ? (
                                  dateRender(date)
                                ) : (
                                  <div className="calendar-date-num">{date.getDate()}</div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {draggable.includes('vertical') && (
          <div
            className="calendar-footer"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Toggle />
          </div>
        )}
      </>
    )
  }
)

export default Body
