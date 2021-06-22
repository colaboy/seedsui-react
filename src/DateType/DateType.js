import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react'
import Tabbar from 'seedsui-react/lib/Tabbar'
import locale from './../locale'

// 日期类型选择控件: 年月日季
const DateType = forwardRef(
  (
    {
      list = [
        {
          type: 'date',
          id: 'date',
          name: locale('日')
        },
        {
          type: 'month',
          id: 'month',
          name: locale('月')
        },
        {
          type: 'season',
          id: 'season',
          name: locale('季')
        },
        {
          type: 'year',
          id: 'year',
          name: locale('年')
        }
      ],
      listVisible = true,
      activeIndex = 0,
      value,
      // 点击选项或者修改值, onChange(e, value, selected, activeIndex)
      onChange
    },
    ref
  ) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })

    useEffect(() => {
      // 如果默认没有值, 则默认为当天
      if (!value && typeof activeIndex === 'number' && list[activeIndex]) {
        let item = list[activeIndex]
        let newValue = getValue('', item.type, 0)
        if (onChange) onChange({ target: rootRef.current }, newValue, [item], activeIndex)
      }
    }, []) // eslint-disable-line

    // 点击Tab
    function handleTab(e, val, selected, index) {
      if (!selected) return
      let item = selected[0]
      if (!item.type) return
      // 设置值为今天
      let newValue = getValue('', item.type, 0)
      if (onChange) onChange(e, newValue, [item], index)
    }

    // 向前
    function handlePrev(e) {
      if (!value || !list[activeIndex].type) return
      let newValue = getValue(value, list[activeIndex].type, -1)
      if (onChange) onChange(e, newValue, [list[activeIndex]], activeIndex)
    }

    // 向后
    function handleNext(e) {
      if (!value || !list[activeIndex].type) return
      let newValue = getValue(value, list[activeIndex].type, 1)
      if (onChange) onChange(e, newValue, [list[activeIndex]], activeIndex)
    }

    /**
     * 切换日期
     * @param {String} currentValue 单位列表, 单位列表需要从大到小排序后才能计算
     * @param {String} dateType 日期类型, [date|month|season|year]
     * @param {Number} go 前行后退, 0: 当前; -1: 后退; 1: 前进;
     */
    function getValue(currentValue, dateType, go) {
      var date = new Date()
      var newValue = currentValue || ''
      switch (dateType) {
        // 年
        case 'year': {
          if (go === 0) {
            newValue = '' + date.getFullYear()
            break
          }
          date.year(currentValue)
          go === -1 ? date.prevYear() : date.nextYear()
          newValue = date.year()
          break
        }
        // 季
        case 'season': {
          if (go === 0) {
            newValue = date.getFullYear() + '-' + date.season()
            break
          }
          date.year(currentValue.split('-')[0])
          date.season(currentValue.split('-')[1])
          let season = go === -1 ? date.prevSeason() : date.nextSeason()
          newValue = date.getFullYear() + '-' + season
          break
        }
        // 月
        case 'month': {
          if (go === 0) {
            newValue = date.format('YYYY-MM')
            break
          }
          date = currentValue.toDate()
          go === -1 ? date.prevMonth() : date.nextMonth()
          newValue = date.format('YYYY-MM')
          break
        }
        // 日
        case 'date': {
          if (go === 0) {
            newValue = date.format('YYYY-MM-DD')
            break
          }
          date = currentValue.toDate()
          go === -1 ? date.prevDate() : date.nextDate()
          newValue = date.format('YYYY-MM-DD')
          break
        }
        default: {
          newValue = ''
        }
      }
      return newValue
    }

    return (
      <div className="flex flex-middle" style={{ height: '44px', padding: '0 12px' }}>
        {listVisible && Array.isArray(list) && (
          <Tabbar
            onChange={handleTab}
            list={list}
            activeIndex={activeIndex}
            className="tabbar-rect"
            style={{ height: '24px', margin: '0', width: '120px', borderRadius: '4px' }}
          />
        )}
        <i className="icon shape-arrow-left sm" onClick={handlePrev} />
        {value}
        <i className="icon shape-arrow-right sm" onClick={handleNext} />
      </div>
    )
  }
)

export default DateType
