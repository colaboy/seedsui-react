// require PrototypeDate.js和PrototypeString.js
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useContext,
  Fragment
} from 'react'
import InputText from './../InputText'
import PickerDate from './../PickerDate'
import Context from '../Context/instance.js'

const InputDate = forwardRef(
  (
    {
      // Input
      min, // YYYY-MM-DD
      max, // YYYY-MM-DD
      onClick,
      onChange,
      onError, // func(e, err)

      // Picker
      type = 'date',
      selected,
      pickerProps = {},
      ...others
    },
    ref
  ) => {
    const inputTextRef = useRef(null)
    useImperativeHandle(ref, () => {
      return inputTextRef.current
    })
    const [show, setShow] = useState(false)
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }
    // 日期纠正
    function correctDate(val) {
      const split = pickerProps.split || '-'
      const timeSplit = pickerProps.timeSplit || ':'
      let text = val
      const selectDate = text.toDate(split, timeSplit)
      let value = ''
      const e = {}
      if (inputTextRef.current) {
        e.target = inputTextRef.current
        value = inputTextRef.current.value
      }
      if (
        min &&
        (min.isDateTime(split, timeSplit) ||
          min.isDate(split) ||
          min.isMonth(split) ||
          min.isTime(timeSplit))
      ) {
        if (type === 'date' && selectDate.compareDate(min.toDate(split, timeSplit)) === -1) {
          if (onError) {
            onError(e, {
              errMsg: locale('不能小于', 'hint_cannot_be_less_than') + min,
              select: text,
              min: min,
              value: value
            })
            return false
          }
          text = min
        } else if (
          type === 'month' &&
          selectDate.compareMonth(min.toDate(split, timeSplit)) === -1
        ) {
          if (onError) {
            onError(e, {
              errMsg: locale('不能小于', 'hint_cannot_be_less_than') + min,
              select: text,
              min: min,
              value: value
            })
            return false
          }
          text = min
        } else if (type === 'time' && selectDate.compareTime(min.toDate(split, timeSplit)) === -1) {
          if (onError) {
            onError(e, {
              errMsg: locale('不能小于', 'hint_cannot_be_less_than') + min,
              select: text,
              min: min,
              value: value
            })
            return false
          }
          text = min
        } else if (
          type === 'datetime' &&
          selectDate.compareDateTime(min.toDate(split, timeSplit)) === -1
        ) {
          if (onError) {
            onError(e, {
              errMsg: locale('不能小于', 'hint_cannot_be_less_than') + min,
              select: text,
              min: min,
              value: value
            })
            return false
          }
          text = min
        }
      }
      if (
        max &&
        (max.isDateTime(split, timeSplit) ||
          max.isDate(split) ||
          max.isMonth(split) ||
          max.isTime(timeSplit))
      ) {
        if (type === 'date' && selectDate.compareDate(max.toDate(split, timeSplit)) === 1) {
          if (onError) {
            onError(e, {
              errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + max,
              select: text,
              max: max,
              value: value
            })
            return false
          }
          text = max
        } else if (
          type === 'month' &&
          selectDate.compareMonth(max.toDate(split, timeSplit)) === 1
        ) {
          if (onError) {
            onError(e, {
              errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + max,
              select: text,
              max: max,
              value: value
            })
            return false
          }
          text = max
        } else if (type === 'time' && selectDate.compareTime(max.toDate(split, timeSplit)) === 1) {
          if (onError) {
            onError(e, {
              errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + max,
              select: text,
              max: max,
              value: value
            })
            return false
          }
          text = max
        } else if (
          type === 'datetime' &&
          selectDate.compareDateTime(max.toDate(split, timeSplit)) === 1
        ) {
          if (onError) {
            onError(e, {
              errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + max,
              select: text,
              max: max,
              value: value
            })
            return false
          }
          text = max
        }
      }
      return text
    }
    // 点击文本框
    function onClickInput(...parameter) {
      if (onClick) onClick(...parameter)
      if (others.readOnly) return
      setShow(true)
    }
    // 点击遮罩
    function onClickMask(e) {
      if (pickerProps && pickerProps.maskAttribute && pickerProps.maskAttribute.onClick) {
        pickerProps.maskAttribute.onClick(e)
        return
      }
      setShow(false)
    }
    // 点击确定按钮
    function onClickSubmit(e, value, options) {
      if (inputTextRef.current) e.target = inputTextRef.current
      let val = correctDate(value)
      if (val === false) return
      // 确定按钮回调
      if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
        // 允许确定错误时中断隐藏
        if (pickerProps.submitAttribute.onClick(e, val, options) === false) return
      } else if (onChange) {
        onChange(e, val, options)
      }
      // 隐藏框
      setShow(false)
    }
    // 点击取消按钮
    function onClickCancel(e) {
      if (pickerProps && pickerProps.cancelAttribute && pickerProps.cancelAttribute.onClick) {
        pickerProps.cancelAttribute.onClick(e)
        return
      }
      setShow(false)
    }

    return (
      <Fragment>
        <InputText ref={inputTextRef} {...others} type="text" readOnly onClick={onClickInput} />
        <PickerDate
          {...pickerProps}
          maskAttribute={{
            ...pickerProps.maskAttribute,
            onClick: onClickMask
          }}
          submitAttribute={{
            ...pickerProps.submitAttribute,
            onClick: onClickSubmit
          }}
          cancelAttribute={{
            ...pickerProps.cancelAttribute,
            onClick: onClickCancel
          }}
          selected={selected}
          type={type}
          value={others.value}
          show={pickerProps.show === undefined ? show : pickerProps.show}
        />
      </Fragment>
    )
  }
)

export default InputDate
