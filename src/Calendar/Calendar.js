import React, { useState, forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import dayjs from 'dayjs'
import { useUpdateEffect } from 'ahooks'
import { getTitle, isSelectedDate, isDisabledDate, Weeks } from './utils'
import Instance from './instance'
import Header from './Header'
import Toggle from './Toggle'

// 内库使用
import DateUtil from './../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

// 日历
const Calendar = forwardRef(
  (
    {
      type, // week | month
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
      onDraw,
      ...props
    },
    ref
  ) => {
    // 容器
    const rootRef = useRef(null)
    // 实例
    const instanceRef = useRef(null)

    // 当前日期，用于绘制日历
    let [drawDate, setDrawDate] = useState(null)

    // 暴露方法
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current,
        slideCollapse: async () => {
          let result = await instanceRef.current.slideY('collapse')
          return result
        },
        slideExpand: async () => {
          let result = await instanceRef.current.slideY('expand')
          return result
        },
        slidePrevious: async () => {
          let result = await instanceRef.current.slideX('previous')
          return result
        },
        slideNext: async () => {
          let result = await instanceRef.current.slideX('next')
          return result
        },
        updateDrawDate: (newActive) => {
          updateDrawDate(newActive)
        }
      }
    })

    // 初始化信息
    useEffect(() => {
      // eslint-disable-next-line
      drawDate = getDrawDate(value)
      setDrawDate(drawDate)

      instanceRef.current = new Instance(rootRef.current, {
        // Value
        drawDate: drawDate,
        min,
        max,
        weekStart,

        // Render
        draggable: draggable,
        type: type || 'month',
        threshold: 50,
        duration: 300,
        cellHeight: 40,

        // Events
        onDraw: (drawDate, { action, type, month }) => {
          setDrawDate(drawDate)

          // Trigger onDraw
          if (onDraw) {
            onDraw(drawDate, { action, type, month })
          }
        }
      })

      // 加载事件
      if (onLoad) {
        onLoad(instanceRef.current.drawDate, {
          action: 'load',
          type: instanceRef.current.type,
          month: instanceRef.current.pages[1]
        })
      }
      // eslint-disable-next-line
    }, [])

    // 修改选中值时需要刷新日历的位置
    useUpdateEffect(() => {
      updateDrawDate()
      // eslint-disable-next-line
    }, [value])

    // 获取当前日期
    function getDrawDate(newActive) {
      let date = Array.isArray(newActive) && newActive.length === 2 ? newActive[0] : newActive
      if (date instanceof Date) {
        return date
      } else {
        return new Date()
      }
    }

    // 更新当前日期
    function updateDrawDate(newActive) {
      if (!instanceRef?.current?.pages) return

      drawDate = getDrawDate(newActive || value)
      setDrawDate(drawDate)
      instanceRef.current.updateDrawDate(drawDate)
    }

    // 点击日期
    function handleRangeClick(newDate) {
      // No value, click date, start date and end date is same
      if (!Array.isArray(value) || value.length !== 2) {
        onChange && onChange([newDate, newDate])
        return
      }

      // Just has start date, select end date
      if (dayjs(value[0]).isSame(dayjs(value[1]), 'date')) {
        let newValue = [value[0], newDate]
        if (dayjs(value[0]).isBefore(dayjs(newDate), 'date') === false) {
          newValue = [newDate, value[0]]
        }
        onChange && onChange(newValue)
        return
      }

      // Reselect start date
      onChange && onChange([newDate, newDate])
    }

    // Last month
    function handlePreviousMonth(e) {
      e.stopPropagation()
      instanceRef?.current?.slideX('previous')
    }
    // Next month
    function handleNextMonth(e) {
      e.stopPropagation()
      instanceRef?.current?.slideX('next')
    }
    // Last year
    function handlePreviousYear(e) {
      e.stopPropagation()
      let lastYear = dayjs(drawDate).subtract(1, 'year')
      updateDrawDate(lastYear.toDate())
    }
    // Next year
    function handleNextYear(e) {
      e.stopPropagation()
      let nextYear = dayjs(drawDate).add(1, 'year')
      updateDrawDate(nextYear.toDate())
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
            {getTitle(drawDate, titleFormatter, instanceRef.current)}
          </Header>
        )}
        {typeof header === 'function' &&
          header({
            title: getTitle(drawDate, titleFormatter, instanceRef.current),
            onPreviousMonth: handlePreviousMonth,
            onNextMonth: handleNextMonth,
            onPreviousYear: handlePreviousYear,
            onNextYear: handleNextYear,
            drawDate,
            titleFormatter,
            instance: instanceRef.current
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
        <div className="calendar-body">
          <div className="calendar-body-y">
            <div className="calendar-body-x">
              {/* 3页 */}
              {(instanceRef?.current?.pages || []).map((page, pageIndex) => {
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
                                style={{ height: '40px' }}
                                onClick={(e) => {
                                  if (selectionMode === 'range') {
                                    handleRangeClick(date)
                                  } else {
                                    onChange && onChange(date)
                                  }
                                  e.stopPropagation()
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
          <div className="calendar-footer">
            <Toggle />
          </div>
        )}
      </div>
    )
  }
)

export default Calendar
