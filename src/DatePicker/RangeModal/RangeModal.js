import React, { forwardRef, useState, useEffect } from 'react'
import Modal from './../../Modal'
import InputDate from './../Combo'
import locale from './../../locale'
import DateModalUtils from './../Modal/Utils'

// 自定义时间
const RangeModal = forwardRef(
  (
    {
      // 自定义弹框属性
      // 分割线
      separator = '',
      // 标题
      caption,
      min,
      max,
      // 类型: year | quarter | month | date | time | datetime
      type,
      // 值: [Date, Date]
      value,

      // 弹窗、开始和结束控件配置
      StartComboProps = {},
      EndComboProps = {},

      visible, // {'自定义字段': []}
      onVisibleChange,
      onChange,
      onError,
      ...props
    },
    ref
  ) => {
    // 标题与日期范围
    let key = null
    let range = null
    if (Object.prototype.toString.call(visible) === '[object Object]') {
      let items = Object.entries(visible)[0]
      if (items && items.length === 2) {
        key = items[0]
        range = items[1]
      }
    }
    // 自定义日期数据
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    useEffect(() => {
      if (visible) {
        initDate()
      }
    }, [JSON.stringify(visible)]) // eslint-disable-line

    // 初始化数据
    function initDate() {
      if (Array.isArray(value) && value.length) {
        setStartDate(value[0])
        setEndDate(value[1] || null)
        return
      }
      if (Array.isArray(range) && range.length) {
        setStartDate(range[0])
        setEndDate(range[1] || null)
      }
    }

    // 点击自定义取消
    function handleCancel() {
      if (onVisibleChange) onVisibleChange(false)
      initDate()
    }

    // 点击自定义确定
    function handleSubmit() {
      if (onChange) {
        onChange([startDate, endDate])
      }
    }

    // 修改自定义开始时间
    function handleStartDate(value) {
      let newValue = DateModalUtils.validateDate(value, {
        type: type,
        min: min,
        max: max,
        onError: onError
      })
      if (newValue === false) return
      setStartDate(newValue)
    }

    // 修改自定义结束时间
    function handleEndDate(value) {
      let newValue = DateModalUtils.validateDate(value, {
        type: type,
        min: min,
        max: max,
        onError: onError
      })
      if (newValue === false) return
      setEndDate(newValue)
    }

    return (
      <Modal
        ref={ref}
        visible={visible}
        captionProps={{ caption: key || caption || '' }}
        submitProps={{ onClick: handleSubmit }}
        cancelProps={{ onClick: handleCancel }}
        {...props}
      >
        <InputDate
          type={type || 'date'}
          max={endDate}
          value={startDate}
          onChange={handleStartDate}
          placeholder={locale('请选择')}
          className="datepicker-modal-combo"
          ModalProps={{ maskProps: { style: { zIndex: '11' } } }}
          {...(StartComboProps || {})}
        />
        <InputDate
          type={type || 'date'}
          min={startDate}
          value={endDate}
          onChange={handleEndDate}
          placeholder={locale('请选择')}
          className="datepicker-modal-combo"
          ModalProps={{ maskProps: { style: { zIndex: '11' } } }}
          {...(EndComboProps || {})}
        />
      </Modal>
    )
  }
)

export default RangeModal
