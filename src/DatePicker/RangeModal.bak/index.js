import React, { useImperativeHandle, useRef, useState, forwardRef, Fragment } from 'react'
import Tooltip from './../../Tooltip'
import locale from './../../locale'
import { getFormat } from './../utils'
import DateModalUtils from './../Modal/Utils'
import RangeUtils from './Utils'
import RangeModal from './RangeModal'

// 日期区间选择
const Modal = forwardRef(
  (
    {
      // 通用属性
      portal,
      getComboDOM,
      value,
      list, // {year: [], quarter: [], month: [], day: [], hour: [], minute: []}

      onBeforeChange,
      onChange,

      visible = false,
      maskClosable = true,
      onVisibleChange,

      // 自定义弹框属性
      separator = '',
      caption = locale('自定义时间', 'datepicker-tooltip_custom_date'),
      min,
      max,
      type = 'date', // year | quarter | month | date | time | datetime
      // 范围
      ranges,
      // 天数限制
      daysLimit = 90,

      // 自定义弹框属性
      TooltipProps = {},
      StartComboProps = {},
      EndComboProps = {},
      onError,

      // 子元素
      children,
      ...props
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        modalDOM: rootRef?.current?.modalDOM,
        getRootDOM: rootRef?.current?.getRootDOM
      }
    })

    // 自定义日期数据
    const [modalVisible, setModalVisible] = useState(false)

    // 修改
    function handleChange(newValue) {
      if (newValue.length !== 2) return false
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 最大值和最小值校验
        for (let i = 0; i < newValue.length; i++) {
          let date = newValue[i]
          date = DateModalUtils.validateDate(date, {
            type: type,
            min: min,
            max: max,
            onError: onError
          })
          if (date === false) {
            resolve(false)
            return
          }
          newValue[i] = date
        }

        // 天数区间校验
        if (
          !RangeUtils.validateRange(newValue, {
            daysLimit: typeof ranges === 'number' ? ranges : daysLimit,
            onError: onError
          })
        ) {
          resolve(false)
          return
        }

        // 获取日期名称: 今日、昨日、本月等
        let fmt = getFormat(type)
        let startDate = newValue[0]
        let endDate = newValue[1]
        if (startDate instanceof Date) {
          startDate = startDate.format(fmt)
        }
        if (endDate instanceof Date) {
          endDate = endDate.format(fmt)
        }

        // 修改提示
        if (typeof onBeforeChange === 'function') {
          let goOn = await onBeforeChange(newValue)
          if (!goOn) {
            resolve(false)
            return
          }
        }
        // 触发onChange事件
        if (onChange) {
          onChange(newValue)
        }
        if (onVisibleChange) onVisibleChange(false)
        resolve(true)
      })
    }

    // 显示自定义弹框
    function showModal(range) {
      setModalVisible(range)
      if (onVisibleChange) onVisibleChange(false)
    }

    // 快捷修改日期
    async function handleTooltipChange(newValue) {
      let goOn = await handleChange(newValue)
      if (goOn === false) return
      if (onVisibleChange) onVisibleChange(false)
    }

    // 修改自定义日期
    async function handleModalChange(newValue) {
      let goOn = await handleChange(newValue)
      if (goOn === false) return
      // 隐藏自定义日期框
      setModalVisible(false)
      if (onVisibleChange) onVisibleChange(false)
    }

    // 构建内容
    function getTooltipContent() {
      if (justModal()) return null
      return Object.entries(ranges).map((item) => {
        let key = item[0]
        let range = item[1]
        if (!Array.isArray(range) || range.length !== 2) {
          return (
            <div
              className="datepicker-tooltip-option"
              key={key}
              onClick={() => showModal(range || true)}
            >
              {key}
            </div>
          )
        }
        return (
          <div
            key={key}
            className="datepicker-tooltip-option"
            onClick={(e) => {
              handleTooltipChange(range)
              e.stopPropagation()
            }}
          >
            {key}
          </div>
        )
      })
    }

    // 判断是否为直接弹窗, 直接弹窗则返回弹框所需的值
    function justModal() {
      // 非对象直接弹框
      if (Object.prototype.toString.call(ranges) !== '[object Object]') return true

      // 数组只有一项, 且为自定义弹框时直接弹框
      let rangesArr = Object.entries(ranges)
      if (!Array.isArray(rangesArr) || rangesArr.length <= 1) {
        if (Array.isArray(rangesArr) && rangesArr.length === 1) {
          if (Array.isArray(rangesArr[0]) && rangesArr[0].length === 2) {
            // 值为[xx, xx]则非自定义弹框
            // let key = rangesArr[0][0]
            let range = rangesArr[0][1]
            if (Array.isArray(range) && range.length === 2) {
              return false
            }
            // 值为其它则为自定义弹框
            return range
          }
        }
        return true
      }
      return false
    }

    return (
      <Fragment>
        {/* 如果没有ranges, 则直接打开自定义弹框 */}
        {!justModal() && (
          <Tooltip
            content={getTooltipContent()}
            getChildrenDOM={getComboDOM}
            visible={visible}
            maskClosable={maskClosable}
            onVisibleChange={onVisibleChange}
            {...(TooltipProps || {})}
          >
            {children}
          </Tooltip>
        )}

        {/* 自定义时间 */}
        <RangeModal
          separator={separator}
          caption={caption}
          min={min}
          max={max}
          type={type}
          value={value}
          visible={justModal() ? (visible ? justModal() : false) : modalVisible}
          maskClosable={maskClosable}
          onVisibleChange={justModal() ? onVisibleChange : setModalVisible}
          StartComboProps={StartComboProps}
          EndComboProps={EndComboProps}
          onChange={handleModalChange}
          onError={onError}
          {...props}
          ref={rootRef}
        />
      </Fragment>
    )
  }
)

export default Modal
