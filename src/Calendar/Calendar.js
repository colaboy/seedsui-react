import React, { useState, forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import dayjs from 'dayjs'
import { useUpdateEffect } from 'ahooks'
import {
  getTitle,
  formatDrawDate,
  isDisabledDate,
  slideX,
  slideY,
  sortRangeValue,
  Months,
  Weeks
} from './utils'
import Header from './Header'
import Body from './Body'

// 内库使用
import DateUtil from './../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

const cellHeight = 40
const duration = 300

// 日历
const Calendar = forwardRef(
  (
    {
      type = 'month', // week | month
      value,
      selectionMode, // single | range
      weekStart = 'Sunday', // Monday | Sunday
      titleFormatter = 'YYYY年MM月', // 标题日期格式化 YYYY年MM月DD日 周E 第W周
      min, // 禁用之前日期
      max, // 禁用之后日期
      draggable = ['horizontal', 'vertical'], // 是否允许垂直拖动
      // 头部渲染
      header = true,
      // 单个日期渲染
      dateRender,
      // Event: listener the view change
      onLoad,
      // Event: click date
      onChange,
      // Event: view change
      onSlideChange,
      ...props
    },
    ref
  ) => {
    // 容器
    const rootRef = useRef(null)

    // 当前日期，用于绘制日历
    let pagesRef = useRef(null)
    let drawTypeRef = useRef(type)
    let [drawDate, setDrawDate] = useState(null)

    // Expose Methods
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current,
        slideCollapse: async () => {
          handleCollapse()
        },
        slideExpand: async () => {
          handleExpand()
        },
        slidePrevious: async () => {
          handlePreviousMonth()
        },
        slideNext: async () => {
          handleNextMonth()
        }
      }
    })

    // 初始化信息
    useEffect(() => {
      // 更新pages
      // eslint-disable-next-line
      drawDate = formatDrawDate(value, { min, max })
      drawTypeRef.current = type
      updateDrawDate(drawDate)

      // 更新Y轴位置, X轴位轴在Body组件内位移(为了解决display none to block issues)
      if (drawTypeRef.current === 'month') {
        handleSlideY('expand')
      } else {
        handleSlideY('collapse')
      }

      // 加载事件
      if (onLoad) {
        onLoad(drawDate, {
          action: 'load',
          type: drawTypeRef.current,
          monthDates: pagesRef.current?.[1]?.flat?.() || null
        })
      }
      // eslint-disable-next-line
    }, [])

    // 修改选中值时需要刷新日历的位置
    useUpdateEffect(() => {
      let newDrawDate = formatDrawDate(value, { min, max })
      updateDrawDate(newDrawDate)
      // eslint-disable-next-line
    }, [JSON.stringify(value)])

    // 上下滑动
    async function handleSlideY(action) {
      let newType = slideY(action, {
        type: drawTypeRef.current,
        duration: duration,
        weekStart: weekStart,
        cellHeight: cellHeight,
        bodyHeight: cellHeight * 6,
        drawDate: drawDate,
        body: rootRef.current.querySelector('.calendar-body'),
        bodyY: rootRef.current.querySelector('.calendar-body-y')
      })

      // 样式标记展开和收缩
      if (action) {
        rootRef.current.classList.remove('expand')
        rootRef.current.classList.remove('collapse')
        rootRef.current.classList.add(action)
      }

      return newType
    }

    // 左右滑动
    async function handleSlideX(action) {
      let newDrawDate = await slideX(action, {
        type: drawTypeRef.current,
        min: min,
        max: max,
        duration: duration,
        weekStart: weekStart,
        drawDate: drawDate,
        container: rootRef.current,
        bodyX: rootRef.current.querySelector('.calendar-body-x'),
        bodyY: rootRef.current.querySelector('.calendar-body-y'),
        cellHeight: cellHeight
      })

      return newDrawDate
    }

    // 更新视图后, 触发SlideChange
    function handleSlideChange(action, newDrawDate) {
      updateDrawDate(newDrawDate)
      if (onSlideChange) {
        onSlideChange(newDrawDate || drawDate, {
          action: action,
          type: drawTypeRef.current,
          monthDates: pagesRef.current?.[1]?.flat?.() || null
        })
      }
    }

    // Last month or week
    async function handlePreviousMonth(e) {
      e && e.stopPropagation()
      let newDrawDate = await handleSlideX('previous')

      // 访问禁止日期
      if (DateUtil.compare(newDrawDate, drawDate) === 0) {
        console.log(`禁止访问${DateUtil.format(newDrawDate, 'YYYY年MM月DD日')}`)
        return
      }

      // Trigger onSlideChange
      handleSlideChange('previousMonth', newDrawDate)
    }
    // Next month or week
    async function handleNextMonth(e) {
      e && e.stopPropagation()
      let newDrawDate = await handleSlideX('next')

      // 访问禁止日期
      if (DateUtil.compare(newDrawDate, drawDate) === 0) {
        console.log(`禁止访问${DateUtil.format(newDrawDate, 'YYYY年MM月DD日')}`)
        return
      }

      // Trigger onSlideChange
      handleSlideChange('nextMonth', newDrawDate)
    }
    // Last year
    function handlePreviousYear(e) {
      e && e.stopPropagation()
      let lastYear = dayjs(drawDate).subtract(1, 'year')
      let newDrawDate = lastYear.toDate()

      // 访问禁止日期
      if (isDisabledDate(newDrawDate, { min, max })) {
        console.log(`禁止访问${DateUtil.format(newDrawDate, 'YYYY年MM月DD日')}`)
        return
      }

      // Trigger onSlideChange
      handleSlideChange('previousYear', newDrawDate)
    }
    // Next year
    function handleNextYear(e) {
      e && e.stopPropagation()
      let nextYear = dayjs(drawDate).add(1, 'year')
      let newDrawDate = nextYear.toDate()

      // 访问禁止日期
      if (isDisabledDate(newDrawDate, { min, max })) {
        console.log(`禁止访问${DateUtil.format(newDrawDate, 'YYYY年MM月DD日')}`)
        return
      }

      // Trigger onSlideChange
      handleSlideChange('nextYear', newDrawDate)
    }
    // Collapse and expand
    async function handleCollapse() {
      let newDrawType = await handleSlideY('collapse')
      drawTypeRef.current = newDrawType

      // Trigger onSlideChange
      handleSlideChange('collapse', drawDate)
    }
    async function handleExpand() {
      let newDrawType = await handleSlideY('expand')
      drawTypeRef.current = newDrawType

      // Trigger onSlideChange
      handleSlideChange('expand', drawDate)
    }

    // 更新日期
    function updateDrawDate(newDrawDate) {
      if (!newDrawDate) {
        // eslint-disable-next-line
        newDrawDate = value || new Date()
      }

      let months = Months.getMonths(newDrawDate, { weekStart: weekStart })
      let pages = Months.paginateMonths(months, {
        weekStart: weekStart,
        drawDate: newDrawDate,
        type: drawTypeRef.current
      })
      pagesRef.current = pages

      setDrawDate(newDrawDate)
    }

    return (
      <div
        ref={rootRef}
        {...props}
        className={`calendar ${props?.className ? ' ' + props.className : ''}${
          selectionMode ? ` calendar-mode-${selectionMode}` : ''
        }`}
      >
        {header === true && (
          <Header
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onPreviousYear={handlePreviousYear}
            onNextYear={handleNextYear}
          >
            {getTitle(drawDate, titleFormatter, { type: drawTypeRef.current })}
          </Header>
        )}
        {typeof header === 'function' &&
          header({
            title: getTitle(drawDate, titleFormatter, { type: drawTypeRef.current }),
            onPreviousMonth: handlePreviousMonth,
            onNextMonth: handleNextMonth,
            onPreviousYear: handlePreviousYear,
            onNextYear: handleNextYear,
            drawDate,
            titleFormatter
          })}
        <div className="calendar-days">
          {Weeks.getWeekNames(weekStart).map((dayName) => {
            return (
              <div key={dayName} className="calendar-day">
                {dayName}
              </div>
            )
          })}
        </div>
        <Body
          cellHeight={cellHeight}
          pages={pagesRef.current}
          value={value}
          selectionMode={selectionMode}
          min={min}
          max={max}
          draggable={draggable}
          // 单个日期渲染
          dateRender={dateRender}
          // Event: click date
          onChange={(date) => {
            let newValue = date
            let newDrawDate = date
            if (selectionMode === 'range') {
              newValue = sortRangeValue(date, value)
              newDrawDate = newValue[0]
            }

            // Change
            onChange && onChange(newValue)

            // 跨月视图发生变化, 需要触发onSlideChange
            if (DateUtil.compare(newDrawDate, drawDate, 'month') !== 0) {
              handleSlideChange('change', date)
            }
          }}
          // Event: view change
          onSlideX={async (action) => {
            if (action === 'previous') {
              handlePreviousMonth()
            } else if (action === 'next') {
              handleNextMonth()
            } else {
              handleSlideX('')
            }
          }}
          onSlideY={async (action) => {
            if (!action) {
              if (drawTypeRef.current === 'week') {
                // eslint-disable-next-line
                action = 'collapse'
              } else {
                // eslint-disable-next-line
                action = 'expand'
              }
            }
            if (action === 'expand') {
              handleExpand()
            } else if (action === 'collapse') {
              handleCollapse()
            }
          }}
        />
      </div>
    )
  }
)

export default Calendar
