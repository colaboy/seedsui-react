import React, { forwardRef, useState, Fragment, useEffect } from 'react'
import Popover from './../Popover'
import Alert from './../Alert'
import InputDate from './../InputDate'
import locale from './../locale'
import helper from './helper'

let range = 90

// 日期快捷选择弹窗
const DatePopover = forwardRef(
  (
    {
      // 显隐
      show = false,
      // 位置
      top = 88,
      left = 10,

      // 开始日期: YYYY-MM-DD
      startDate,
      // 结束日期: YYYY-MM-DD
      endDate,

      // 范围
      ranges = {
        [locale('今天')]: [new Date().format('YYYY-MM-DD'), new Date().format('YYYY-MM-DD')],
        [locale('昨天')]: [
          new Date().prevDate().format('YYYY-MM-DD'),
          new Date().prevDate().format('YYYY-MM-DD')
        ],
        [locale('本月')]: [
          new Date().firstMonthDate().format('YYYY-MM-DD'),
          new Date().format('YYYY-MM-DD')
        ],
        [locale('上月')]: [
          new Date().prevMonth().firstMonthDate().format('YYYY-MM-DD'),
          new Date().prevMonth().lastMonthDate().format('YYYY-MM-DD')
        ],
        [locale('最近7天')]: [
          new Date().prevDate(7).format('YYYY-MM-DD'),
          new Date().format('YYYY-MM-DD')
        ],
        [locale('最近30天')]: [
          new Date().prevDate(30).format('YYYY-MM-DD'),
          new Date().format('YYYY-MM-DD')
        ],
        [locale('自定义日期')]: 90
      },

      // 自定义日期, 范围内错误提示
      rangeErrMsg,

      // 隐藏和修改事件
      onHide,
      onChange,

      // 其它属性
      maskAttribute,
      ...others
    },
    ref
  ) => {
    // 自定义日期数据
    const [customDialog, setCustomDialog] = useState(false)
    const [customStartDate, setCustomStartDate] = useState(startDate)
    const [customEndDate, setCustomEndDate] = useState(endDate)

    useEffect(() => {
      setCustomStartDate(startDate)
      setCustomEndDate(endDate)
    }, [startDate, endDate])

    // 修改日期
    function handleChangeDate(e, startDate, endDate) {
      if (onChange) {
        onChange(e, helper.getDateName(startDate, endDate), {
          startDate: startDate,
          endDate: endDate
        })
      }
      if (onHide) onHide()
    }

    /**
     * 自定义时间
     */
    // 点击自定义取消
    function handleCustomCancel() {
      setCustomDialog(false)
      setCustomStartDate(startDate)
      setCustomEndDate(endDate)
    }
    // 点击自定义确定
    function handleCustomSubmit(e) {
      if (!helper.isRange(customStartDate, customEndDate, range, rangeErrMsg)) {
        return
      }
      if (onChange) {
        onChange(e, helper.getDateName(customStartDate, customEndDate), {
          startDate: customStartDate,
          endDate: customEndDate
        })
      }
      setCustomDialog(false)
    }

    // 显示自定义弹框
    function showCustomDialog(currentRange) {
      // 设置区间不能超过?天
      range = currentRange
      setCustomDialog(true)
      if (onHide) onHide()
    }

    // 修改自定义开始时间
    function handleCustomStartDate(e, value) {
      setCustomStartDate(value)
    }

    // 修改自定义结束时间
    function handleCustomEndDate(e, value) {
      setCustomEndDate(value)
    }

    if (!ranges || typeof ranges !== 'object') {
      return null
    }
    return (
      <Fragment>
        <Popover
          ref={ref}
          show={show}
          {...others}
          className={`datepopover ${others.className || 'top-left'}`}
          style={Object.assign({ left: `${left}px`, top: `${top}px` }, others.style || {})}
          maskAttribute={Object.assign({}, maskAttribute || {}, { onClick: onHide })}
        >
          {Object.entries(ranges).map((item) => {
            let key = item[0]
            let range = item[1]
            if (typeof range === 'number') {
              return (
                <div
                  className="datepopover-option"
                  key={key}
                  onClick={() => showCustomDialog(range)}
                >
                  {locale('自定义时间')}
                </div>
              )
            }
            return (
              <div
                className="border-b"
                key={key}
                className="datepopover-option"
                onClick={(e) => handleChangeDate(e, range[0], range[1])}
              >
                {key}
              </div>
            )
          })}
        </Popover>

        {/* 自定义时间 */}
        <Alert
          caption={locale('自定义时间')}
          show={customDialog}
          submitAttribute={{ onClick: handleCustomSubmit }}
          cancelAttribute={{ onClick: handleCustomCancel }}
        >
          <InputDate
            max={customEndDate}
            value={customStartDate || startDate}
            onChange={handleCustomStartDate}
            placeholder={locale('请选择')}
            className="datepopover-dialog-inputbox"
            pickerProps={{ maskAttribute: { style: { zIndex: '11' } } }}
          />
          <InputDate
            min={customStartDate}
            value={customEndDate || endDate}
            onChange={handleCustomEndDate}
            placeholder={locale('请选择')}
            className="datepopover-dialog-inputbox"
            pickerProps={{ maskAttribute: { style: { zIndex: '11' } } }}
          />
        </Alert>
      </Fragment>
    )
  }
)

export default DatePopover
